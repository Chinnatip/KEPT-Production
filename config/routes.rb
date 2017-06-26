Rails.application.routes.draw do
  resources :postcards
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'
  get 'home/index'
  get 'home/tutorial'

  get 'profile' => 'home#profile'
  get 'event' => 'home#event'
end
