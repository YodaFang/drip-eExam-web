module Drip
  class UserExamRecord < Drip::Base
    belongs_to :user
    belongs_to :exam_item
    belongs_to :user_task_record
  end
end
