Rails.application.routes.draw do
  get 'app/index'
  get 'admin/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'app#index'

  namespace :drip do
    get 'exams/show'
  end

  get '/register_check', to: 'drip/users#register_check'
  post '/register', to: 'drip/users#register'
  post '/loginByToken', to: 'drip/users#login_by_token'
  post '/loginByAcount', to: 'drip/users#login_by_acount'
  resources :users

  get 'app/exam'
  get 'exam', to: 'app#exam'
  get 'exam/summary', to: 'drip/exams#summary'
  get 'exam/startOrContinue', to: 'drip/exams#start_continue'
  post 'exam/submitAnswer', to: 'drip/exams#submit_answer'
  post 'exam/finish', to: 'drip/exams#finish'
end
