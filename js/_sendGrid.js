function enviarEmail() {
    $("#btnEnviar").html("Enviando, aguarde...");
    $("#btnEnviar").prop("disabled", true);
    sendMail($('#email').val(), "mateus@huios.com.br", "Contato do site", $('#message').val());
}

function formatMessageContent(messageContent) {

}


function sendMail(sendFrom, sendTo, subject, messageContent) {
    $.ajax({
        type: "POST",
        url: 'https://api.sendgrid.com/v3/mail/send',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
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
