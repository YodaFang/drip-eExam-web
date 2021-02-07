class Drip::Question < Drip::Base
  has_many :exam_items

  def hash_values
    {id: id, category: category, type: type, difficult: difficult, points: points, description: description, options: options, answers: answers, comments: comments}
  end
end
