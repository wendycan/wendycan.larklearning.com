class Bill < ActiveRecord::Base
  validates :title, presence: true
  # validates :people, inclusion: { in: %w(yu xin daodao family)
  #   message: "%{value} is not a valid size" }
  # validates :way, inclusion: { in: %w(small medium large)
  #   message: "%{value} is not a valid size" }
  # validates :bank, inclusion: { in: %w(icbc boc ccb bocc)
  #   message: "%{value} is not a valid size" }
  # validates :group, inclusion: { in: %w(small medium large)
  #   message: "%{value} is not a valid size" }

  self.per_page = 10
end
