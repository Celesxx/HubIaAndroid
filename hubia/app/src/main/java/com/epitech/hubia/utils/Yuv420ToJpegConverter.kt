package com.epitech.hubia.utils

import android.graphics.ImageFormat
import android.graphics.Rect
import android.graphics.YuvImage
import android.media.Image
import java.io.ByteArrayOutputStream
import java.nio.ByteBuffer

class Yuv420ToJpegConverter {

    companion object {

        fun yuv420ToJpeg(image: Image, width: Int, height: Int): ByteArray {
            return nv21ToJpeg(yuv420ToNv21(image), width, height, 100)
        }

        fun nv21ToJpeg(nv21: ByteArray, width: Int, height: Int, quality: Int): ByteArray {
            val out = ByteArrayOutputStream()
            val yuv = YuvImage(nv21, ImageFormat.NV21, width, height, null)
            yuv.compressToJpeg(Rect(0, 0, width, height), quality, out)

            return out.toByteArray()
        }

        fun yuv420ToNv21(image: Image): ByteArray {

            val crop: Rect = image.cropRect
            val format = image.format
            val width = crop.width()
            val height = crop.height()
            val planes = image.planes
            val data: ByteArray = ByteArray(width * height * ImageFormat.getBitsPerPixel(format) / 8)
            val rowData: ByteArray = ByteArray(planes[0].rowStride)

            var channelOffset = 0
            var outputStride = 1
            var i = 0
            while (i < planes.size) {
                when (i) {
                    0 -> {
                        channelOffset = 0
                        outputStride = 1
                    }
                    1 -> {
                        channelOffset = width * height + 1
                        outputStride = 2
                    }
                    2 -> {
                        channelOffset = width * height
                        outputStride = 2
                    }
                }
                val buffer: ByteBuffer = planes[i].buffer
                val rowStride = planes[i].rowStride
                val pixelStride = planes[i].pixelStride

                val shift = if (i == 0) 0 else 1
                val w = width shr shift
                val h = height shr shift

                buffer.position(rowStride * (crop.top shr shift) + pixelStride * (crop.left shr shift))

                var row = 0
                while (row < h) {
                    var length: Int
                    if (pixelStride == 1 && outputStride == 1) {
                        length = w
                        buffer.get(data, channelOffset, length)
                        channelOffset += length
                    } else {
                        length = (w - 1) * pixelStride + 1
                        buffer.get(rowData, 0, length)

                        var col = 0
                        while (col < w) {
                            data[channelOffset] = rowData[col * pixelStride]
                            channelOffset += outputStride
                            col++
                        }
                    }
                    if (row < h - 1) {
                        buffer.position(buffer.position() + rowStride - length)
                    }
                    row++
                }
                i++
            }
            return data
        }
    }
    /*
// Function to be created
// Extract image data in YUV_420_888 and set it to Byte Array
val y = mediaImage.planes[0]
val u = mediaImage.planes[1]
val v = mediaImage.planes[2]

val yB = y.buffer.remaining()
val uB = u.buffer.remaining()
val vB = v.buffer.remaining()

val imageData = ByteArray(yB + uB + vB)

y.buffer.get(imageData, 0, yB)
u.buffer.get(imageData, yB, uB)
v.buffer.get(imageData, yB + uB, vB) */
}