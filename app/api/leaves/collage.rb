module Leaves
  class Collage < Grape::API
    resource :collage do
      desc 'Get all collages'
      get '/collage' do
        # leaves = Leaf.all
      end

      route_param :id, requirements: /[^\/]+/ do
        desc 'Get a collage'
        get do
          # Leaf.find(params[:id])
        end
      end
    end
  end
end
