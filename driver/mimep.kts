import java.io.File

val host = "http://drive-thirdparty.googleusercontent.com/128/type/"

val textlines = File("mime.txt").readLines()
var added = emptyArray<String>()
for (line in textlines){
    if (added.indexOf(line) == -1){
        added = added.plus(line)
        val mimetype = line.split("/")
        File("mime-type-icon/"+mimetype[0]).mkdirs()
        File("mime-type-icon/"+mimetype[0]+"/list.txt").appendText(host+line+System.lineSeparator())
    }
}