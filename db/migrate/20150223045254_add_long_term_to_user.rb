class AddLongTermToUser < ActiveRecord::Migration
  def change
    add_column :users, :long_term, :text
  end
end
