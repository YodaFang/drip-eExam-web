class Drip::Exam < Drip::Base
  has_many :exam_sections
  has_many :exam_items
  has_many :task_steps, as: :target, class_name: 'Drip::TaskStep'

  scope :active, -> { where(status: 0) }
end
