class IssuesController < ApplicationController
  
  def show
    @issue = Issue.find(params[:id])
    @rep = User.find(@issue.rep_id)
  end
  
  def destroy
    @issue = Issue.find(params[:id])
    @issue.destroy
    redirect_to root_url
  end

  def create
    @issue = Issue.new(params[:issue])
    @issue.rep_id = current_user.id
    if @issue.save
      flash[:messages] = "Thank you for your submission!"
      redirect_to root_path
    else
      render :new
    end
  end

  def new
  	@issue = Issue.new
  end  

  def search
    @issues = Issue.search params[:search]
  end
end
