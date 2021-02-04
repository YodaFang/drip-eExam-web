class Drip::TaskStep < Drip::Base
  belongs_to :task
  belongs_to :target, polymorphic: true
end
