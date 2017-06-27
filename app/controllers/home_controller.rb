class HomeController < ApplicationController

  before_action :authenticate_user!, only: [:tutorial, :profile , :event]
  require 'koala'

  def index

  end

  def tutorial

  end

  def profile
    access_token = current_user[:fb_token]
    @graph       = Koala::Facebook::API.new(access_token)
    image_profile = @graph.get_object("me?fields=cover,picture.width(800).height(800)")
    puts image_profile
    @cover_img    = image_profile['cover']['source']
    @full_profile = image_profile['picture']['data']['url']
  end

  def event

  end

end
