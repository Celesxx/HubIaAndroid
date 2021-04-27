package com.epitech.whatyouare.eventservice

import android.util.Log
import io.socket.client.IO
import io.socket.client.Socket
import io.socket.emitter.Emitter
import java.net.URISyntaxException
import kotlin.jvm.Throws

class EventServiceImpl(): EventService{
    companion object {
        private val SOCKET_URL = "http://http://127.0.0.1:4000/"
        private val EVENT_CONNECT = Socket.EVENT_CONNECT
        private val EVENT_DISCONNECT = Socket.EVENT_DISCONNECT
        private val EVENT_NEW_MESSAGE = "new message"
        private var mSocket: Socket? = null
        private lateinit var mEventListener: EventListener
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
        TODO("SEND MESSAGE Not yet implemented")
    }

    override fun setEventListener(eventListener: EventListener) {
        mEventListener = eventListener
    }

    // On Connect Listener
    private fun onConnect(): Emitter.Listener =
        Emitter.Listener {
            Log.d("EventServiceImpl", "Event Received: Socket connection made")
            if (mEventListener != null) {
                mEventListener.onConnect(*it)    // TODO: Should VARARG be used?
            }
    }

    // On Connect Listener
    private fun onDisconnect(): Emitter.Listener =
        Emitter.Listener {
            Log.d("EventServiceImpl", "Event Received: Socket disconnected")
            if (mEventListener != null) {
                mEventListener.onConnect(*it)    // TODO: Should VARARG be used?
            }
    }

    // On Connect Listener
    private fun onNewMessage(): Emitter.Listener =
        Emitter.Listener {
            Log.d("EventServiceImpl", "Event Received: NewMessage")
            if (mEventListener != null) {
                mEventListener.onConnect(*it)    // TODO: Should VARARG be used?
            }
    }
}