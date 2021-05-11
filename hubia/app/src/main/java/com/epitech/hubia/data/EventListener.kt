package com.epitech.hubia.data

interface EventListener {

    fun onConnect(vararg args: Any)

    fun onDisconnect(vararg args: Any)

    fun onNewMessage(vararg args: Any)

    fun onTestReceived(vararg args: Any)
}