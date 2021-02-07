require 'test_helper'

class Drip::ExamsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get drip_exams_show_url
    assert_response :success
  end

end
