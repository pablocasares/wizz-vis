require 'druid'

class Widget < ApplicationRecord
  include Intervalable
  include Api::WidgetApi

  # ==========================================================
  # Relations
  # ==========================================================
  belongs_to :dashboard, touch: true
  belongs_to :datasource
  has_and_belongs_to_many :dimensions
  has_and_belongs_to_many :aggregators
  has_many :filters, dependent: :destroy
  has_many :post_aggregators, dependent: :destroy

  accepts_nested_attributes_for :post_aggregators
  accepts_nested_attributes_for :filters

  # ==========================================================
  # Validations
  # ==========================================================
  validates :row, :col, :size_x, :size_y, presence: true

  def data(override_options = {})
    query = Datastore::Query.new(
      datasource: datasource.name,
      properties: attributes.merge(interval: interval).merge(override_options),
      dimensions: dimensions,
      aggregators: aggregators,
      post_aggregators: post_aggregators,
      filters: filters,
      options: options
    )

    query.run
  end
end
