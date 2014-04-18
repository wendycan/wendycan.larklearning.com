include ApiHelper
module Leaves
  class Collage < Grape::API
    resource :collages do
      desc 'Get all collages'
      get do
        # leaves = Leaf.all
        {}
      end

      route_param :id, requirements: /[^\/]+/ do
        desc 'Get a collage'
        get do
          if authenticate_user_from_token!
            collage = Collage.find(params[:id])
          else
            {errors: 'Invalid user info', status: 403}
          end
        end
      end
    end
  end
end
