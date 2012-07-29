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