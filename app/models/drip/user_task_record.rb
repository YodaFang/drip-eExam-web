class Drip::UserTaskRecord < Drip::Base
  belongs_to :user
  has_many :user_exam_records
end
