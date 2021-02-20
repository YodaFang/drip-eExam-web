class Drip::Exam < Drip::Base
  has_many :exam_sections
  has_many :exam_items

  scope :active, -> { where(status: 0) }
end
