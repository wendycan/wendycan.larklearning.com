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
      user = authenticate_user_from_token!
      if user
        {success: true}
      else
        {:errors=>"Invalid email or password", :status=>401}
      end
    end
  end
end
