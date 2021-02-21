class Drip::UserTaskRecord < Drip::Base
  belongs_to :user
  belongs_to :target, polymorphic: true
  has_many :user_exam_items

  scope :unfinished, -> { where(status: 0) }
  scope :finished, -> { where(status: 1) }

  def self.generate_exam(user, exam)
    return unless user && exam&.exam_items.length > 0
    transaction do
      exam_task = create!(user: user, target: exam)
      exam.exam_sections.each do |sec|
        exam_task_sec = Drip::UserExamSection.create!(
          user_task_record: exam_task, exam_section: sec, title: sec.title, points: sec.points
        )
        sec.exam_items.each do |item|
          Drip::UserExamItem.create!(
            user_task_record: exam_task, user_exam_section: exam_task_sec, exam_item: item, question: item.question,
            difficult: item.question.difficult, points: item.question.points, type: item.question.type,
            description: item.question.description, options: item.question.options, answers: item.question.answers,
            comments: item.question.comments
          )
        end
      end
      exam_task.reload
    end
  end

  def exam
    target if target.is_a?(Drip::Exam) 
  end

  def exam_sections
    target.is_a?(Drip::Exam) ? Drip::UserExamSection.where(user_task_record_id: id) : []
  end

  def finish!
    update!(status: 1) unless finished?
  end

  def finished?
    status == 1
  end
end
