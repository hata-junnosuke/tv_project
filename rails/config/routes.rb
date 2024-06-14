# frozen_string_literal: true

Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  mount RailsAdmin::Engine => "/admin", as: "rails_admin"
  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
      mount_devise_token_auth_for "User", at: "auth", controllers: { 
        omniauth_callbacks: 'users/omniauth_callbacks',
      }
    end
  end
end
