import axios from "axios"
const { BACKEND_URL } = require("../config/env")

export default axios.create({
  baseURL: BACKEND_URL,
})
