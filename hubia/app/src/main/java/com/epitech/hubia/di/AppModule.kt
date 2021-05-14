package com.epitech.hubia.di

import com.epitech.hubia.data.EventService
import com.epitech.hubia.data.EventServiceImpl
import com.epitech.hubia.data.SocketDataSource
import com.epitech.hubia.data.SocketRemoteDataSource
import com.epitech.hubia.repository.SocketRepository
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
    fun providesEventService(gson: Gson): EventService = EventServiceImpl(gson)

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
