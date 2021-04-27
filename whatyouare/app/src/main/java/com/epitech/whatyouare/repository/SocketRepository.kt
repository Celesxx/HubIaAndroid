package com.epitech.whatyouare.repository

import com.epitech.whatyouare.data.SocketDataSource
import com.epitech.whatyouare.data.SocketRemoteDataSource
import com.epitech.whatyouare.eventservice.EventListener
import javax.inject.Inject

class SocketRepository @Inject constructor(
    private val mSocketRemoteDataSource: SocketRemoteDataSource
) : SocketDataSource {

    private lateinit var mViewModelEventListener: EventListener

    init {
        mSocketRemoteDataSource.setEventListener(this)
    }


    override fun connect(username: String?) {
        mSocketRemoteDataSource.connect()
    }

    override fun disconnect() {
        mSocketRemoteDataSource.disconnect()
    }

    override fun sendMessage() {
        mSocketRemoteDataSource.sendMessage()
    }


    override fun setEventListener(eventListener: EventListener) {
        mViewModelEventListener = eventListener
    }

    override fun onConnect(vararg args: Any) {
        mViewModelEventListener.onConnect(args)
    }

    override fun onDisconnect(vararg args: Any) {
        mViewModelEventListener.onDisconnect(args)
    }

    override fun onNewMessage(vararg args: Any) {
        mViewModelEventListener.onNewMessage(args)
    }
}