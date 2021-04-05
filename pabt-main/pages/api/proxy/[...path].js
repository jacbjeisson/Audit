import axios from "axios"
import url from 'url'
import Cookies from 'cookies'
const https = require('https');

const agent = new https.Agent({  
  rejectUnauthorized: false
});

const URL = process.env.API_URL

const proxy = async (req, res) => {
  const method = req.method
  const proxyPath = url.parse(req.url).pathname
  const path = proxyPath.replace(/^\/api\/proxy/, '')
  const requestData = req.body

  const esLogin = path === "/usuarios/login"
  const esRegister = path === "/usuarios" && method === "POST"
  const cookies = new Cookies(req, res)

  if(!esLogin && !esRegister) {
    try {
      const respRefresh = await axios({
        method:"post",
        url: URL + "/usuarios/refresh-token",
        data: requestData,
        headers: req.headers,
        httpsAgent: agent
      })

      const { token, refreshToken } = respRefresh.data
      requestData.token = token
      cookies.set("auth-token",refreshToken)
    } 
    catch (e) {
      console.log("error al refrescar token",e.message)
      const datosRedirect = {
        destination: "/login",
        permantent: false
      }
      res.status(401).json(datosRedirect)
      res.end()
      return
    }
  }

  const urlfinal = URL + path

  await axios({
    method,
    url:urlfinal,
    data: requestData,
    headers: req.headers,
    httpsAgent: agent
  })
    .then(resp => {
      const data = resp.data
      if(esLogin || esRegister) {
        cookies.set("auth-token",data.refreshToken)
        res.status(resp.status).json({ ok: true })
      }
      else
        res.status(resp.status).json(data)
    })
    .catch(error => {
      const response = error.response
      const data = response?.data
      const statusCode = response?.status || 500
      res.status(statusCode).json(data)
    })
}

export default proxy
