package com.epitech.whatyouare.ui.views

import androidx.appcompat.app.AppCompatActivity
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.AlertDialog
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier

@Composable
fun OnDeniedAlert(onOkButtonPress: (Boolean) -> Unit) {
    AlertDialog(
        title = {
            Text("Permission required")
        },
        text = {
            Text("This app requires permission to access camera")
        },
        onDismissRequest = {

        },
        buttons = {
            Button(
                onClick = { onOkButtonPress(false) },
                modifier = Modifier.fillMaxWidth()
                ) {
                Text(text = "Ok")
            }
        }
    )
}