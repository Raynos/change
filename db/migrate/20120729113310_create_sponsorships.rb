class CreateSponsorships < ActiveRecord::Migration
  def change
    create_table :sponsorships do |t|
      t.integer :amount
      t.integer :user_id
      t.integer :issue_id

      t.timestamps
    end
  end
end
