Rails.application.routes.draw do
  devise_for :users
  
  root 'groups#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end

# messages
# 投稿されたメッセージの一覧表示 & メッセージの入力ができる:index
# メッセージの保存を行う:create
