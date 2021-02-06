class Drip::ExamItem < Drip::Base
  belongs_to :exam
  belongs_to :exam_section
  belongs_to :question

  def hash_attributes
    [:id, :exam_id, :exam_section_id, :difficult, :points, :description, :options, :answers, :comments]
  end
end
