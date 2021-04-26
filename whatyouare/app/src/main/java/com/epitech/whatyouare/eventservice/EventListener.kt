package com.epitech.whatyouare.eventservice

interface EventListener {

    fun onConnect()

    fun onDisconnect()

    fun onNewMessage()
}