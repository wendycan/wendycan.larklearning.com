module Leaves
  class Auth < Grape::API
    post 'sign_up' do
      user = User.new(params[:user])
      if user.save
        {auth_token: Base64::encode64(user.email + ':' + user.password)}
      else
        {:errors=>user.errors, :status=>422}
      end
    end

    post 'sign_in' do
      user = User.find_by_email(params[:user][:email])
      if (!user.nil? && user.valid_password?(params[:user][:password]))
        {success: true}
      else
        {:errors=>"Invalid email or password", :status=>401}
      end
    end
  end
end
