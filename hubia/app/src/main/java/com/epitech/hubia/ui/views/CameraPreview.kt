package com.epitech.hubia.ui.views

import android.annotation.SuppressLint
import android.os.SystemClock
import android.util.Size
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageProxy
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import com.epitech.hubia.R
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import com.epitech.hubia.utils.Yuv420ToJpegConverter
import timber.log.Timber
import java.lang.Exception
import java.util.*
import java.util.concurrent.Executors

@Composable
@SuppressLint("UnsafeExperimentalUsageError")
fun CameraPreview(
    cameraPreviewViewModel: CameraPreviewViewModel
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
            val preview = Preview.Builder()
                .build()
                .also {
                    it.setSurfaceProvider(previewView.createSurfaceProvider())
                }
            val objectAnalyzer = ImageAnalysis.Builder()
                .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                .build()
                .also {
                    it.setAnalyzer(cameraExecutor, MachineLearningAnalyzer { encodedImage ->
                        cameraPreviewViewModel.sendEncodedImages(encodedImage)
                    })
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


private class MachineLearningAnalyzer(private var listener: (encodedImage: String) -> Unit) :
    ImageAnalysis.Analyzer {

    private val TIME_IN_MS = 33 // 30 fps approx
    private var lastAnalyzedTimeStamp = 0L


    @SuppressLint("UnsafeExperimentalUsageError")
    override fun analyze(imageProxy: ImageProxy) {
        if (hasHalfSecondPassed()) {
            val mediaImage = imageProxy.image
            mediaImage?.let {




                val imageData = Yuv420ToJpegConverter.yuv420ToJpeg(
                    mediaImage,
                    mediaImage.width,
                    mediaImage.height
                )

                val encodedImageData = Base64.getEncoder().encodeToString(imageData)

                listener(encodedImageData)
                //listener(imageData)


            } ?: run { imageProxy.close() }
        }

        imageProxy.close()
    }


    fun hasHalfSecondPassed(): Boolean {
        val currentTimeStamp = SystemClock.elapsedRealtime()
        return if ((currentTimeStamp - lastAnalyzedTimeStamp) >= TIME_IN_MS) {
            lastAnalyzedTimeStamp = currentTimeStamp
            true
        } else {
            false
        }
    }
}