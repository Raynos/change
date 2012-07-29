class DropTableSponsorships < ActiveRecord::Migration
  def up
  	drop_table :sponsorships
  end

  def down
  end
end
