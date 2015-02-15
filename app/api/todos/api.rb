Dir["#{Rails.root}/app/api/*.rb"].each { |file| require file }

module Todos
  class Api < Grape::API
    #api
    version 'v1', using: :path
    format :json
    default_format :json
    desc 'Return version info'
    get do
      {version: '1'}
    end

    # helpers APIHelpers
    helpers do
      def current_user
        @current_user ||= locate_user
      end

      def authenticate!
        error!('401 Unauthorized', 401) unless current_user
      end

      def locate_user
        token = params['auth_token']
        User.find_by(authentication_token: token) if token.present?
      end
    end
    mount Todos
  end
end
