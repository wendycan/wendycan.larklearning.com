module Todos
  class Todos < Grape::API
    resource :todos do
      desc 'Get all todos'
      get do
        user = User.find_by_email(params[:email])
        if !user.nil?
          todos = user.todos
        else
          todos = Todo.all
        end
        {todos: todos}
      end

      route_param :id, requirements: /[^\/]+/ do
        get do
          todo = Todo.find(params[:id])
          {todo: todo}
        end
      end

      post do
        # user = authenticate_user_from_token!
        # if user
          # create todo
        todo = Todo.new(params[:todo])
        todo.field = params[:field]
        todo.value = params[:value]
        todo.user = User.last
        if todo.save
          {status: 201}
        else
          {errors: 'todo create failed'}
        end
        # else
        #   {errors: 'Access denied', status: 403}
        # end
      end
    end
  end
end
