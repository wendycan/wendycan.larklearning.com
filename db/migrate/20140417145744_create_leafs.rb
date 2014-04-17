class CreateLeafs < ActiveRecord::Migration
  def change
    create_table :leafs do |t|
      t.string :name
      t.text :desc
      t.string :img_url
      t.string :category

      t.timestamps
    end
  end
end
