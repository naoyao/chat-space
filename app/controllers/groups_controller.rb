# groups_controllerはグループが編集されたとき更新の可否にあわせた処理ができるよう記述。
class GroupsController < ApplicationController
# 加えて、共通する処理をset_groupとして定義し、before_actionで呼び出す記述をしましょう。
  before_action :set_group, only: [:edit, :update]

  def index
    @group = Group.new
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end

  end
# groupsコントローラのeditアクションにおいて行いたい処理は、「form_forで使用するためのインスタンス変数@groupを定義すること」のみです
# 今回の場合、@groupの定義も 「before_action :set_group」によって切り出されているため、editアクションの定義を省略することができます。
  def edit
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private
  def group_params
      params.require(:group).permit(:name, {:user_ids => []})
  end

  def set_group
    @group = Group.find(params[:id])
  end

end
