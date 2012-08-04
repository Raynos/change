class UsersController < ApplicationController
  def update
    @user = current_user
    @user.save
    flash[:messages] = "Your submission has been edited!"
    redirect_to root_path
  end

  def show
    @user = User.find(params[:id])
  end
end