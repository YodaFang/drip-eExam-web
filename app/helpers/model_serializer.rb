module ModelSerializer
  module_function

  HASH_ATTRIBUTES = {
    'Drip::User' => [:id, :name, :birth_date, :sex, :phone, :email, :login, { admin: :admin? }],
    'Drip::Exam' => [:id, :title, :description, :category, :difficult, :finish_time, :question_count, :user_id],
    'Drip::ExamSection' => [:id, :title, :points],
    'Drip::ExamItem' => [:id, :points],
    'Drip::UserTaskRecord' => [:id, :user_id, :percent, :score],
    'Drip::UserExamSection' => [:id, :title, :points],
    'Drip::UserExamItem' => [:id, :difficult, :points, :type, :description, { options: :options_array }, :answers, :comments, :user_answer],
    'Drip::Question' => [:id, :category, :type, :difficult, :points, :description, :options, :answers, :comments],
  }

  HASH_INCLUDES = {
    'Drip::Exam' => [{ sections: :exam_sections }],
    'Drip::ExamSection' => [{ items: :exam_items }],
    'Drip::UserTaskRecord' => [:exam, { sections: :exam_sections }],
    'Drip::UserExamSection' => [{ items: :user_exam_items }],
  }

  def hash_record(resource, includes_ind: false, attr_hash: HASH_ATTRIBUTES, includes_hash: HASH_INCLUDES)
    return {} unless resource.present?

    hash_result = {}
    class_name = resource.class.name
    attr_hash.fetch(class_name, []).each do |attr_name|
      if attr_name.is_a?(Symbol)
        hash_result[attr_name] = resource.public_send(attr_name)
      elsif attr_name.is_a?(Hash)
        attr_name.each do |attr_key, attr_method|
          hash_result[attr_key] = resource.public_send(attr_method)
        end
      end
    end
    return hash_result unless includes_ind

    includes_hash.fetch(class_name, []).each do |include_item|
      if include_item.is_a?(Symbol)
        relation = resource.public_send(include_item)
        if relation.respond_to?(:each)
          hash_result[include_item] = (hash_collection(
            relation,
            includes_ind: includes_ind,
            attr_hash: attr_hash,
            includes_hash: includes_hash
          )).fetch(:data, [])
        else
          hash_result[include_item] = hash_record(
            relation,
            includes_ind: includes_ind,
            attr_hash: attr_hash,
            includes_hash: includes_hash
          )
        end
      elsif include_item.is_a?(Hash)
        include_item.each do |attr_key, attr_method|
          relation = resource.public_send(attr_method)
          if relation.respond_to?(:each)
            hash_result[attr_key] = (hash_collection(
              relation,
              includes_ind: includes_ind,
              attr_hash: attr_hash,
              includes_hash: includes_hash
            )).fetch(:data, [])
          else
            hash_result[attr_key] = hash_record(
              relation,
              includes_ind: includes_ind,
              attr_hash: attr_hash,
              includes_hash: includes_hash
            )
          end
        end
      end
    end

    hash_result
  end

  def hash_collection(collection, includes_ind: false, attr_hash: HASH_ATTRIBUTES, includes_hash: HASH_INCLUDES)
    array_result = []
    collection&.each do |item|
      array_result << hash_record(
        item,
        includes_ind: includes_ind,
        attr_hash: attr_hash,
        includes_hash: includes_hash
      )
    end
    { data: array_result }
  end
end
