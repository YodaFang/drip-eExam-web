class DripOneTwo < ActiveRecord::Migration[6.0]
  def change
    create_table :drip_enumerations do |t|
      t.string :type_code
      t.string :item_code
      t.string :content
      t.boolean :visible,   default: true
    end
    add_index :drip_enumerations, [:type_code],          name: 'index_enumerations_on_type_code'
    add_index :drip_enumerations, [:visible],       name: 'index_enumerations_on_visible'
    add_index :drip_enumerations, [:item_code],          name: 'index_enumerations_on_item_code'

    create_table :drip_questions do |t|
      t.string :category
      t.string :type
      t.integer :dificult
      t.integer :points
      t.boolean :is_root,   default: true
      t.integer :parent_id
      t.text :description
      t.text :ref_fields
      t.text :answers
      t.text :comments
      t.integer :status,   default: 0
      t.references :user

      t.timestamps
    end
    add_index :drip_questions, [:category],          name: 'index_questions_on_category'
    add_index :drip_questions, [:type],          name: 'index_questions_on_type'
    add_index :drip_questions, [:is_root],          name: 'index_questions_on_is_root'
    add_index :drip_questions, [:status],          name: 'index_questions_on_is_status'

    create_table :drip_exams do |t|
      t.string :title
      t.string :category
      t.integer :dificult
      t.integer :finish_time
      t.integer :points
      t.integer :question_count
      t.integer :status,   default: 0
      t.references :user

      t.timestamps
    end
    add_index :drip_exams, [:title],          name: 'index_exams_on_title'
    add_index :drip_exams, [:category],          name: 'index_exams_on_category'
    add_index :drip_exams, [:status],          name: 'index_exams_on_status'

    create_table :drip_exam_sections do |t|
      t.references :exam
      t.string :title
      t.integer :points
      t.integer :question_count
    end

    create_table :drip_exam_items do |t|
      t.references :exam
      t.references :exam_section
      t.references :question
      t.integer :dificult
      t.integer :points
      t.text :description
      t.text :ref_fields
      t.text :answers
      t.text :comments
    end

    create_table :drip_user_exam_records do |t|
      t.references :user
      t.references :user_task_record
      t.references :exam_item
      t.text :answer
      t.integer :correctness,   default: 0
      t.integer :score

      t.timestamps
    end

    create_table :drip_tasks do |t|
      t.string :title
      t.string :type
      t.datetime :finish_time
      t.integer :status,   default: 0
      t.references :user

      t.timestamps
    end
    add_index :drip_tasks, [:title],          name: 'index_tasks_on_title'
    add_index :drip_tasks, [:type],          name: 'index_tasks_on_type'
    add_index :drip_tasks, [:status],          name: 'index_tasks_on_status'

    create_table :drip_task_steps do |t|
      t.references :task
      t.string :title
      t.string :action
      t.string :target_type
      t.integer :target_id
    end

    create_table :drip_user_task_records do |t|
      t.references :user
      t.references :task
      t.integer :status,   default: 0
      t.integer :percent,   default: 0
      t.integer :score

      t.timestamps
    end
    add_index :drip_user_task_records, [:status],          name: 'index_user_task_records_on_status'

    create_table :drip_users do |t|
      t.string :name
      t.string :login
      t.string :password
      t.integer :role,   default: 0
      t.string :birth_date
      t.integer :sex,   default: 0
      t.string :phone
      t.string :email
      t.string :source
      t.integer :status,   default: 0
      t.string :deleted_by
      t.string :created_by

      t.timestamps
    end
    add_index :drip_users, [:email],          name: 'index_users_on_email'
    add_index :drip_users, [:phone],          name: 'index_users_on_phone'
    add_index :drip_users, [:login],          name: 'index_users_on_login'
    add_index :drip_users, [:role],          name: 'index_users_on_role'
    add_index :drip_users, [:status],          name: 'index_users_on_status'

    create_table :drip_user_actions do |t|
      t.references :user
      t.string :action
      t.string :target_type
      t.integer :target_id

      t.timestamps
    end
  end
end
