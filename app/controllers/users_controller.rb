class UsersController < ApplicationController

	def register_rep
		@user = current_user
		if request.put?
			user.rep_status == true
			redirect_to user_path
		end
	end

	def show
		@user = current_user
	end
end