class SponsorshipsController < ApplicationController

	def new
		@sponsorship = Sponsorship.new
	end

	def create
		@sponsorship = issue_id.sponsorships.new(params[:sponsorship], :user => current_user.id)
	    if @sponsorship.save
	      flash[:messages] = "Thank you for your sponsorship!"
	      redirect_to issue_path
	    else
	      render :new
	    end
	end

end
