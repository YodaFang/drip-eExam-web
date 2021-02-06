class Drip::Exam < Drip::Base
  has_many :exam_sections
  has_many :exam_items
  has_many :task_steps, as: :target, class_name: 'Drip::TaskStep'

  def hash_attributes
    [:id, :title, :category, :difficult, :finish_time, :question_count, :user_id]
  end
end
