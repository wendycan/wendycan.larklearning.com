module Leaves
  class Leaves < Grape::API
    resource :leaves do
      get do
        query = params[:query]
        if query.nil?
          Leaf.all
        else
          query = params[:query]
          leaves = Leaf.search do
             fulltext query do
              phrase_fields :name => 2.0
              query_phrase_slop 1
            end
          end
          results = leaves.results
        end
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
