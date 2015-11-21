require 'net/ftp'

class ToolsController < ApplicationController
  def ecg
  end

  def audio
  end

  def upload
    data = params[:img]
    image_data = Base64.decode64(data['data:image/png;base64,'.length .. -1])
    file = File.new Rails.root.join('tmp', Time.now.strftime('%Y%m%d%H%M%S') + '.png'), 'wb+'
    file.write image_data
    file.flush
    file.rewind

    Net::FTP.open(Settings.ftp_server, Settings.ftp_username, Settings.ftp_pass) do |ftp|
      ftp.passive = true
      ftp.putbinaryfile(file, '/sharing_media/images/capture/' + File.basename(file))
      render json: {status: 'ok'}, status: :ok
    end
  end
end
