package com.peanut.gd.http

import android.Manifest
import android.content.Intent
import android.os.Bundle
import android.view.KeyEvent

class MainActivity : PeanutActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        requestPermissionSuccess(Manifest.permission.WRITE_EXTERNAL_STORAGE){
            startService(Intent(this, HttpService::class.java))
        }
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        return if (keyCode == KeyEvent.KEYCODE_BACK) {
            val intent = Intent(Intent.ACTION_MAIN)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
            intent.addCategory(Intent.CATEGORY_HOME)
            this.startActivity(intent)
            true
        }else super.onKeyDown(keyCode, event)
    }
}