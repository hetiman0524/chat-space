$(function(){
        function buildHTML(message){
                
                var content_tag = message.content.length > 0 ? 
                 `<p class = "lower-message__content">${message.content}</p>` : "";
                var image_tag = message.image.url ? 
                 `<img src = ${message.image.url} ,class = "lower-message__image">`: "";

                var html = ` <div class = "message">
                                <div class = "essage__upper-info"></div>
                                   <p class = "message__upper-info__talker"> ${message.name}</p>
                                   <p class = "message__upper-info__date"> ${message.created_at}</p>
                                <p class = "message__text">
                                   ${content_tag }
                                   ${image_tag }
                                </p>`
                return html;
        }

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
});
