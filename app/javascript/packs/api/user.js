import { post } from '@/utils/request'

export default {
  signIn: params => post('/login', params),
  signUp: params => post('/register', params),
}
