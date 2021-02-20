class Drip::UserExamSection < Drip::Base
  belongs_to :exam_section
  belongs_to :user_task_record
  has_many :user_exam_items

  def title
    exam_section.title
  end

  def points
    exam_section.points
  end
end
