# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_04_100414) do

  create_table "drip_enumerations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "type_code"
    t.string "item_code"
    t.string "content"
    t.boolean "visible", default: true
    t.index ["item_code"], name: "index_enumerations_on_item_code"
    t.index ["type_code"], name: "index_enumerations_on_type_code"
    t.index ["visible"], name: "index_enumerations_on_visible"
  end

  create_table "drip_exam_items", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "exam_id"
    t.bigint "exam_section_id"
    t.bigint "question_id"
    t.integer "difficult"
    t.integer "points"
    t.integer "type"
    t.text "description"
    t.text "options"
    t.text "answers"
    t.text "comments"
    t.index ["exam_id"], name: "index_drip_exam_items_on_exam_id"
    t.index ["exam_section_id"], name: "index_drip_exam_items_on_exam_section_id"
    t.index ["question_id"], name: "index_drip_exam_items_on_question_id"
  end

  create_table "drip_exam_sections", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "exam_id"
    t.string "title"
    t.integer "points"
    t.integer "question_count"
    t.index ["exam_id"], name: "index_drip_exam_sections_on_exam_id"
  end

  create_table "drip_exams", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "category"
    t.integer "difficult"
    t.integer "finish_time"
    t.integer "points"
    t.integer "question_count"
    t.integer "status", default: 0
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category"], name: "index_exams_on_category"
    t.index ["status"], name: "index_exams_on_status"
    t.index ["title"], name: "index_exams_on_title"
    t.index ["user_id"], name: "index_drip_exams_on_user_id"
  end

  create_table "drip_questions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "category"
    t.string "type"
    t.integer "difficult"
    t.integer "points"
    t.text "description"
    t.text "options"
    t.text "answers"
    t.text "comments"
    t.integer "status", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category"], name: "index_questions_on_category"
    t.index ["status"], name: "index_questions_on_is_status"
    t.index ["type"], name: "index_questions_on_type"
  end

  create_table "drip_user_actions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "user_id"
    t.string "action"
    t.string "target_type"
    t.integer "target_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_drip_user_actions_on_user_id"
  end

  create_table "drip_user_exam_records", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "user_task_record_id"
    t.bigint "exam_item_id"
    t.text "user_answer"
    t.integer "correctness", default: 0
    t.integer "score"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["exam_item_id"], name: "index_drip_user_exam_records_on_exam_item_id"
    t.index ["user_id"], name: "index_drip_user_exam_records_on_user_id"
    t.index ["user_task_record_id"], name: "index_drip_user_exam_records_on_user_task_record_id"
  end

  create_table "drip_user_task_records", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "user_id"
    t.string "target_type"
    t.integer "target_id"
    t.integer "status", default: 0
    t.integer "percent", default: 0
    t.integer "score"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["status"], name: "index_user_task_records_on_status"
    t.index ["target_id", "target_type"], name: "index_user_task_records_on_target"
    t.index ["user_id"], name: "index_drip_user_task_records_on_user_id"
  end

  create_table "drip_users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "login"
    t.string "password"
    t.integer "role", default: 0
    t.string "birth_date"
    t.integer "sex", default: 0
    t.string "phone"
    t.string "email"
    t.string "source"
    t.integer "status", default: 0
    t.string "deleted_by"
    t.string "created_by"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email"
    t.index ["login"], name: "index_users_on_login"
    t.index ["phone"], name: "index_users_on_phone"
    t.index ["role"], name: "index_users_on_role"
    t.index ["status"], name: "index_users_on_status"
  end

end
