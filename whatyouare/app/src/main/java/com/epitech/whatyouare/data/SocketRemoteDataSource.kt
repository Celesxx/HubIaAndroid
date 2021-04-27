package com.epitech.whatyouare.data

import com.epitech.whatyouare.eventservice.EventListener
import com.epitech.whatyouare.eventservice.EventServiceImpl
import java.net.URISyntaxException
import javax.inject.Inject
import kotlin.jvm.Throws

class SocketRemoteDataSource @Inject constructor(
    private val mEventService: EventServiceImpl
) : SocketDataSource {

    private lateinit var mRepoEventListener: EventListener


    init {
        mEventService.setEventListener(this)
    }


    override fun setEventListener(eventListener: EventListener) {
        mRepoEventListener = eventListener
    }

    @Throws(URISyntaxException::class)
    override fun connect(username: String?) {
        mEventService.connect()
    }

    override fun disconnect() {
        mEventService.disconnect()
    }

    override fun onConnect(vararg args: Any) {
        if (mRepoEventListener != null)
            mRepoEventListener.onConnect(args)
    }

    override fun onDisconnect(vararg args: Any) {
        if (mRepoEventListener != null)
            mRepoEventListener.onDisconnect(args)
    }

    override fun onNewMessage(vararg args: Any) {
        if (mRepoEventListener != null)
            mRepoEventListener.onNewMessage(args)
    }

    override fun sendMessage() {
        mEventService.sendMessage()
    }
}