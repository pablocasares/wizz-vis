module Api
  module V1
    class BaseController < ApplicationController
      skip_before_action :verify_authenticity_token

      rescue_from ActiveRecord::RecordNotFound do
        render json: { message: '404 Not found' }, status: :not_found
      end
    end
  end
end
