# frozen_string_literal: true

Rails.application.routes.draw do
  mount RailsAdmin::Engine => "/admin", as: "rails_admin"
  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
      post "auth/:provider/callback", to: "users#create"
    end
  end
end
