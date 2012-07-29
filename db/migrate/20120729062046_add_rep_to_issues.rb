class AddRepToIssues < ActiveRecord::Migration
  def change
  	add_column :issues, :rep_id, :integer
  end
end
