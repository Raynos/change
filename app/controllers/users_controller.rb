class UsersController < ApplicationController
  def update
    @user = current_user
    if @user.update_attributes(params[:user])
        flash[:messages] = "Your submission has been edited!"
        redirect_to root_path
    end
  end

  def show
    @user = User.find(params[:id])
  end
end