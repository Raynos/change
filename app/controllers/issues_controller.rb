class IssuesController < ApplicationController
  
  def index
    @issues = Kaminari::paginate_array(Issue.find(:all)).page(params[:page]).per(10)
  end
  
  def show
    @issue = Issue.find(params[:id])
  end
  
  def update
    
  end
  
  def delete
    @issue = Issue.find(params[:id])
    @issue.destroy
    redirect_to root_url
  end

  def new
  	@issue = Issue.new
  end  
end
