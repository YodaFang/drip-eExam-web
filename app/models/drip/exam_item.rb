class Drip::ExamItem < Drip::Base
  belongs_to :exam
  belongs_to :exam_section
  belongs_to :question

  def options_array
    options&.split('||||')
  end

  def hash_values
    {id: id, difficult: difficult, points: points, description: description, options: options_array, answers: answers, comments: comments}
  end
end
