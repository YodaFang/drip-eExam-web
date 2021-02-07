class Drip::TaskStep < Drip::Base
  belongs_to :task
  belongs_to :target, polymorphic: true

  def hash_target_with_includes
    target.hash_with_includes
  end
end
