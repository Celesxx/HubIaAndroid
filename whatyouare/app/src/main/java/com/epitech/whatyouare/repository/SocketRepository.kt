package com.epitech.whatyouare.repository

import com.epitech.whatyouare.data.SocketDataSource
import com.epitech.whatyouare.data.SocketRemoteDataSource
import com.epitech.whatyouare.eventservice.EventListener
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.flow.map
import javax.inject.Inject

class SocketRepository @Inject constructor(
    private val mSocketRemoteDataSource: SocketRemoteDataSource
) {

    init {
        connect()
    }

    fun connect() {
        mSocketRemoteDataSource.connect()
    }

    fun disconnect() {
        mSocketRemoteDataSource.disconnect()
    }

    fun onTestReceived(): Flow<String> = mSocketRemoteDataSource.onTestReceived.map {
        // TODO transform response value to model data class (viewModel)
        it
    }.flowOn(Dispatchers.IO)

}