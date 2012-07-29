class AddTwitterHandleAndRepBoleanAndLocationToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :twitter_handle, :string
  	add_column :users, :rep_status, :boolean, :default => false
  	add_column :users, :location, :string
  end
end
