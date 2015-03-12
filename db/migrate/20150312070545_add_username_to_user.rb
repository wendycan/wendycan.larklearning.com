class AddUsernameToUser < ActiveRecord::Migration
  def change
    add_column :users, :username, :string, default: "cherish"
  end
end
