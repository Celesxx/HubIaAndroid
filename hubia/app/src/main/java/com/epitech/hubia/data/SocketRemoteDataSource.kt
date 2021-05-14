package com.epitech.hubia.data

import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch
import timber.log.Timber
import java.net.URISyntaxException
import java.util.ArrayList
import javax.inject.Inject
import kotlin.jvm.Throws

class SocketRemoteDataSource @Inject constructor(
    private val mEventService: EventService
) : SocketDataSource {

    //private lateinit var mRepoEventListener: EventListener

    var onTestReceived = MutableSharedFlow<String>(replay = 1)

    var sendImagesChannel = MutableSharedFlow<String>(replay = 1)

    private val jobs = ArrayList<Job>()



    init {
        mEventService.setEventListener(this)
    }

    // ============== FLOWS AND CHANNELS ==============

    fun encodedImagesCollector() {
        // GlobalScope pas besoin de context pour le lancer
        // TODO Watch tutorial about how to consume MutableSharedFlow in a more elegant manner

        val globalScopeResult = GlobalScope.launch(Dispatchers.IO) {
            sendImagesChannel.map {
                it
            }.flowOn(Dispatchers.IO).collect {
                mEventService.sendImages(it)
            }
        }

        jobs.add(globalScopeResult)
    }


    // ============== SOCKET RELATED ==============

    @Throws(URISyntaxException::class)
    override fun connect(username: String?) {
        mEventService.connect()
        encodedImagesCollector()
    }

    override fun disconnect() {
        mEventService.disconnect()
        jobs.forEach { it.cancel() }
        jobs.clear()

    }


    // ============== EMITTERS ==============

    override fun sendMessage() {
        mEventService.sendMessage()
    }

    fun sendImages(encodedImage: String) {
        mEventService.sendImages("newImage", encodedImage)
    }


    // ============== LISTENERS ==============

    override fun onConnect(vararg args: Any) {

    }

    override fun onDisconnect(vararg args: Any) {

    }

    override fun onNewMessage(vararg args: Any) {

    }

    override fun onTestReceived(vararg args: Any) {
        // TODO Transform args from socket to Data Class for Repository
        val tryEmitResult = onTestReceived.tryEmit(args[0] as String)
        Timber.d("__________TRYEMIT RESULT : $tryEmitResult")
    }
}