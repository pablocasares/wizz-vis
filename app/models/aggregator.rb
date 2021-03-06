class Aggregator < ApplicationRecord
  # ==========================================================
  # Relations
  # ==========================================================
  belongs_to :datasource

  has_many :aggregator_widgets
  has_many :widgets, through: :aggregator_widgets
end
