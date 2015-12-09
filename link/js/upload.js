// 添加图片插入图片模块
function addImg(){
    var value = document.getElementById('Imgs').value;
    um.execCommand('insertHtml', value)
}
function insert(){
    var choose = $('.inputChoose');
    var imgs = $(".chooseImg")
    for(var i = 0;i < choose.length;i++){
        if(choose[i].checked){
            var text = '<img src = '+'"'+imgs[i].src+'"/>'
            um.execCommand('insertHtml', text)
        }
    }
}
function forCover(){
    var choose = $('.inputChoose');
    var imgs = $(".chooseImg");
    var cover = $("#coverImg");
    var coverPart = $("coverImgPart");
    for(var i = 0;i < choose.length;i++){
        if(choose[i].checked){
            cover.attr('src',imgs[i].src);
        }

    }
}

// 图片上传美化
$(document).ready(function(){
// Basic
    $('.dropify').dropify();

    // Translated
    $('.dropify-fr').dropify({
        messages: {
            'default': '点击或拖拽需要发布的图片',
            'replace': '点击或拖拽文件到这里来替换文件',
            'remove':  '移除文件',
            'error':   '对不起，你上传的文件太大了'
        }
    });

    // Used events
    var drEvent = $('.dropify-event').dropify();

    drEvent.on('dropify.beforeClear', function(event, element){
        return confirm("Do you really want to delete \"" + element.filename + "\" ?");
    });

    drEvent.on('dropify.afterClear', function(event, element){
        alert('File deleted');
    });
});

//上传图片模块
function upload(){
    var fd = new FormData($("#fileinfo"));
    fd.append("upLoad", $('#uploadImg')[0].files[0]);
    $.ajax({
        url: "stash.php",
        type: "POST",
        data: fd,
        dataType:'JSON',
        processData: false,  // 告诉jQuery不要去处理发送的数据
        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
        success:function(){
            alert('成功');
        },
        error: function(err){
            alert(err.readyState);
        }
    });
}

// 编辑器相关
//实例化编辑器
var um = UM.getEditor('myEditor');
um.addListener('blur',function(){
    $('#focush2').html('编辑器失去焦点了')
});
um.addListener('focus',function(){
    $('#focush2').html('')
});
//按钮的操作
function insertHtml() {
    var value = prompt('插入html代码', '');
    alert(value);
    um.execCommand('insertHtml', value)
}
function isFocus(){
    alert(um.isFocus())
}
function doBlur(){
    um.blur()
}
function getAllHtml() {
    alert(UM.getEditor('myEditor').getAllHtml())
}
function getContent() {
    var arr = [];
    arr.push(UM.getEditor('myEditor').getContent());
    return arr.join("")
}
function getPlainTxt() {
    var arr = [];
    arr.push("使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容");
    arr.push("内容为：");
    arr.push(UM.getEditor('myEditor').getPlainTxt());
    alert(arr.join('\n'))
}
function setContent(isAppendTo) {
    var arr = [];
    arr.push("使用editor.setContent('欢迎使用umeditor')方法可以设置编辑器的内容");
    UM.getEditor('myEditor').setContent('欢迎使用umeditor', isAppendTo);
    alert(arr.join("\n"));
}
function setDisabled() {
    UM.getEditor('myEditor').setDisabled('fullscreen');
    disableBtn("enable");
}

function setEnabled() {
    UM.getEditor('myEditor').setEnabled();
    enableBtn();
}

function getText() {
    //当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
    var range = UM.getEditor('myEditor').selection.getRange();
    range.select();
    var txt = UM.getEditor('myEditor').selection.getText();
    alert(txt)
}

function getContentTxt() {
    var arr = [];
    arr.push(UM.getEditor('myEditor').getContentTxt());
    return arr.join("\n");
}
function hasContent() {
    var arr = [];
    arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
    arr.push("判断结果为：");
    arr.push(UM.getEditor('myEditor').hasContents());
    alert(arr.join("\n"));
}
function setFocus() {
    UM.getEditor('myEditor').focus();
}
function disableBtn(str) {
    var div = document.getElementById('btns');
    var btns = domUtils.getElementsByTagName(div, "button");
    for (var i = 0, btn; btn = btns[i++];) {
        if (btn.id == str) {
            domUtils.removeAttributes(btn, ["disabled"]);
        } else {
            btn.setAttribute("disabled", "true");
        }
    }
}
function enableBtn() {
    var div = document.getElementById('btns');
    var btns = domUtils.getElementsByTagName(div, "button");
    for (var i = 0, btn; btn = btns[i++];) {
        domUtils.removeAttributes(btn, ["disabled"]);
    }
}