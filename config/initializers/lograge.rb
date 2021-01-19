# Enable lograge in an initializer or the relevant environment config:
# config/initializers/lograge.rb
# OR
# config/environments/production.rb
Rails.application.configure do
  config.lograge.enabled = true
end