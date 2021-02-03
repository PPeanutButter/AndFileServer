function onItemClick(name,type) {
    if (type === 'f')
        showDialog(name)
}

function goBack(){

}

function getFileList(path){
    $.get("getFileList.json?path="+path,function(data){
        $('div#dir-panel').empty();
        $('.mdc-top-app-bar__title').text("/")
        const lists = eval(data);
        for (const list of lists) {
            if (list.type === "Directory")
                loadDirHtml(list.name)
            else loadFileHtml(list.name)
        }
    });
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

function loadDirHtml(name) {
    $.get("directory.html",function(data){
        $('div#dir-panel').append(String.format(data,name))
    });
}

function loadFileHtml(name) {
    $.get("file.html",function(data){
        $('div#file-panel').append(String.format(data,name))
    });
}

function openSnackbar(error_msg) {
    $("div.mdc-snackbar__label").text(error_msg);
    const snackbar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
    snackbar.open();
}

function showDialog(fileName) {
    $.get("directory.html",function(data){
        $('.file-dialog-name__text').text(fileName);
        $('div#dir-panel').append(String.format(data,name))
        const dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));
        dialog.open();
    });
}