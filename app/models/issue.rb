class Issue < ActiveRecord::Base
  attr_accessible :description, :plan, :user_id, :title
  # validate_presence_of :user

  belongs_to :user
  has_many :users, :through => :sponsorships
  has_many :sponsorships
  
  
end
