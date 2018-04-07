$(function(){
  function buildMESSAGE(message) {
    var imageUrl = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image" alt="IMG">`

    var html = `
    <div class="message" data-message-id ="${message.id}">
      <div class="upper-message">
        <div class="upper-message__user-name">
          <p>${message.name}</p>
        </div>
      <div class="upper-message__date">
          <p> ${message.created_at}</p>
      </div>
      </div>
      <div class="lower-meesage">
        <p class="lower-message__content">
          ${message.content}
        </p>
         ${imageUrl}
      </div>
    </div>`
    return html
  }
  $(function(){
    if(location.href.match(/messages$/)){
      setInterval(update, 5000);
    //10000ミリ秒ごとにupdateという関数を実行する
    }else{
      clearInterval(update);
    }
  });
  function update(){ //この関数では以下のことを行う
      if($('.message')[0]){ //もし'messages'というクラスがあったら
            var message_id = $('.message:last').data('message-id'); //一番最後にある'messages'というクラスの'id'というデータ属性を取得し、'message_id'という変数に代入
          } else { //ない場合は
            var message_id = 0 //0を代入
          }
          // var message_id = $('.message:last').data('message-id'); //一番最後にある'messages'というクラスの'id'というデータ属性を取得し、'message_id'という変数に代入
      $.ajax({ //ajax通信で以下のことを行う
        url: location.href, //urlは現在のページを指定
        type: 'GET', //メソッドを指定
        data:{ id: message_id },//railsに引き渡すデータは//このような形(paramsの形をしています)で、'id'には'message_id'を入れる
        dataType: 'json' //データはjson形式
        })
      .done(function(data){
        $.each(data, function(i, data){
        $('.messages').append(buildMESSAGE(data));
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight }, 'fast');
        });
      });
    // };
  };
});
