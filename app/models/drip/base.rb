class Drip::Base < ApplicationRecord
  self.abstract_class = true
  self.table_name_prefix = 'drip_'
end
