class ApplicationController < ActionController::Base
  protect_from_forgery

  def index
    @issues = Kaminari::paginate_array(Issue.find(:all)).page(params[:page]).per(10)
  end
end
