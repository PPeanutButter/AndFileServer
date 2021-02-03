package com.peanut.gd.http

import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Environment
import android.os.IBinder
import android.webkit.MimeTypeMap
import fi.iki.elonen.NanoHTTPD
import org.json.JSONArray
import org.json.JSONObject
import java.io.BufferedReader
import java.io.File
import java.io.FileInputStream
import java.io.InputStreamReader
import java.net.URLEncoder
import java.nio.charset.Charset
import java.text.SimpleDateFormat
import java.util.*

class HttpService : Service() {
    @Suppress("DEPRECATION")
    private var rootPath = Environment.getExternalStorageDirectory().path
    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        HttpServer(8081,this)
        return super.onStartCommand(intent, flags, startId)
    }

    inner class HttpServer(HttpPort: Int,private val context: Context): NanoHTTPD(HttpPort) {
        init {
            start(SOCKET_READ_TIMEOUT, false)
            println("\nRunning! Point your browsers to http://${super.getHostname()}:8081/ \n")
        }

        /**
         * 不管是什么路径的链接都发送模板html，读取路径然后通过api来加载文件夹与文件
         *
         * api：
         *      http://localhost:8081/getFileList?path=/ --获取文件list[{name,type}]
         *      http://localhost:8081/getAssets?res=style.css --获取html模板资源
         *      http://localhost:8081/getFileDetail?path=style.css --获取文件信息[{mime_type,size,last_edit_time}]
         *      [not support yet]http://localhost:8081/getFile --下载文件
         *      http://localhost:8081/else --获取index.html
         */
        override fun serve(session: IHTTPSession): Response {
            return try {
                return when (session.uri){
                    "/getFileList"->getFileList(session.parameters)
                    "/getFileDetail"->getFileDetail(session.parameters)
                    "/getFile"->getFile(session.parameters)
                    "/getAssets"->{
                        session.parameters["res"]?.get(0)?.sendAssets()?: newFixedLengthResponse(Response.Status.NOT_FOUND,
                            MIME_PLAINTEXT,"404")
                    }
                    else -> "index.html".sendAssets(Build.BRAND + " " + Build.MODEL)
                }
            }catch (e: Exception){
                e.printStackTrace()
                newFixedLengthResponse(e.localizedMessage)
            }
        }

        private fun String.sendAssets():Response {
            val ins = context.resources.assets.open(this)
            return newFixedLengthResponse(
                Response.Status.OK,
                MIME_TYPES[this.substring(this.lastIndexOf(".") + 1)],
                ins, ins.available().toLong()
            )
        }

        private fun String.sendAssets(args:String):Response =
            newFixedLengthResponse(
                Response.Status.OK,
                mimeTypes()[this.substring(this.lastIndexOf(".")+1)],
                String.format(BufferedReader(InputStreamReader(context.resources.assets.open(this))).readText(),args)
            )

        private fun getFile(parameters: MutableMap<String, MutableList<String>>):Response{
            parameters["path"]?.get(0)?.let { path->
                File(rootPath + path).let { file->
                    val ins = FileInputStream(file)
                    return newFixedLengthResponse(Response.Status.OK, "application/octet-stream",ins,ins.available().toLong()).also {
                        @Suppress("DEPRECATION")
                        it.addHeader("Content-Disposition","attachment;filename=" +String(URLEncoder.encode(file.name).toByteArray(),
                            Charset.forName("ISO8859-1")))
                    }
                }
            }
            return newFixedLengthResponse(Response.Status.FORBIDDEN, "application/json","{\"msg\":\"参数错误\"")
        }

        private fun getFileList(parameters: MutableMap<String, MutableList<String>>):Response{
            parameters["path"]?.get(0)?.let { path->
                val fileList = JSONArray()
                File(rootPath + path).listFiles()?.let { files->
                    for (file in files)
                        fileList.put(JSONObject().also { jsonObject: JSONObject ->
                            jsonObject.put("name", file.name)
                            jsonObject.put("type", if (file.isDirectory) "Directory" else "File")
                        })
                    return newFixedLengthResponse(Response.Status.OK, "application/json",fileList.toString())
                }
                return newFixedLengthResponse(Response.Status.OK, "application/json","[]")
            }
            return newFixedLengthResponse(Response.Status.FORBIDDEN, "application/json","{\"msg\":\"参数错误\"")
        }

        private fun getFileDetail(parameters: MutableMap<String, MutableList<String>>):Response{
            parameters["path"]?.get(0)?.let { path->
                val fileDetails = JSONArray()
                File(rootPath + path).let { file->
                    fileDetails.putJson("类型",MimeTypeMap.getSingleton().getMimeTypeFromExtension(file.name.substring(file.name.lastIndexOf(".")+1))?:"*/*")
                    fileDetails.putJson("大小",file.length().shr(20).toString() + "MB")
                    fileDetails.putJson("上次修改时间", SimpleDateFormat("yyyy年MM月dd日 HH:mm", Locale.CHINA).format(file.lastModified()))
                return newFixedLengthResponse(Response.Status.OK, "application/json",fileDetails.toString())
                }
            }
            return newFixedLengthResponse(Response.Status.FORBIDDEN, "application/json","{\"msg\":\"参数错误\"")
        }

        private fun JSONArray.putJson(key:String,value:String){
            this.put(JSONObject().also {
                it.put("key",key)
                it.put("value",value)
            })
        }

    }
}