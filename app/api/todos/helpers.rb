module API
  module APIHelpers
    def current_user
      @current_user # ||= locate_user
    end

    def authenticate!
      unauthorized! unless current_user
    end

    def unauthorized!
      render_api_error!('401 Unauthorized', 401)
    end

    def render_api_error!(message, status)
      error!({ message: message }, status)
    end

    # def locate_user
    #   User.find_by(authentication_token: token) if token.present?
    # end
  end
end
