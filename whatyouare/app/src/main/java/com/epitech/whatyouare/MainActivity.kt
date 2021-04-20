package com.epitech.whatyouare

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.epitech.whatyouare.ui.theme.WhatyouareTheme
import com.epitech.whatyouare.ui.views.SimpleCameraPreview
import com.epitech.whatyouare.ui.views.ViewContainer

@androidx.camera.lifecycle.ExperimentalUseCaseGroupLifecycle
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            WhatyouareTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    color = MaterialTheme.colors.background,
                    modifier = Modifier.fillMaxSize()
                ) {
                    ViewContainer()

                }
            }
        }
    }
}

