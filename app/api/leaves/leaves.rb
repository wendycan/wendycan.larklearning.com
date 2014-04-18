module Leaves
  class Leaves < Grape::API
    resource :leaves do
      get do
        Leaf.all
      end

      route_param :id, requirements: /[^\/]+/ do
        desc 'Get a leaf'
        get do
          Leaf.find(params[:id])
        end
      end
    end
  end
end
