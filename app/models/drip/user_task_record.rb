class Drip::UserTaskRecord < Drip::Base
  belongs_to :user
  belongs_to :target, polymorphic: true
  has_many :user_exam_records

  scope :unfinished, -> { where(status: 0) }
  scope :finished, -> { where(status: 1) }
end
