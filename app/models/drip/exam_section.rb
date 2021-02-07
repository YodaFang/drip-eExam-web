class Drip::ExamSection < Drip::Base
  belongs_to :exam
  has_many :exam_items
end
