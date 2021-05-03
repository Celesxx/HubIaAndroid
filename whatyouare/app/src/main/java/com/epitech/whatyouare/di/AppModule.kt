package com.epitech.whatyouare.di

import com.epitech.whatyouare.data.SocketDataSource
import com.epitech.whatyouare.data.SocketRemoteDataSource
import com.epitech.whatyouare.eventservice.EventService
import com.epitech.whatyouare.eventservice.EventServiceImpl
import com.epitech.whatyouare.repository.SocketRepository
import com.google.gson.Gson
import com.google.gson.GsonBuilder
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
    fun providesEventService(): EventService = EventServiceImpl()

    @Provides
    @Singleton
    fun providesSocketRemoteDataSource(eventServiceImpl: EventService): SocketDataSource =
        SocketRemoteDataSource(eventServiceImpl)

    @Provides
    @Singleton
    fun providesSocketRepository(socketRemoteDataSource: SocketRemoteDataSource) =
        SocketRepository(socketRemoteDataSource)


    @Provides
    @Singleton
    fun providesGson() = GsonBuilder().create()
}