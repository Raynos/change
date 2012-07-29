class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_presence_of :name, :location

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :bio, :twitter_handle, :location, :rep_status, :name
  # attr_accessible :title, :body
  has_many :issues
  has_many :sponsorships
  # has_many :issues, :through => :sponsorships
end
