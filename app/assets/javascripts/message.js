$(function(){
        function buildHTML(message){
                var content_tag = message.content.length > 0 ? 
                 `<p class = "lower-message__content">${message.content}</p>` : "";
                var image_tag = message.image.url ? 
                 `<img src = ${message.image.url} ,class = "lower-message__image">`: "";

                var html = ` <div class = "message" data-message-id="${message.id}">
                                <div class = "essage__upper-info"></div>
                                   <p class = "message__upper-info__talker"> ${message.name}</p>
                                   <p class = "message__upper-info__date"> ${message.created_at}</p>
                                <p class = "message__text">
                                   ${content_tag }
                                   ${image_tag }
                                </p>`
                return html;
        }

        var buildMessageHTML = function(message) {
               var content_tag = message.content.length > 0 ? 
                 `<p class = "lower-message__content">${message.content}</p>` : "";
                var image_tag = message.image.url ? 
                 `<img src = ${message.image.url} ,class = "lower-message__image">`: "";

                var html = ` <div class = "message" data-message-id="${message.id}">
                                <div class = "essage__upper-info"></div>
                                   <p class = "message__upper-info__talker"> ${message.name}</p>
                                   <p class = "message__upper-info__date"> ${message.created_at}</p>
                                <p class = "message__text">
                                   ${content_tag }
                                   ${image_tag }
                                </p>`
                return html;
        };

        $('#new_message').on('submit', function(e){
                e.preventDefault();
                var formData = new FormData(this);
                var url = $(this).attr('action ')
                $.ajax({
                        url: url,
                        type: 'POST', 
                        data: formData,  
                        dataType: 'json',
                        processData: false,
                        contentType: false
                })
                .done(function(data){
                        var html = buildHTML(data);
                        $('.messages').append(html);
                        $('.form__submit').removeAttr('disabled');
                        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
                        $('form')[0].reset();
                        return false
                })
                .fail(function() {
                        alert("メッセージ送信に失敗しました");
                 });
        })   

        var reloadMessages = function() {
                if (window.location.href.match(/\/groups\/\d+\/messages/)){
                last_message_id = $('.message:last').data("message-id"); 
                $.ajax({
                  url: "api/messages",
                  type: 'get',
                  dataType: 'json',
                  data: {id: last_message_id}
                })
                .done(function(messages) {
                        console.log(messages);
                   var insertHTML = ' ';
                   messages.forEach(function (message){
                   insertHTML = buildMessageHTML(message)
                   $('.messages').append(insertHTML)
                   })
                   $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
                })
                .fail(function() {
                    alert('自動更新に失敗しました');
                });
         };
        }
         setInterval(reloadMessages, 5000);
});



