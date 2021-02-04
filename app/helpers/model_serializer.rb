module ModelSerializer
  module_function

  def hash_record(resource, includes = [])
    hash_result = {}
    return hash_result unless resource.present?
    resource.hash_attributes.each do |attr_name|
      if attr_name.is_a?(Symbol)
        hash_result[attr_name] = resource.public_send(attr_name)
      elsif attr_name.is_a?(Hash)
        hash_result[attr_name.keys.first] = resource.public_send(attr_name.values.first)
      end
    end

    includes_hash = {}
    includes&.each do |include_item|
      idx = include_item.index('.')
      if idx.present?
        key = include_item[0, idx-1]
        includes_hash[key] = [] unless includes_hash.key?(key)
        includes_hash[key] << include_item[idx, 9999]
      else
        key = include_item
        includes_hash[key] = [] unless includes_hash.key?(key)
      end
    end

    includes_hash.each do |key, value|
      relation = resource.public_send(key)
      if relation.respond_to?(:each)
        hash_result[key] = (hash_collection(relation, value)).data
      else
        hash_result[key] = hash_record(relation, value)
      end
    end

    hash_result
  end

  def hash_collection(collection, includes = [])
    array_result = []
    collection&.each do |item|
      array_result << hash_record(item, includes)
    end
    { data: array_result }
  end
end
