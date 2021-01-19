module Drip
  class Question < Drip::Base
    has_many :exam_items
  end
end
