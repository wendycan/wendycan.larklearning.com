include ApiHelper
module Leaves
  class Products < Grape::API
    resource :products do
      desc 'Get all products'
      get do
        user = User.find_by_email(params[:email])
        if !user.nil?
          products = user.products
        else
          products = Product.all
        end
        {products: products}
      end

      route_param :id, requirements: /[^\/]+/ do
        get do
          product = Product.find(params[:id])
          {product: product}
        end
      end

      post do
        user = authenticate_user_from_token!
        if user
          # create product
          product = Product.new(params[:product])
          product.user_id = user.id
          if product.save
            {status: 201}
          else
            {errors: 'product create failed'}
          end
        else
          {errors: 'Access denied', status: 403}
        end
      end
    end
  end
end
