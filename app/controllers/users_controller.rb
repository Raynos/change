class UsersController < ApplicationController

  def register_rep
    user = current_user
    @bio = user.bio
    @location= user.location
    @twitter_handle= user.twitter_handle
    if request.put? 
      user.location = params[:location]
      user.twitter_handle = params[:twitter_handle]
      user.bio = params[:bio]
      user.rep_status = 1
      if user.save
        redirect_to user_path
      else
        redirect_to :action => "register_rep", :notice => "An error has occurred. Please try again."
      end
    end
  end


  def show
    user = current_user
    @name = user.name
    @location = user.location
    if user.rep_status == true
      @bio = user.bio
    else
      @bio = nil
    end
    @sponsorship_Array = Array.new
    sponsorships= Sponsorship.where("user_id= ?", user.id)
    sponsorships.each do |p|
      hash = Hash.new
      hash[:name]= Issue.find_by_id(p.issue_id).name
      hash[:amount] = p.amount
      @sponsorship_Array << hash
    end
    @champion_Array = Array.new
    if user.rep_status = true
      issues= Issues.where("user_id= ?", user.id)
      issues.each do |p|
        hash = Hash.new
        hash[:name] = p.name
        @amount = 0
        sponsorships2 = Sponsorship.where("issue_id=?", p.id)
        sponsorships2.each do |c|
          @amount += c.amount
        end
        @champion_Array << hash
      end
    end       
  end
  
end