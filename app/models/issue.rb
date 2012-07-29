class Issue < ActiveRecord::Base
  attr_accessible :description, :plan, :user_id
  belongs_to :user
  has_many :users, :through => :sponsorships
  has_many :sponsorships
  
  
end
