class Drip::Task < Drip::Base
  has_many :task_steps
  has_many :user_task_records

  scope :active, -> { where(status: 0) }

  def hash_values
    {id: id, title: title, type: type, finish_time: finish_time}
  end
end
