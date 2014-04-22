class LeavesController < ApplicationController
  def index
  end

  def show
  end

  def search
    query = '枫叶'
    @leaves = Leaf.search do
       fulltext query do
        phrase_fields :name => 2.0
        query_phrase_slop 1
      end
    end
  end
end
