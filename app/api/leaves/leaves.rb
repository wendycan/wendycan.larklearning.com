module Leaves
  class Leaves < Grape::API
    #leaves
    get '/leaves' do
      { leaves: '1'}
    end
  end
end
