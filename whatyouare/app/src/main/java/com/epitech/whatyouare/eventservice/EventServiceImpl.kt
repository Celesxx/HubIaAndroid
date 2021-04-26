package com.epitech.whatyouare.eventservice

import io.socket.client.IO
import io.socket.client.Socket
import java.net.URISyntaxException
import kotlin.jvm.Throws

class EventServiceImpl(): EventService{
    companion object {
        private val SOCKET_URL = "http://http://127.0.0.1:4000/"
        private val EVENT_CONNECT = Socket.EVENT_CONNECT
        private val EVENT_DISCONNECT = Socket.EVENT_DISCONNECT
        private val EVENT_NEW_MESSAGE = "new message"
        private var mSocket: Socket? = null
        private var mEventListener: EventListener? = null
    }

    @Throws(URISyntaxException::class)
    override fun connect(username: String?) {

        var mUsername = username
        //var mSocket: Socket?

        try {
            mSocket = IO.socket(SOCKET_URL)
            mSocket?.connect()
        } catch (e: URISyntaxException) {
            println("FAILED TO GET SOCKET FROM URL : \n$e")
        }
    }

    override fun disconnect() {
        if (mSocket != null) mSocket?.disconnect()
    }

    override fun sendMessage() {
        TODO("Not yet implemented")
    }

    override fun setEventListener(eventListener: EventListener) {
        mEventListener = eventListener
    }
}