class Drip::Exam < Drip::Base
  has_many :exam_sections
  has_many :exam_items
  has_many :task_steps, as: :target, class_name: 'Drip::TaskStep'

  def hash_with_includes
    ModelSerializer.hash_record(self, ['exam_sections.exam_items'])
  end

  def hash_values
    {id: id, title: title, category: category, difficult: difficult, finish_time: finish_time, question_count: question_count, user_id: user_id}
  end
end
