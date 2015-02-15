class ToolsController < ApplicationController
  before_filter :authenticate_user!, :only => [:todos]
  def ecg
  end

  def todos
    @user = current_user
  end
end
