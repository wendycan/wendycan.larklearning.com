class ChangeStatusToCompleted < ActiveRecord::Migration
  def change
    rename_column :todos, :status, :completed
  end
end
