class Issue < ActiveRecord::Base
  attr_accessible :description, :plan, :user_id, :title
  # validate_presence_of :user

  belongs_to :user
  has_many :sponsorships
  has_many :users, :through => :sponsorships
  

  def self.search(search)
    search_condition = "%" + search + "%"
    find(:all, :conditions => ['title LIKE ? OR description LIKE?', search_condition, search_condition])
  end
  
  
end
