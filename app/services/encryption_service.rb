require 'jwt'

module EncryptionService
  module_function

  def encrypt_password(password)
    Digest::SHA256.hexdigest(password.to_s)
  end

  def generate_token(origin)
    JWT.encode({ data: origin }, ENV['TOKEN_SECRET'], 'HS256')
  end

  def decode_token(token)
    rst = JWT.decode token, ENV['TOKEN_SECRET'], true, { algorithm: 'HS256' }
    rst&.first['data']
  end
end