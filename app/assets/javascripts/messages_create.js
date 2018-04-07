$(function(){
  function buildHTML(message){

    var imageurl = message.image == null ? " " : `<img src="${message.image}" class="lower-message__content" alt="IMG">`

    var html =`
    <div class="message" data-message-id = ${message.id} >
      <div class="upper-message">
        <div class="upper-message__user-name">
          <p>${message.user_name}</p>
        </div>
      <div class="upper-message__date">
          <p> ${message.created_at}</p>
      </div>
      </div>
      <div class="lower-meesage">
        <p class="lower-message__content">
          ${message.content}
        </p>
         ${imageurl}
      </div>
    </div>`

    return html;　
  }


    $(".new_message").on("submit",function(e){
      e.preventDefault();
      // 入力した情報はここに入る
      var formData = new FormData(this);
      var url = $(this).attr('action');

      if($(".form__message").val() == "" && $("#message_image").val() == ""){
          alert("メッセージを入力してください.");

      }else{

      $.ajax({
       url: url,
       type: "POST",
       data: formData,
       dataType: 'json',
       processData: false,
       contentType: false
      })
      .done(function(data){
        $('.messages').append(buildHTML(data));
        $('.form__message').val('');// メッセージを初期化して残さない
        $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight }, 'fast');
        $('#message_image').val('');// 画像を初期化して残さない
        // $(".form__submit").prop('disabled', false);
      })
      .fail(function(){
       alert('error');
     })
   }return false;// ここで「 input type="submit"」のアクションを無かったことにしている。
  });

});
