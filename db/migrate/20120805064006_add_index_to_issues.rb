class AddIndexToIssues < ActiveRecord::Migration
  def change
  	add_index :issues, :rep_id
  end
end
