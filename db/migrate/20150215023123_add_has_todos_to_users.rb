class AddHasTodosToUsers < ActiveRecord::Migration
  def change
    add_column :users, :has_todos, :boolean
  end
end
