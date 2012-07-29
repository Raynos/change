class IssuesController < ApplicationController
  
  def index
    @issues = Kaminari::paginate_array(Issue.find(:all)).page(params[:page]).per(10)
  end
  
  def show
    @issue = Issue.find(params[:id])
  end
  
  def delete
    @issue = Issue.find(params[:id])
    @issue.destroy
    redirect_to root_url
  end

  def create
    @issue = current_user.issues.new(params[:issue])
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
