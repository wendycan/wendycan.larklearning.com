class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.string :title, default: ""
      t.string :people, default: "family"
      t.string :way, default: "cash"
      t.string :group, default: ""
      t.string :bank, default: "icbi"
      t.float :money, default: 0

      t.timestamps
    end
  end
end
