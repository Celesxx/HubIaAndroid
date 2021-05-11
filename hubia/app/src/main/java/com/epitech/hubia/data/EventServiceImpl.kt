package com.epitech.hubia.data

import io.socket.client.IO
import io.socket.client.Socket
import io.socket.emitter.Emitter
import io.socket.engineio.client.transports.WebSocket
import timber.log.Timber
import java.net.URISyntaxException
import javax.inject.Inject
import kotlin.jvm.Throws

class EventServiceImpl @Inject() constructor() : EventService {
    companion object {
        private val EMULATOR_URL = "http://10.0.2.2:4000/"
        private val LOCALHOST_URL = "http://127.0.0.1:4000/"
        private val SOCKET_URL = LOCALHOST_URL
        private val EVENT_CONNECT = Socket.EVENT_CONNECT
        private val EVENT_DISCONNECT = Socket.EVENT_DISCONNECT
        private val EVENT_NEW_MESSAGE = "new message"
        private var mSocket: Socket? = null
        private lateinit var mEventListener: EventListener
    }


    @Throws(URISyntaxException::class)
    override fun connect(username: String?) {

        var mUsername = username

        try {
            val socketOptions = IO.Options()
            with(socketOptions) {
                forceNew = true
                reconnection = true
                transports = arrayOf(WebSocket.NAME)    //message plus claire pour le message d'erreur loggé

            }
            mSocket = IO.socket(SOCKET_URL, socketOptions)

            mSocket?.let {
                with(it) {

                    // BIND LISTENERS TO CALLBACKS
                    on(Socket.EVENT_CONNECT, onConnect())
                    on(Socket.EVENT_DISCONNECT, onDisconnect())
                    on(Socket.EVENT_CONNECT_ERROR, onConnectError())
                    on("onTestReceived", onTestReceived())

                    connect()

                    emit("Hello", "Bonjour")
                }
/*                GlobalScope.launch {
                    withContext(Dispatchers.IO) {
                        while (true) {
                            Timber.d("____________HERE IS SOCKET CONNECTED : ${mSocket?.connected()}")
                            Timber.d("____________HERE IS SOCKET ACTIVE : ${mSocket?.isActive}")
                            delay(1000)
                        }
                    }
                }*/
            }

        } catch (e: URISyntaxException) {
            Timber.e(e, "Failed to get socket from URL: \n$e")
        }
    }


    override fun setEventListener(eventListener: EventListener) {
        mEventListener = eventListener
    }


    override fun disconnect() {
        if (mSocket != null) mSocket?.disconnect()
    }


    // ============== EMITTERS ==============

    override fun sendMessage() {
        TODO("SEND MESSAGE Not yet implemented")
    }


    override fun sendImages(vararg args: Any) {
        mSocket?.emit("newImage", args)
    }


    // ============== LISTENERS ==============

    private fun onConnect(): Emitter.Listener =
        Emitter.Listener {
            Timber.d("Event Received: Socket connection made")
            mEventListener.onConnect(*it)
        }

    private fun onDisconnect(): Emitter.Listener =
        Emitter.Listener {
            Timber.d("Event Received: Socket disconnected")
            mEventListener.onConnect(*it)
        }

    private fun onConnectError(): Emitter.Listener =
        Emitter.Listener {
            Timber.d("Event Received: ON CONNECT ERROR")
            Timber.d("ERROR MESSAGE: \n ${it[0]}")
        }

    private fun onNewMessage(): Emitter.Listener =
        Emitter.Listener {
            Timber.d("Event Received: NewMessage")
            mEventListener.onConnect(*it)
        }


    private fun onTestReceived(): Emitter.Listener =
        Emitter.Listener {
            Timber.d("Event Received: TEST RECEIVED")
            mEventListener.onTestReceived(*it)
        }



}