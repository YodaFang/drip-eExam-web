class Drip::User < Drip::Base
  has_many :user_actions
  has_many :user_task_records
  has_many :user_exam_records

  validates :password, :name, :role, presence: true
  validates_uniqueness_of :login, allow_blank: false

  scope :active, -> { where(status: 0) }

  #TODO
  def self.find_by_remember_token(remember_token)
    find_by(id: EncryptionService.decode_token(remember_token), status: 0)
  end

  def self.check_login(login)
    !exists?(login: login, status: 0)
  end

  def self.create_for_registration(login, password, name)
    user = find_or_create_by(login: login)
    user.update(
      name: name,
      password: EncryptionService.encrypt_password(password),
      role: 0,
      status: 0
    )
    user
  end

  def update_password(new_password)
    update(password: EncryptionService.encrypt_password(new_password))
  end

  def valid_password?(_password)
    EncryptionService.encrypt_password(_password) == password
  end

  #TODO
  def remember_token
    EncryptionService.generate_token(id)
  end

  def active?
    status == 0
  end

  def admin?
    role == 1
  end

  def super_admin?
    id == 1 && role == 3
  end
end
