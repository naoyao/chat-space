// インクリメンタルサーチ
$(function(){
var search_list = $(".chat-group-user.clearfix.cf");

  function appendUser(user) {
   var html =`
   <div class="chat-group-user clearfix cf">
     <p class="chat-group-user__name">${user.name}</p>
     <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
  </div>
`
  return html
  }

  function appendNoUser(user) {
    var html = `<div id='chat-group-users'></div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function(e){
      var input =$("#user-search-field").val();
      $("#user-search-field").empty();
      if(input !== ""){
      $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
     $("#user-search-result").empty();
     if (users.length !== 0) {
       users.forEach(function(user){
         // console.log(user);
         $("#user-search-result").append(appendUser(user));
       });

     }
     else {
      alert("一致するユーザーはありません");
     }
   })
   .fail(function() {
     alert('error');
   })
 }
  });
// インクリメンタルサーチ後の実装のステップ
// 追加を押されたときにイベントが発火するようにする
    function addUser(user_name,user_id) {
     var html =`
     <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
        <input name='group[user_ids][]' type='hidden' value='${user_id}'>
        <p class='chat-group-user__name'>${user_name}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`

      $(".chat-group-users").append(html)
    }

    $("#user-search-result").on("click", ".chat-group-user__btn--add",function(){
        var user_id = $(this).data("user-id")
        var user_name = $(this).data("user-name")

        addUser(user_name, user_id);
        $(this).parent(".chat-group-user").remove();
      });
      $(".chat-group-users").on("click", ".chat-group-user__btn--remove", function(){
        $(this).parent().remove();
      });
});
