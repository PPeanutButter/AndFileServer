package com.peanut.gd.http

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Handler
import android.widget.Toast
import androidx.core.app.ActivityCompat

@SuppressLint("Registered")
open class PeanutActivity : Activity() {
    protected var onActivityResultListener = mutableListOf<Pair<Int,(Int, Intent?)->Unit>>()
    private var onRequestPermissionsResultListener = mutableListOf<Pair<Int,(Array<out String>, IntArray)->Unit>>()

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        for (a in onActivityResultListener){
            if (a.first == requestCode) {
                a.second.invoke(resultCode,data)
                onActivityResultListener.remove(a)
            }
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        for (a in onRequestPermissionsResultListener){
            if (a.first == requestCode) {
                a.second.invoke(permissions,grantResults)
                onRequestPermissionsResultListener.remove(a)
            }
        }
    }

    /**
     * requestCode：0000,0000,0000,0000,11__,____,____,____
     */
    fun fileChooser(mimeType:String = "application/*",func:(resultCode:Int, data:Intent?)->Unit){
        val requestCode: Int = (Math.random()*0xffff).toInt() or 0xc000
        onActivityResultListener.add(requestCode to func)
        requestPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE){ _, grantResult ->
            if (grantResult == PackageManager.PERMISSION_GRANTED){
                val intent = Intent(Intent.ACTION_GET_CONTENT)
                intent.type = mimeType
                intent.addCategory(Intent.CATEGORY_OPENABLE)
                startActivityForResult(intent, requestCode)
            }else "存储权限被拒绝".toast(this)
        }
    }

    /**
     * requestCode：0000,0000,0000,0000,01__,____,____,____
     */
    fun requestPermissionSuccess(permission:String,func:()->Unit){
        requestPermissions(arrayOf(permission)){ _, grantResults ->
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED){
                func.invoke()
            }else "存储权限被拒绝".toast(this)
        }
    }
    fun requestPermissions(permissions:Array<String>,func:(permissions: Array<out String>, grantResults: IntArray)->Unit){
        val requestCode: Int = (Math.random()*0xffff).toInt() and 0x7fff or 0x4000
        onRequestPermissionsResultListener.add(requestCode to func)
        ActivityCompat.requestPermissions(this, permissions, requestCode)
    }

    fun requestPermission(permission:String,func:(permission: String, grantResult: Int)->Unit) =
        requestPermissions(arrayOf(permission)){permissions, grantResults ->
            func.invoke(permissions[0],grantResults[0])
        }

    /**
     * requestCode：0000,0000,0000,0000,10__,____,____,____
     */
    fun callActivity(intent: Intent,func:(resultCode:Int, data:Intent?)->Unit){
        val requestCode: Int = (Math.random()*0xffff).toInt() and 0xbfff or 0x8000
        onActivityResultListener.add(requestCode to func)
        startActivityForResult(intent, requestCode)
    }

    fun thread(func: () -> Unit){
        object :Thread(){
            override fun run() {
                func.invoke()
            }
        }.start()
    }

    fun UIThread(func: () -> Unit){
        Handler(this.mainLooper).post {
            func.invoke()
        }
    }

    fun String.toast(context: Context) = Toast.makeText(context,this,Toast.LENGTH_SHORT).show()
}