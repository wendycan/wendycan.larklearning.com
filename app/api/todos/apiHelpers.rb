module API
  module APIHelpers
    def current_user
      @current_user ||= locate_user
    end

    def authenticate!
      unauthorized! unless current_user
    end

    def unauthorized!
      render_api_error!('401 Unauthorized', 401)
    end

  end
end
