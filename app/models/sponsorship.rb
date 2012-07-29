class Sponsorship < ActiveRecord::Base
  attr_accessible :amount, :issue_id, :user_id
  belongs_to :user
  belongs_to :issue
end