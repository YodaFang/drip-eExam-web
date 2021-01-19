module Drip
  class Exam < Drip::Base
    has_many :exam_sections
    has_many :exam_items
    has_many :task_steps, as: :target, class_name: 'Drip::TaskStep'
  end
end
