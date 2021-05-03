package com.epitech.whatyouare.eventservice

interface EventListener {

    fun onConnect(vararg args: Any)

    fun onDisconnect(vararg args: Any)

    fun onNewMessage(vararg args: Any)

    fun onTestReceived(vararg args: Any)
}