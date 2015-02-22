module Todos
  class Todos < Grape::API

    resource :todos do
      desc 'Get all todos'
      get do
        authenticate!
        if !@current_user.nil?
          todos = @current_user.todos
          paging = params[:paging]
          if paging
            {total_count: todos.count , todos: todos = todos.paginate(:page => params[:page])}
          else
            todos = Todo.all
          end
        else
          {errors: 'user not found'}
        end
      end

      route_param :id, requirements: /[^\/]+/ do
        desc  'Get a todo'
        get do
          authenticate!
          todo = Todo.find(params[:id])
          {todo: todo}
        end

        desc 'Delete a todo'
        delete do
          authenticate!
          todo = Todo.find(params[:id])
          todo.destroy!
          status 204
        end

        desc 'Update a domain'
        put do
          authenticate!
          todo = Todo.find(params[:id])
          todo.title = params[:title]
          todo.group = params[:group]
          todo.start_at = params[:start_at]
          todo.end_at = params[:end_at]
          todo.completed = params[:completed]
          if todo.save
            todo
          else
            {errors: 'todo update failed'}
          end
        end
      end

      post do
        authenticate!
        # if user
          # create todo
        todo = Todo.new(params[:todo])
        todo.title = params[:title]
        todo.group = params[:group]
        todo.start_at = params[:start_at]
        todo.end_at = params[:end_at]
        todo.completed = params[:completed]
        todo.user = @current_user
        if todo.save
          todo
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
