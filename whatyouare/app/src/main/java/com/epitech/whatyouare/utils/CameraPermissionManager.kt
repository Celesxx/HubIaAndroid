package com.epitech.whatyouare.utils

import android.app.Activity
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat


class CameraPermissionManager {
    companion object {
        val CAMERA_RQ = 102

        fun checkForPermissions(activity: Activity, context: Context, permission: String, name: String, requestCode: Int) {

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                when {
                    ContextCompat.checkSelfPermission(context, permission) == PackageManager.PERMISSION_GRANTED -> {
                        Toast.makeText(context, "$name permission granted", Toast.LENGTH_SHORT).show()
                    }
                    ActivityCompat.shouldShowRequestPermissionRationale(activity, permission) -> showDialog(activity, context, permission, name, requestCode)
                    else -> ActivityCompat.requestPermissions(activity, arrayOf(permission), requestCode)
                }
            }
        }



        private fun showDialog(activity: Activity, context: Context, permission: String, name: String, requestCode: Int) {
            val builder = AlertDialog.Builder(context)


            builder.apply {
                setTitle("Permission required")
                setMessage("Permission to access $name is required to use this app")
                setPositiveButton("Ok") { dialog, which ->
                    ActivityCompat.requestPermissions(activity, arrayOf(permission), requestCode)
                }
            }
            val dialog = builder.create()
            dialog.show()
        }
    }

}