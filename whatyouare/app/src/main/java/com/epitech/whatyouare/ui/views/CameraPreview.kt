package com.epitech.whatyouare.ui.views

import android.annotation.SuppressLint
import android.media.Image
import android.os.SystemClock
import android.util.Rational
import android.util.Size
import androidx.camera.core.AspectRatio
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageProxy
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import com.epitech.whatyouare.R
import timber.log.Timber
import java.lang.Exception
import java.nio.ByteBuffer
import java.util.concurrent.Executors


@Composable
@SuppressLint("UnsafeExperimentalUsageError")
fun CameraPreview(
    CameraPreviewViewModel: CameraPreviewViewModel
) {

    val lifecycleOwner = LocalLifecycleOwner.current
    val context = LocalContext.current


    val cameraProviderFuture = remember {
        ProcessCameraProvider.getInstance(context)
    }

    val previewView = remember {
        PreviewView(context).apply {
            id = R.id.preview_view
        }
    }

    val cameraExecutor = remember {
        Executors.newSingleThreadExecutor()
    }



    AndroidView(
        factory = { previewView },
        modifier = Modifier.fillMaxSize()
    ) {
        cameraProviderFuture.addListener({
            val cameraProvider = cameraProviderFuture.get()
            val preview = androidx.camera.core.Preview.Builder()
                .build()
                .also {
                    it.setSurfaceProvider(previewView.createSurfaceProvider())
                }
            val objectAnalyzer = ImageAnalysis.Builder()
                .setTargetResolution(Size(1440, 3040))
                .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                .build()
                .also {
                    it.setAnalyzer(cameraExecutor, MachineLearningAnalyzer())
                }

            val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(
                    lifecycleOwner,
                    cameraSelector,
                    preview,
                    objectAnalyzer
                )
            } catch (e: Exception) {
                Timber.e("____________ERROR CAMERAX :\nCameraX ${e.localizedMessage}")
            }
        }, ContextCompat.getMainExecutor(context))
    }
}


private class MachineLearningAnalyzer : ImageAnalysis.Analyzer {

    private val TIME_IN_MS = 1000
    private var lastAnalyzedTimeStamp = 0L

    private fun ByteBuffer.toByteArray(): ByteArray {
        rewind()
        val data = ByteArray(remaining())
        get(data)
        return data
    }

    @SuppressLint("UnsafeExperimentalUsageError")
    override fun analyze(imageProxy: ImageProxy) {
        if (hasHalfSecondPassed()) {
            val mediaImage = imageProxy.image
            mediaImage?.let {
                Timber.d("________IMAGE TRIGGERED: ${it.planes}")
            } ?: run { imageProxy.close() }
        }
        imageProxy.close()
    }


    fun hasHalfSecondPassed(): Boolean {
        //val currentTimeStamp = System.currentTimeMillis()
        //val currentTimeStamp = SystemClock.uptimeMillis()
        val currentTimeStamp = SystemClock.elapsedRealtime()
        return if ((currentTimeStamp - lastAnalyzedTimeStamp) >= TIME_IN_MS) {
            lastAnalyzedTimeStamp = currentTimeStamp
            true
        } else {
            false
        }
    }
}

