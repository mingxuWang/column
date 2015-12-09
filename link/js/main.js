function showLogin(){
	if($("#loginPart").css('display') =='none'){
		$('#loginPart').css('display','block')
	}
	else{
		$('#loginPart').css('display','none')
	}
}

function login(){
    var phoneNumber = $('#inputPhone');
    var passwords= $('#inputPassword');
    var errorWords = $("#errorWords");
    if(phoneNumber.val() =="" || passwords.val() == ''){
        errorWords.html('手机号/密码不能为空！')
    }
    else{
        $.ajax({
            url: '123.html',
            type: 'POST',
            dataType: 'json',
            data: {'phoneNumber': phoneNumber.val(),'passwords': passwords.val()},
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            errorWords.html("您的手机号／密码错误，请检查后重新输入");
            phoneNumber.val('');
            passwords.val('');
        })
        .always(function() {
            console.log("complete");
        });
    }

     
}

function timestampformat(timestamp) {
    var date = new Date();
    date.setTime(timestamp);
    date.toLocaleString();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var fullDate = year+"年"+month+"月"+day+"日";
    return fullDate;
} 


$("#loginPart").bind("keydown",function(e){   
    var theEvent = e || window.event;    
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;    
    if (code == 13) {    

            $("#btnLogin").click();
        }    
});


