var root = "/";

function goNext(name){
    root = root + name + "/";
    getFileList();
}

function goBack(){
    if(root != "/"){
        root = root.substring(0,root.substring(0,root.length - 1).lastIndexOf("/") + 1);
        getFileList();
    }else openSnackbar("不能再返回了");
}

function onItemClick(name,type,mime_type) {
    console.log(name);
    if(type === "Directory")
        goNext(name);
    else
        getFileDetail(name,mime_type);
}

function getFileList(){
    $.get("/getFileList?path="+root,function(data){
        $('div#dir-panel').empty();
        $('div#file-panel').empty();
        $('.mdc-top-app-bar__title').text(root)
        for (const list of eval(data)) {
            if (list.type === "Directory")
                $('div#dir-panel').append(String.format(directory_html_data,list.name))
            else $('div#file-panel').append(String.format(file_html_data,list.name,list.mime_type));
        }
        getSettings()
    });
}

function getSettings(key,value){
    $.get("/settings?key="+key+"&value="+value,function(data){
        if(value != null && value != '')
            getFileList();
        else{
            const settings = eval(data)
            $(".menu-list-panel").empty()
            if (settings.SHOW_HIDDEN_FILES == 'true')
                $(".menu-list-panel").append(String.format(menu_list_html,"不显示隐藏文件","false"));
            else $(".menu-list-panel").append(String.format(menu_list_html,"显示隐藏文件","true"));
        }
    });
}

function getFileDetail(fileName,mime_type){
    $.get("/getFileDetail?path="+root+fileName,function(data){
        //文件名
        $('.file-dialog-name__text').text(fileName);
        $('ul.mdc-list-detail-panel').empty();
        $('div.mdc-dialog__actions').empty();
        //判断是否是视频文件
        let isVideo;
        if (mime_type.toLowerCase().startsWith("video/")){
            isVideo = ""
            $('div.file-icon').html(String.format(file_detail_icon_video_html,"/getVideoPreview?path="+root+fileName));
        }
        else {
            isVideo = "disabled"
            $('div.file-icon').html(String.format(file_detail_icon_html,"/getAssets?res=mime-type-icon/"+mime_type));
        }
        //详情
        for (const list of eval(data)) {
            $('ul.mdc-list-detail-panel').append(String.format(file_detail_html,list.key,list.value))
        }
        $('div.mdc-dialog__actions').append(String.format(dialog_actions_html,window.location.host+"/getFile?path="+root+fileName,isVideo))
        showDialog();
    });
}

function onDialogButtonClick(url,type){
    console.log(url)
    if(type === "copy"){
        var clipboard = new ClipboardJS('.dialog-copy', {
            text: function(trigger) {
                return encodeURI(url);
            }
        });
        clipboard.on('success', function(e) {
        openSnackbar("复制成功");
            e.clearSelection();
            clipboard.destroy();
        });
        clipboard.on('error', function(e) {
            openSnackbar("复制失败：" + data + "，请手动复制");
            clipboard.destroy();
        });
    } else if(type === "download") {
        window.open(encodeURI("http://"+url));
    } else if(type === "play") {
        window.open(encodeURI("potplayer://http://"+url));
    }
}

String.format = function() {
    if (arguments.length === 0)
        return null;
    let str = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        const re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

function openSnackbar(error_msg) {
    $("div.mdc-snackbar__label").text(error_msg);
    const snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
    snackbar.open();
}

function showDialog() {
    const dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));
    dialog.open();
}

getFileList()