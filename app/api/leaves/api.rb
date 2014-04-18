Dir["#{Rails.root}/app/api/*.rb"].each { |file| require file }

module Leaves
  class Api < Grape::API
    #api
    version 'v1', using: :path
    format :json
    default_format :json
    desc 'Return version info'
    get do
      {version: '1'}
    end

    mount Auth
    mount Leaves
    mount Collage
  end
end
