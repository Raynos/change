class CreateSponsorships < ActiveRecord::Migration
  def change
    create_table :sponsorships do |t|
      t.integer :user_id
      t.integer :amount
      t.integer :issue_id

      t.timestamps
    end
  end
end
