class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
# [authenticate_user!]未ログイン時はログインページに遷移するように設定
  before_action :authenticate_user!
# 追加のパラメーターを許可したい場合。configure_permitted_parametersメソッド
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
