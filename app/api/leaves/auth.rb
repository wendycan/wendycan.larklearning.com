module Leaves
  class Auth < Grape::API
    post 'sign_up' do
      user = User.new(params[:user])
      if user.save
        {:auth_token=>user.authentication_token}
      else
        {:errors=>user.errors, :status=>422, data: params.length}
      end
    end

    post 'sign_in' do
      user = User.find_by_email(params[:user][:email])
      if !user.nil? && (user.password == User.find_by_email(params[:user][:password]))
        {:auth_token=>user.authentication_token}
      else
        {:errors=>"Invalid email or password", :status=>401}
      end
    end
  end
end
