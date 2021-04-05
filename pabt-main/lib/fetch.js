import axios from "axios"

const PROXY_URL = "http://localhost:7000/api/proxy/"
const rutaRefresh = PROXY_URL + "usuarios/refresh-token"

const fetch = async (method, path, requestData ) => {

  return axios({
    method,
    url: PROXY_URL + path,
    data: requestData,
    headers
  })

}

export default fetch
