class UsersController < ApplicationController

	def register_rep
		@user = current_user
	end

	def update
    	@user = current_user
    	if @user.update_attributes(params[:user])
    		@user.rep_status = true
    		@user.save
      		flash[:messages] = "Your submission has been edited!"
      		redirect_to root_path
    	else
      	render "users/user_id/register_rep"
    	end    
  	end

  	def edit
  		render 'form'
  	end

	def show
		@user = current_user
	end
end