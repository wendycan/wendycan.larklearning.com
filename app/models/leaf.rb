class Leaf < ActiveRecord::Base
  searchable do
    text :name,:stored => true
  end
end
