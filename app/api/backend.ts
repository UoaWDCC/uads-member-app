import axios, { AxiosRequestConfig } from "axios"
import firebase from "firebase"
const { BACKEND_URL } = require("../config/env")

const requestConfig: AxiosRequestConfig = {
  baseURL: BACKEND_URL,
  headers: {
    "auth-token": async () => await firebase.auth().currentUser.getIdToken(true),
  },
}

export default axios.create(requestConfig)
