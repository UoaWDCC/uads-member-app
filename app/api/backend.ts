import axios, { AxiosRequestConfig } from "axios"
import firebase from "firebase"
import { BASE_URL } from "@env"

const requestConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "auth-token": async () => await firebase.auth().currentUser.getIdToken(true),
  },
}

export default axios.create(requestConfig)
 