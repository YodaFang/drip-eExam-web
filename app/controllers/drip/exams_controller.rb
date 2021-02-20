class Drip::ExamsController < Drip::BaseController
  before_action :authenticate_user

  def summary
    return render_failure_with_messages('参数缺失！') if params[:id].blank?
    @exam = Drip::Exam.active.find_by(id: params[:id])
    return render_failure_with_messages('请求的资源不存在！') if @exam.blank?
    exam_started = Drip::UserTaskRecord.unfinished.exists?(target: @exam, user: current_user)
    render_exam_summary_payload(exam_started)
  end

  def start_continue
    return render_failure_with_messages('参数缺失！') if params[:id].blank?
    @exam = Drip::Exam.active.find_by(id: params[:id])
    return render_failure_with_messages('请求的资源不存在！') if @exam.blank?
    @exam_task = Drip::UserTaskRecord.unfinished.find_by(target: @exam, user: current_user)
    @exam_task = Drip::UserTaskRecord.generate_exam(current_user, @exam) if @exam_task.blank?
    render_exam_task_detail_payload
  end

  def submit_answer
    return render_failure_with_messages('参数缺失！') if params[:item_id].blank? || params[:user_answer].blank?
    @exam_item = Drip::UserExamItem.find_by(id: params[:item_id])
    if @exam_item.update(user_answer: params[:user_answer])
      @exam_item.user_task_record.update(current: params[:item_id])
      render_success_payload
    else
      render_failure_with_messages('答案提交失败！')
    end
  end

  def finish
  end

  private

  def render_exam_summary_payload(exam_started)
    render_payload({
      success: true,
      started: exam_started,
      exam_summary: hash_exam_summary
    }) && return
  end

  def render_exam_task_detail_payload
    render_payload({
      success: true,
      exam_task: hash_exam_task
    }) && return
  end

  def hash_exam_summary
    ModelSerializer.hash_record(@exam, includes_ind: false)
  end

  def hash_exam_task
    ModelSerializer.hash_record(@exam_task, includes_ind: true)
  end
end
