import request from '@/utils/request'
import axios from 'axios'

export function login(data) {
  data = {
    user: {
      email: data.username,
      password: data.password
    }
  }
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_API}/api/user/login`,
    data: data
  })
    .then((response) => {
      return Promise.resolve(
        {
          code: 20000,
          data: response.data
        }
      )
    })
    .catch((error) => {
      console.error(error)
      return Promise.reject(error)
    })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
