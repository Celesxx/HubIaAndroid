package com.epitech.hubia.ui.views

import androidx.appcompat.app.AppCompatActivity
import androidx.compose.runtime.*
import androidx.compose.ui.platform.LocalContext
import com.eazypermissions.common.model.PermissionResult
import com.eazypermissions.coroutinespermission.PermissionManager

@Composable
fun PermissionsRequest(
    permissions: Array<String>,
    requestCode: Int,
    onGranted: @Composable () -> Unit,
    onDenied: @Composable () -> Unit,
    onDeniedPermanently: (@Composable () -> Unit)? = null,
    onRational: (@Composable () -> Unit)? = null,
    onFail: (@Composable () -> Unit)? = null
) {
    val permissionContext = LocalContext.current as AppCompatActivity?
    val coroutineScope = rememberCoroutineScope()
    val (permissionResult, setPermissionResult) = remember(permissions) {
        mutableStateOf<PermissionResult?>(null)
    }

    permissionContext?.let {
        LaunchedEffect(coroutineScope) {
            setPermissionResult(PermissionManager.requestPermissions(it, requestCode, *permissions))
        }

        when (permissionResult) {
            is PermissionResult.PermissionGranted -> onGranted()
            is PermissionResult.PermissionDenied -> onDenied()
            is PermissionResult.ShowRational -> onRational?.invoke()
            is PermissionResult.PermissionDeniedPermanently -> onDeniedPermanently?.invoke()
            null -> onFail?.invoke()
        }
    } ?: run { onFail?.invoke() ?: run { onDenied() } }
}