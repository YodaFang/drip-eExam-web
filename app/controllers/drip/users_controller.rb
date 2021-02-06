class Drip::UsersController < Drip::BaseController
  def register_check
    return render_failure_with_messages('账号不能为空！') if params[:login].blank?
    if Drip::User.check_login(params[:login])
      render_success_payload
    else
      render_failure_with_messages('此账号已被使用，请更换账号！')
    end
  end

  def register
    return render_failure_with_messages('账号或者密码缺失！') if params[:password].blank? || params[:login].blank?
    return render_failure_with_messages('此账号已被使用，请更换账号！') unless Drip::User.check_login(params[:login])
    return render_failure_with_messages('密码和确认密码不一致！') if params[:password] != params[:passwordConfirm]
    if @user = Drip::User.create_for_registration(params[:login], params[:password], params[:name])
      render_success_payload_with_user_info
    else
      Rails.logger.error "UsersController: failed to create user: #{params.inspect}"
      render_failure_with_messages('账号创建失败，请稍后再尝试！')
    end
  rescue => e
    Rails.logger.error "UsersController: failed to create user, exception: #{params.inspect}"
    Rails.logger.error "UsersController: failed to create user, params: #{params.inspect}"
    render_failure_with_messages('账号创建失败，请稍后再尝试！')
  end

  def login_by_acount
    @user = load_user_by_login
    if @user&.valid_password?(params[:password])
      render_success_payload_with_user_info
    else
      render_failure_with_messages('账号或者密码错误！')
    end
  end

  def login_by_token
    @user = load_user_by_token
    if @user.present?
      render_success_payload_with_user_info
    else
      render_failure_with_messages('token信息错误！')
    end
  end

  def update
    if current_user&.update(user_params)
      #TODO add login IP and login time update
      render_success_payload_with_user_info
    else
      render_failure_with_messages('信息更新失败！')
    end
  end

  private

  def render_success_payload_with_user_info
    render_payload({
      success: true,
      remember_token: current_user.remember_token,
      user_info: ModelSerializer.hash_record(current_user)
    }) && return
  end

  def permitted_user_attributes
    [:name, :birth_date, :sex, :phone, :email]
  end

  def user_params
    params.permit(permitted_user_attributes)
  end
end
