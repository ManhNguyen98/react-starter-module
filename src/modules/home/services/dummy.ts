import axiosService from 'modules/shared/utils/axios'

function getDummies() {
  return axiosService.get('https://jsonplaceholder.typicode.com/posts')
}

export default {
  getDummies,
}
