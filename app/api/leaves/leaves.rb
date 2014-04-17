module Leaves
  class Leaves < Grape::API
    #leaves
    get '/leaves' do
      leaves = Leaf.all
    end
  end
end
