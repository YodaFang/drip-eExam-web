module Drip
  class UsersController < Drip::BaseController
    def index
    end

    def show
      
    end

    def new; end

    def register_check
      if params[:login].present? && Drip::User.check_login(params[:login])
        render_payload({ success: true })
      else
        render_failure_payload
      end
    end

    def register
      if @user = Drip::User.create_for_registration(params[:login], params[:password], params[:name])
        render_success_payload_with_user_info
      else
        Rails.logger.error "UsersController: failed to create user: #{params.inspect}"
        render_failure_payload
      end
    rescue => e
      Rails.logger.error "UsersController: failed to create user, exception: #{params.inspect}"
      Rails.logger.error "UsersController: failed to create user, params: #{params.inspect}"
      render_failure_payload
    end

    def login
      if current_user&.valid_password?(params[:password])
        render_success_payload_with_user_info
      else
        render_failure_payload
      end
    end

    def update
      if current_user&.update(user_params)
        #TODO add login IP and login time update
        render_success_payload_with_user_info
      else
        render_failure_payload
      end
    end

    private

    def render_success_payload_with_user_info
      render_payload({ success: true, remember_token: current_user.remember_token, user_info: current_user.hash_info }) && (return)
    end

    def render_failure_payload
      render_payload({ success: false }) && (return)
    end

    def permitted_user_attributes
      [:name, :birth_date, :sex, :phone, :email]
    end

    def user_params
      params.permit(permitted_user_attributes)
    end
  end
end
