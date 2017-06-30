class HomeController < ApplicationController

  before_action :authenticate_user!, only: [:tutorial, :profile , :event]
  require 'koala'
  require 'httparty'

  def index
  end

  def tutorial
  end

  def profile
    # access_token = current_user[:fb_token]
    access_token = "EAACEdEose0cBAIjC2J1f9EhyZAjXlpGVffkZAZBpIwYYlanvZAN265Hz4p52ZCy218y6Vil7s73xEqxuPQgaP7erJBzVOGJj5f1ZCZAZBrT84kk2XZC2fc1UU7JWpjKFE3mWmUZBZCxKVchSBkBemxz1xYK6ZBxHxw0tDERafB12l6ZALVn737CUUZBHD8V9VbO3PWbpIZD"
    @graph       = Koala::Facebook::API.new(access_token)
    image_profile = @graph.get_object("me?fields=cover,picture.width(800).height(800)")
    collection   = gallery_collection(access_token)
    @imgs        = []
    puts
    puts "== RESULT OF SCRAPPING =="
    puts "You have total #{collection[:album].count} albums"
    puts "You have all #{collection[:picture_count]} pictures in albums"
    collection[:album].each do |al|
      # puts al[:name]
      al[:picture].each do |pic|
        # puts pic
        @imgs << pic
      end
    end
    puts
    @cover_img    = image_profile['cover']['source']
    @full_profile = image_profile['picture']['data']['url']
  end

  def gallery_collection(access_token)
    # config var
    collector = @graph.get_object("me?fields=albums{name,photos{picture}}")
    collection_album = []
    page = 1
    picture_count = 0

    # collect first-page scrapping
    collector['albums']['data'].each do |album|
      pictures = []
      (album['photos']['data'] rescue []).each do |p|
        pictures << p['picture']
        picture_count += 1
      end
      collection_album << {
        name:    album['name'] ,
        picture: pictures
      }
    end

    # collect other-page
    next_page = collector['albums']['paging']['next']
    while next_page.present? do
       page += 1
       albums = HTTParty.get next_page
       albums['data'].each do |album|
         pictures     = []
         (album['photos']['data'] rescue []).each do |p|
           pictures      << p['picture']
           picture_count += 1
         end
         collection_album << {
           name:    album['name'] ,
           picture: pictures
         }
       end
       next_page = albums['paging']['next']
    end

    # return result
    result = {
      page:    page ,
      album:   collection_album ,
      picture_count: picture_count
    }
    return result
  end

  def event
  end

end
