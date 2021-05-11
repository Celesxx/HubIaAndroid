package com.epitech.hubia

import android.app.Application
import dagger.hilt.android.HiltAndroidApp
import timber.log.Timber

@HiltAndroidApp
class MyApplication: Application() {
    override fun onCreate() {
        super.onCreate()
        if (true) {
            Timber.plant(Timber.DebugTree())
        }
    }
}