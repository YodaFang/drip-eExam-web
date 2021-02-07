class Drip::ExamSection < Drip::Base
  belongs_to :exam
  has_many :exam_items

  def hash_values
    { id: id, exam_id: exam_id, title: title, points: points, question_count: question_count}
  end
end
