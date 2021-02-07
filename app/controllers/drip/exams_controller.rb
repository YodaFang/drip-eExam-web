class Drip::ExamsController < Drip::BaseController
  def detail
    return render_failure_with_messages('参数缺失！') if params[:id].blank?
    @exam = Drip::Exam.active.find_by(id: params[:id])
    return render_failure_with_messages('请求的资源不存在！') if @exam.blank?
    render_exam_detail_payload
  end

  def submit_exam_answer
  end

  def finish_exam
  end

  private

  def render_exam_detail_payload
    render_payload({
      success: true,
      exam: hash_exam_detail
    }) && return
  end

  def hash_exam_detail
    ModelSerializer.hash_record(@exam, includes_ind: true)
  end
end
