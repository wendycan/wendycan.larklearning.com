module ApiHelper
  def authenticate_user_from_token!
    token = request.headers['Authorization']
    de_token = Base64::decode64(token).split(':')
    email = de_token[0]
    password = de_token[1]
    user = User.find_by_email(email)

    if user && user.valid_password?(password)
      user
    else
      false
    end
  end
end
