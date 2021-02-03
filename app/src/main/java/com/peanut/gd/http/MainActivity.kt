package com.peanut.gd.http

import android.Manifest
import android.content.Intent
import android.os.Bundle

class MainActivity : PeanutActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        requestPermissionSuccess(Manifest.permission.WRITE_EXTERNAL_STORAGE){
            startService(Intent(this, HttpService::class.java))
        }
    }
}