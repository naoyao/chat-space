require 'rails_helper'

describe MessagesController do
  #  letを利用してテスト中使用するインスタンスを定義
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end
      # この中にログインしている場合のテストを記述
      it 'assigns @message' do

# インスタンス変数に代入されたオブジェクトは、コントローラのassigns メソッド経由で参照できます。@messageを参照したい場合、assigns(:message)と記述することができます。
# be_a_newマッチャを利用することで、 対象が引数で指定したクラスのインスタンスかつ未保存のレコードであるかどうか確かめることができます。
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
# @groupはeqマッチャを利用してassigns(:group)とgroupが同一であることを確かめることでテストできます。
        expect(assigns(:group)).to eq group
      end

      it 'redners index' do
  # expectの引数にresponseを渡しています。responseは、example内でリクエストが行われた後の遷移先のビューの情報を持つインスタンスです。
  # render_templateマッチャは引数にアクション名を取り、引数で指定されたアクションがリクエストされた時に自動的に遷移するビューを返します。
        expect(response).to render_template :index
      end
    end

# contextで log in と　log out をクラスわけ=========================
    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end
  # この中にログインしている場合のテストを記述
  # redirect_toマッチャは引数にとったプレフィックスにリダイレクトした際の情報を返すマッチャです。
      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
