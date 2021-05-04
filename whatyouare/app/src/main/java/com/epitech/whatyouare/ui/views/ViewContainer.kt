package com.epitech.whatyouare.ui.views

import android.Manifest
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.Button
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import com.epitech.whatyouare.utils.CameraPermissionUtils


@Composable
@androidx.camera.lifecycle.ExperimentalUseCaseGroupLifecycle
fun ViewContainer() {
    val cameraPreviewViewModel: CameraPreviewViewModel = viewModel()
    val permissionContext = LocalContext.current as AppCompatActivity?
    val showDialog = remember { mutableStateOf(false) }
    var isCameraActive by remember { mutableStateOf(false) }

    Scaffold(
        modifier = Modifier.fillMaxSize()
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.fillMaxSize()
        ) {

            if (!isCameraActive) {
                Button(
                    onClick = { showDialog.value = true }) {
                    Text(text = "Open camera")
                }

                Text(cameraPreviewViewModel.testStr)
            }

            if (showDialog.value) {
                PermissionsRequest(
                    permissions = arrayOf(Manifest.permission.CAMERA),
                    requestCode = CameraPermissionUtils.CAMERA_RQ,
                    onGranted = {
                        CameraPreview(cameraPreviewViewModel)
                    },
                    onDenied = {
                        OnDeniedAlert()
                    },
                    onRational = { Text(text = "Rationale") }
                )
            }
        }
    }
}