module ModelSerializer
  module_function

  HASH_ATTRIBUTES = {
    'Drip::User' => [:id, :name, :birth_date, :sex, :phone, :email, :login, { admin: :admin? }],
    'Drip::Exam' => [:id, :title, :category, :difficult, :finish_time, :question_count, :user_id],
    'Drip::ExamSection' => [:id, :title, :points, :question_count],
    'Drip::ExamItem' => [:id, :difficult, :points, :description, { options: :options_array }, :answers, :comments],
    'Drip::Task' => [:id, :title, :type, :finish_time],
    'Drip::TaskStep' => [:id, :title, :action, { target: :hash_target_with_includes }],
    'Drip::Question' => [:id, :category, :type, :difficult, :points, :description, :options, :answers, :comments],
  }

  HASH_INCLUDES = {
    'Drip::Exam' => [:exam_sections],
    'Drip::ExamSection' => [:exam_items],
    'Drip::Task' => [:task_steps],
    'Drip::TaskStep' => [:target],
  }

  def hash_record(resource, includes_default = false)
    return {} unless resource.present?

    hash_result = {}
    class_name = resource.class.name
    HASH_ATTRIBUTES.fetch(class_name, []).each do |attr_name|
      if attr_name.is_a?(Symbol)
        hash_result[attr_name] = resource.public_send(attr_name)
      elsif attr_name.is_a?(Hash)
        attr_name.each do |attr_key, attr_method|
          hash_result[attr_key] = resource.public_send(attr_method)
        end
      end
    end
    return hash_result unless includes_default

    HASH_INCLUDES.fetch(class_name, []).each do |include_item|
      if include_item.is_a?(Symbol)
        relation = resource.public_send(include_item)
        if relation.respond_to?(:each)
          hash_result[include_item] = (hash_collection(relation, includes_default)).fetch(:data, [])
        else
          hash_result[include_item] = hash_record(relation, includes_default)
        end
      elsif include_item.is_a?(Hash)
        include_item.each do |attr_key, attr_method|
          relation = resource.public_send(attr_method)
          if relation.respond_to?(:each)
            hash_result[attr_key] = (hash_collection(relation, includes_default)).fetch(:data, [])
          else
            hash_result[attr_key] = hash_record(relation, includes_default)
          end
        end
      end
    end

    hash_result
  end

  def hash_collection(collection, includes_default = false)
    array_result = []
    collection&.each do |item|
      array_result << hash_record(item, includes_default)
    end
    { data: array_result }
  end
end
