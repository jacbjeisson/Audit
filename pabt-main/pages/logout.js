import Cookies from 'cookies'

export function getServerSideProps({ req, res }) {

  const cookies = new Cookies(req, res)
    cookies.set("auth-token")
    return { 
      redirect: {
        destination: "/",
        permanent: false
      }
    } 
}


const Logout = () => 'Cerrando sesión...'

export default Logout

