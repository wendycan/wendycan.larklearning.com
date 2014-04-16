module LeavesCom

  class API < Grape::API
    #api
    version 'v1'
    format :json
    default_format :json
    desc 'Return version info'
    get do
      { version: '1' }
    end
  end
end