import { Axios } from "./axios"
import { HOST_API, AGGRS, AGGRS_LINH_VUC, AGGRS_DANH_MUC, AGGRS_DON_VI, AGGRS_NHOM_DANH_MUC, AGGRS_USER, AGGRS_THONG_KE } from '../api'

function countLinhVuc(query) {
  query = query ? ('?' + query) : ''
  return Axios('get', `${HOST_API}${AGGRS}${AGGRS_LINH_VUC}${query}`)
}

function countDanhMuc(query) {
  query = query ? ('?' + query) : ''
  return Axios('get', `${HOST_API}${AGGRS}${AGGRS_DANH_MUC}${query}`)
}

function countNhomDanhMuc(query) {
  query = query ? ('?' + query) : ''
  return Axios('get', `${HOST_API}${AGGRS}${AGGRS_NHOM_DANH_MUC}${query}`)
}

function countDonVi(query) {
  query = query ? ('?' + query) : ''
  return Axios('get', `${HOST_API}${AGGRS}${AGGRS_DON_VI}${query}`)
}

function countUser(query) {
  query = query ? ('?' + query) : ''
  return Axios('get', `${HOST_API}${AGGRS}${AGGRS_USER}${query}`)
}

function counterStatistics(query) {
  query = query ? ('?' + query) : ''
  return Axios('get', `${HOST_API}${AGGRS}${AGGRS_THONG_KE}${`/luot-truy-cap`}${query}`)
}

function categorySearchStatistics(query) {
  query = query ? ('?' + query) : ''
  return Axios('get', `${HOST_API}${AGGRS}${AGGRS_THONG_KE}${`/tim-kiem-danh-muc`}${query}`)
}

function publicCategorySearchStatistics(query) {
  query = query ? ('?' + query) : ''
  return Axios('get', `${HOST_API}${AGGRS}${AGGRS_THONG_KE}${`/khach-tim-kiem-danh-muc`}${query}`)
}
export {
  countLinhVuc,
  countDanhMuc, countNhomDanhMuc, countDonVi, countUser,
  counterStatistics, categorySearchStatistics, publicCategorySearchStatistics
}

