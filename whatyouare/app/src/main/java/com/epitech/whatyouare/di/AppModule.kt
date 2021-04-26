package com.epitech.whatyouare.di

import com.epitech.whatyouare.eventservice.EventServiceImpl
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun providesEventServiceImpl() = EventServiceImpl()
}