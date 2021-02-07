class Drip::Base < ApplicationRecord
  self.abstract_class = true
  self.table_name_prefix = 'drip_'
  self.inheritance_column = ''

  # need to be overrided
  def hash_values
    {}
  end
end
