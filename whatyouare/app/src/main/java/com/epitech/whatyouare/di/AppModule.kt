package com.epitech.whatyouare.di

import com.epitech.whatyouare.data.SocketRemoteDataSource
import com.epitech.whatyouare.eventservice.EventServiceImpl
import com.epitech.whatyouare.repository.SocketRepository
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

    @Provides
    @Singleton
    fun providesSocketRemoteDataSource(eventServiceImpl: EventServiceImpl) =
        SocketRemoteDataSource(eventServiceImpl)

    @Provides
    @Singleton
    fun providesSocketRepository(socketRemoteDataSource: SocketRemoteDataSource) =
        SocketRepository(socketRemoteDataSource)
}