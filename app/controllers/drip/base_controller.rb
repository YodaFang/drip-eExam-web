module Drip
  class BaseController < ActionController::API

    private

    def ip_address
      request.remote_ip
    end

    def render_payload(paylaod, status_code = 200)
      render status: status_code, json: paylaod
    end

    def render_success_payload(paylaod = {}, status_code = 200)
      render status: status_code, json: { success: true }.merge(paylaod)
    end

    # 需要在页面中显示错误信息情况调用此方法
    def render_failure_with_messages(messages, status_code = 488)
      render status: status_code, json: { success: false, errors: messages }
    end

    def current_user
      @user ||= load_user_by_token || load_user_by_login
    end

    def load_user_by_token
      Drip::User.find_by_remember_token(params[:token_94]) if params[:token_94].present?
    end

    def load_user_by_login
      Drip::User.active.find_by(login: params[:login])  if params[:login].present?
    end

    def unauthorized!(json_data)
      render(json: json_data || { success: false, error: 'You are not authorized to perform that action.' }, status: 401) && (return)
    end

    def invalid_resource!(resource, json_data)
      log_message = "#{resource.class.name} #{resource.id || '(new)'} is invalid: "\
                    "#{resource.errors.full_messages.inspect}"
      Rails.logger.error log_message
      render(json: json_data || { success: false, error: log_message }, status: 422) && (return)
    end
  end
end
