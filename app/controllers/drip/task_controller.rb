class Drip::TaskController < Drip::BaseController
  def show
    return render_failure_with_messages('参数缺失！') if params[:id].blank?
    @task = Drip::Task.active.find_by(id: params[:id])
    return render_failure_with_messages('任务不存在！') if @task.blank?
    render_success_payload_with_task
  end

  def submit_exam_answer
  end

  def finish_exam
  end

  private

  def render_success_payload_with_task
    render_payload({
      success: true,
      task: hash_task
    }) && return
  end

  def hash_task
    ModelSerializer.hash_record(@task, ['task_steps'])
  end
end
