class RemoveColumnsFromUsers < ActiveRecord::Migration
  def up
  	remove_column :users, :role, :string
  	remove_column :users, :twitter_handle, :string
  end

  def down
  end
end
