class HomeController < ApplicationController

  before_action :authenticate_user!, only: [:tutorial, :profile , :event]

  def index

  end

  def tutorial

  end

  def profile

  end

  def event

  end

end
