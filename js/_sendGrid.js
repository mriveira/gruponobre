function enviarEmail() {
    $("#btnEnviar").html("Enviando, aguarde...");
    $("#btnEnviar").prop("disabled", true);
	
	var sendGridSecret = "U2FsdGVkX1+b3q7sabdjakJTHtXVcCgcCvSffpu7RNor3usmd4GPJOqrA41nf13mOKGptifHW0weRM39hhaS+/qED0yzJirChyhfe8Bdy+ldMEFa8iIyfQ+gqsgVdtSQ";
	var sendGridSalt = "ec24ae4f-dfc6-4df9-9b10-dd26a22653b5";
	var sendTo = "mateus@huios.com.br";
	var subject = "Contato do site";
    sendMail(sendGridSecret, sendGridSalt, $('#email').val(), sendTo, subject, $('#message').val());
}

function formatMessageContent(messageContent) {

}


function sendMail(sendGridSecret, sendGridSalt, sendFrom, sendTo, subject, messageContent) {
	var decrypted = CryptoJS.AES.decrypt(sendGridSecret, sendGridSalt);
    $.ajax({
        type: "POST",
        url: 'https://api.sendgrid.com/v3/mail/send',
        headers: {
            "Content-Type": "application/json",
            "Authorization": decrypted.toString(CryptoJS.enc.Utf8)
        },
        data: JSON.stringify({
            "personalizations": [{
                "to": [{"email": sendTo}],
                "subject": subject
            }],
            "from": {
                "email": sendFrom
            },
            "content": [{
                "type": "text/html",
                "value": messageContent
            }]
        }),
        dataType: "json",
        async: true,
        success: function() {
            swal("Sucesso!", "Seu e-mail foi enviado com sucesso!\nLogo entraremos em contato.", "success");
            $("#btnEnviar").html("Enviar");
            $("#btnEnviar").prop("disabled", false);
            $('#message').focus();
        },
        error: function(detalhes) {
            swal("Oh não!", "Ocorreu uma falha no envio do seu e-mail!\nTente enviar novamente sua mensagem.", "error");
            $("#btnEnviar").html("Enviar");
            $("#btnEnviar").prop("disabled", false);
            $('#message').focus();
            //console.log("erro", detalhes);
        }
    })
}
