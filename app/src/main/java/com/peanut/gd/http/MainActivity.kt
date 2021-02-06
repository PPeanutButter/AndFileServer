package com.peanut.gd.http

import android.Manifest
import android.content.Intent
import android.os.Bundle
import android.view.KeyEvent
import android.widget.LinearLayout
import android.widget.TextView
import java.lang.Exception

class MainActivity : PeanutActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        SettingManager.init(this)
        setContentView(R.layout.activity_main)
        requestPermissionSuccess(Manifest.permission.WRITE_EXTERNAL_STORAGE){
            startService(Intent(this, HttpService::class.java))
        }
        val panel = findViewById<LinearLayout>(R.id.log)
        panel.removeAllViews()
        thread {
            while (true) {
                try {
                    for (log in SettingManager.getLogs())
                        runOnUiThread { log?.let { a-> panel.addView(TextView(this).also { it.text = a }) } }
                } catch (e: Exception) {

                }
                Thread.sleep(200)
            }
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