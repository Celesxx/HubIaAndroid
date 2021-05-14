package com.epitech.hubia.ui.views

import android.Manifest
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.Button
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import com.epitech.hubia.utils.CameraPermissionsUtils

@Composable
@androidx.camera.lifecycle.ExperimentalUseCaseGroupLifecycle
fun ViewContainer() {
    val cameraPreviewViewModel: CameraPreviewViewModel = viewModel()
    //val permissionContext = LocalContext.current as AppCompatActivity?
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
                    requestCode = CameraPermissionsUtils.CAMERA_RQ,
                    onGranted = {
                        CameraPreview(cameraPreviewViewModel)
                    },
                    onDenied = {
                    },
                    onRational = { Text(text = "Rationale") }
                )
            }
        }
    }
}