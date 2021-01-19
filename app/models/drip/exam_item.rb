module Drip
  class ExamItem < Drip::Base
    belongs_to :exam
    belongs_to :exam_section
    belongs_to :question
  end
end
