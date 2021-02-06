class Drip::ExamSection < Drip::Base
  belongs_to :exam
  has_many :exam_items

  def hash_attributes
    [:id, :exam_id, :title, :points, :question_count]
  end
end
