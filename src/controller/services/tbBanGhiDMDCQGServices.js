
import { Axios } from "./axios"
import { HOST_API, DATA, TB_BAN_GHI_DMDCQG } from '../api'
import { __DEV__ } from "../../common/ulti/constants";

function getAll(query) {
  query = query ? ('?' + query) : ''
  return Axios('get',`${HOST_API}${DATA}${TB_BAN_GHI_DMDCQG}${query}`)
}

function create(data) {
  return Axios('post',`${HOST_API}${DATA}${TB_BAN_GHI_DMDCQG}`, data)
}

function getById(id) {
  return Axios('get',`${HOST_API}${DATA}${TB_BAN_GHI_DMDCQG}${'/'}${id}`)
}

function updateById(id, data) {
  return Axios('patch',`${HOST_API}${DATA}${TB_BAN_GHI_DMDCQG}${'/'}${id}`, data)
}

function lockById(id) {
  return Axios('lock',`${HOST_API}${DATA}${TB_BAN_GHI_DMDCQG}${'/'}${id}`)
}

function deleteById(id) {
  return Axios('delete',`${HOST_API}${DATA}${TB_BAN_GHI_DMDCQG}${'/'}${id}`)
}

export { getAll, create, getById, updateById, lockById, deleteById }