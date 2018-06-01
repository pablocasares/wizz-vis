module Api::WidgetApi
  # When datasource is referenced by its name in the widget initialization,
  # it's neccessary to fetch the dashboard instance to make the relation.
  # Also, dimensions and aggregators are arrays of names, so it's neccessary
  # to fetch them to be referenced by the relation.
  def initialize(params)
    if params
      datasource_from_params(params)
      dimensions_from_params(params)
      aggregators_from_params(params)
      filters_from_params(params)

      super(params)
    else
      super
    end
  end

  def update_self_and_relations(attributes, dimension_names, aggregator_names, filters)
    relations = {}
    datasource =
      if attributes[:datasource_id]
        Datasource.find(attributes[:datasource_id])
      else
        self.datasource
      end

    if dimension_names
      relations[:dimension_ids] = datasource.dimensions.where(name: dimension_names).map(&:id)
    end

    if aggregator_names
      relations[:aggregator_ids] = datasource.aggregators.where(name: aggregator_names).map(&:id)
    end

    relations[:filters_attributes] = [] if filters

    (filters || []).each do |filter|
      dimension = Dimension.find_by(datasource: datasource, name: filter[:dimension_name])
      relations[:filters_attributes] << {
        dimension_id: dimension.id,
        operator: filter[:operator],
        value: filter[:value]
      }
    end

    update(attributes.merge(relations))
  end

  private

  def datasource_from_params(params)
    return unless params[:datasource_id]
    @datasource = Datasource.find(params[:datasource_id])
    params[:datasource_id] = @datasource.id
    params.delete(:datasource_name)
  end

  def dimensions_from_params(params)
    return unless params[:dimensions]
    params[:dimension_ids] = []
    params[:dimensions].each do |dimension_name|
      params[:dimension_ids] << @datasource.dimensions.find_by(name: dimension_name).id
    end
    params.delete(:dimensions)
  end

  def aggregators_from_params(params)
    return unless params[:aggregators]
    params[:aggregator_ids] = []
    params[:aggregators].each do |aggregator_name|
      params[:aggregator_ids] << @datasource.aggregators.find_by(name: aggregator_name).id
    end
    params.delete(:aggregators)
  end

  def filters_from_params(params)
    return unless params[:filters]
    params[:filters_attributes] = []
    params[:filters].each do |filter|
      dimension = Dimension.find_by(datasource: @datasource, name: filter[:dimension_name])
      params[:filters_attributes] << {
        dimension_id: dimension.id,
        operator: filter[:operator],
        value: filter[:value]
      }
    end
    params.delete(:filters)
  end
end
