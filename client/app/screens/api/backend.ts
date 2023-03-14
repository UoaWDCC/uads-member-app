import axios from "axios"
import { BASE_URL } from "@env"

export default axios.create({
  baseURL: BASE_URL,
})
