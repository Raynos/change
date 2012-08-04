class UsersController < ApplicationController
  def update
    @user = current_user
    @user.rep_status = true
    @user.save
    flash[:messages] = "Your submission has been edited!"
    redirect_to root_path
  end

  def upgrade
    @user = current_user
    render "users/upgrade"
  end

  def edit
    if current_user.rep_status == true
      @user = current_user
    else
      render "users_path"
    end
  end

  def show
    @user = User.find(params[:id])
  end
end