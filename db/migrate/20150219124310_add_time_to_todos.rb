class AddTimeToTodos < ActiveRecord::Migration
  def change
    add_column :todos, :start_at, :datetime
    add_column :todos, :end_at, :datetime
  end
end
