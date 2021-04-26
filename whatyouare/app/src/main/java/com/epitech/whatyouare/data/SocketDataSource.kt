package com.epitech.whatyouare.data

import com.epitech.whatyouare.eventservice.EventListener
import java.net.URISyntaxException
import kotlin.jvm.Throws

interface SocketDataSource: EventListener {

    @Throws(URISyntaxException::class)
    fun connect(username: String?=null)

    fun disconnect()

    fun sendMessage()

    fun setEventListener(eventListener: EventListener)
}