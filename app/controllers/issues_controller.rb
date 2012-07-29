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
    
  end

  def new
  	@issue = Issue.new
  end

  def register_rep
    
  end
  
end
