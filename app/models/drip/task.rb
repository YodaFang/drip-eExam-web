class Drip::Task < Drip::Base
  has_many :task_steps
  has_many :user_task_records
end
