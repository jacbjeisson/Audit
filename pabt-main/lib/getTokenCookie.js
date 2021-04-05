import Cookies from "cookies"

const getTokenCookie = ({req, res}) => {
  const cookies = new Cookies(req, res)
  const storedRefreshToken = cookies.get('auth-token')

  const headers = {
    Authorization: `Bearer ${storedRefreshToken}`,
  }

  return headers
}

export default getTokenCookie
