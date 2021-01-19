const validate_rules = {
  required: value => !!value || '必录项，请录入',
  passwordConfirm: (value, password) => (value == password) || '必须与密码一致',
  max50Characters: value => (value && value.length <= 50) || '字符数超长'
}

export default validate_rules