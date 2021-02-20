class Drip::UserExamItem < Drip::Base
  belongs_to :user_task_record
  belongs_to :user_exam_section
  belongs_to :question
  belongs_to :exam_item

  def options_array
    (type == 2 && options) ? options.split('||||') : []
  end
end
