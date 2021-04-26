package com.epitech.whatyouare.eventservice

import java.net.URISyntaxException
import kotlin.jvm.Throws

interface EventService {

    @Throws(URISyntaxException::class)
    fun connect(username: String?=null)

    fun disconnect()

    fun sendMessage()

    // TODO setEventListener for consuming events from server
    fun setEventListener(eventListener: EventListener)

}