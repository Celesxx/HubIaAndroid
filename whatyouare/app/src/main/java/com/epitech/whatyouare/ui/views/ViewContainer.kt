package com.epitech.whatyouare.ui.views

import android.Manifest
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.Button
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import com.epitech.whatyouare.utils.CameraPermissionUtils

@Composable
@androidx.camera.lifecycle.ExperimentalUseCaseGroupLifecycle
fun ViewContainer() {
    val permissionContext = LocalContext.current as AppCompatActivity?
    val showDialog = mutableStateOf(false)

    Scaffold(
        modifier = Modifier.fillMaxSize()
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.fillMaxSize()
        ) {

            Button(
                onClick = { showDialog.value = true }) {
                Text(text = "Open camera")
            }

            if (showDialog.value) {
                PermissionsRequest(
                    permissions = arrayOf(Manifest.permission.CAMERA),
                    requestCode = CameraPermissionUtils.CAMERA_RQ,
                    onGranted = {
                        SimpleCameraPreview()
                    },
                    onDenied = {
                        OnDeniedAlert()
                    },
                    onRational = { Text(text = "zizi")}
                )
            }
        }
    }
}