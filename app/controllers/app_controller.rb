class AppController < ApplicationController
  def index
  end

  def exam
    params[:exam_id] = 1
  end
end
