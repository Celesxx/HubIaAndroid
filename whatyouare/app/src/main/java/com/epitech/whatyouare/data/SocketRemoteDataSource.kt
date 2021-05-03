package com.epitech.whatyouare.data

import com.epitech.whatyouare.eventservice.EventListener
import com.epitech.whatyouare.eventservice.EventService
import com.epitech.whatyouare.eventservice.EventServiceImpl
import kotlinx.coroutines.channels.BufferOverflow
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow
import timber.log.Timber
import java.net.URISyntaxException
import javax.inject.Inject
import kotlin.jvm.Throws

class SocketRemoteDataSource @Inject constructor(
    private val mEventService: EventService
) : SocketDataSource {

    //private lateinit var mRepoEventListener: EventListener

    var onTestReceived = MutableSharedFlow<String>(replay = 1)

    init {
        mEventService.setEventListener(this)
    }


    @Throws(URISyntaxException::class)
    override fun connect(username: String?) {
        mEventService.connect()
    }

    override fun disconnect() {
        mEventService.disconnect()
    }

    override fun sendMessage() {
        mEventService.sendMessage()
    }

    override fun onConnect(vararg args: Any) {

    }

    override fun onDisconnect(vararg args: Any) {

    }

    override fun onNewMessage(vararg args: Any) {

    }

    override fun onTestReceived(vararg args: Any) {
        // TODO Transform args from socket to Data Class for Repository
        val tryEmitResult = onTestReceived.tryEmit("Test")
        Timber.d("__________TRYEMIT RESULT : $tryEmitResult")
    }

}