class IssuesController < ApplicationController
  
  def index
    @issues = Kaminari::paginate_array(Issue.find(:all)).page(params[:page]).per(10)
  end
  
  def show
    issue = Issue.find_by_id(params{[:issue_id])
    user = User.find_by_id(issue.user_id)
    @user_name = user.name
    @user_location = user.location
    @user_email = user.email
    @name = issue.name
    @description = issue.description
    @plan = issue.plan
  end
  
  
  def update
    
  end
  
  def delete
    issue = Issue.find_by_id(params[:issue_id])
    issue.destroy
    redirect_to :action => "show_issues"    
  end

  def new
  	if User.find_by_id(session[:uid]).rep_status = true 
      issue = Issue.new do |u| 
        u.name = params[:name]
        u.description = params[:description]
        u.user_id = session[:uid]
        u.plan = params[:plan]
      end
      if request.post? 
        if issue.save
          redirect_to :action => "show_profile"
        else 
          redirect_to :action => "create_issue", :notice => "An error has occurred. Please try again." 
        end
      end
    else
      redirect_to :action => "register_rep", :notice => "You're on your way to championing an issue. Please provide some additional information."       
    end  
  end

  def register_rep
    user= User.find_by_id(session[:uid])
    @bio = user.bio
    @location= user.location
    @twitter_handle= user.twitter_handle
    if request.post? 
      user.location = params[:location]
      user.twitter_handle = params[:twitter_handle]
      user.bio = params[:bio]
      user.rep_status = 1
      if user.save
        redirect_to :action => "create_issue" 
      else
        redirect_to :action => "register_rep", :notice => "An error has occurred. Please try again."
      end
    end    
  end
  
end