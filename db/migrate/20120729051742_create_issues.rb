class CreateIssues < ActiveRecord::Migration
  def change
    create_table :issues do |t|
      t.text :description
      t.text :plan
      t.integer :user_id

      t.timestamps
    end
  end
end
