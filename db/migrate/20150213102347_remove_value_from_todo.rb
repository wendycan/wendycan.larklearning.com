class RemoveValueFromTodo < ActiveRecord::Migration
  def change
    rename_column :todos, :value, :title
    rename_column :todos, :field, :group
  end
end
