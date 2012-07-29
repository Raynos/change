class Sponsorships < ActiveRecord::Base
  attr_accessible :amount, :issue_id, :user_id
  
  belong_to :user
  belong_to :issue
  
end
