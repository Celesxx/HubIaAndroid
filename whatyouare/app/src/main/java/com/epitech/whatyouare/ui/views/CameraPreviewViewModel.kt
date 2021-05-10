package com.epitech.whatyouare.ui.views

import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.epitech.whatyouare.repository.SocketRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class CameraPreviewViewModel @Inject constructor(
    private val repository: SocketRepository
) : ViewModel() {

    var testStr by mutableStateOf("No Test Received")

    init {
        //repository.connect()
        fetchTestReceived()
    }

    fun fetchTestReceived() {
        viewModelScope.launch {
            repository.onTestReceived().collect {
                testStr = it
            }
        }
    }

    fun sendEncodedImages(encodedImage: String) {

    }

    override fun onCleared() {
        repository.disconnect()
        super.onCleared()
    }
}