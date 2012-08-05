class SponsorshipsController < ApplicationController

	def new
	  if user_signed_in?
      @sponsorship = current_user.sponsorships.new(params[:sponsorship])
      @sponsorship.issue_id = params[:issue_id]
      @sponsorship.amount = 10
      @sponsorship.save
      redirect_to root_path
	  else
      redirect_to new_user_session_path
	  end
	end

	def create
	    if @sponsorship.save
	      respond_with @sponsorship, :location => sponsorships_create_path
	      flash[:messages] = "Thank you for your sponsorship!"
	      redirect_to issue_path
	    else
	      render :new
	    end
	end

end
