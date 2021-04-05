import Head from 'next/head'
import constants from "../lib/constants"
import axios from 'axios'
import { Button, useMediaQuery } from "@chakra-ui/react"
import Cookies from 'cookies'
import { useToast } from "@chakra-ui/react"


import { Grid, Heading, Stack } from "@chakra-ui/react"
import CardCurso from "../components/CardCurso"
import Header from "../components/Header"
import {useRouter} from 'next/router'

const { PROXY_URL } = constants
const PERFIL_URL = PROXY_URL + "usuarios/cursos"

export async function getServerSideProps({ req, res }) {

  const cookies = new Cookies(req, res)
  const storedRefreshToken = cookies.get('auth-token')

  const headers = {
    Authorization: `Bearer ${storedRefreshToken}`
  }

  try {
    const respPerfil = await axios({
      method: "get",
      url: PERFIL_URL,
      data: {},
      headers
    })

    return {
      props: respPerfil.data
    }
  }
  catch (e) {
    cookies.set("auth-token")
    return { 
      redirect: e.response.data 
    } 
  }

}

const Home = (props) => {

  const { accesosCursos } = props
  const [noEsGrande] = useMediaQuery("(max-width: 1280px)")
  const [esCelular] = useMediaQuery("(max-width: 530px)")


  const router = useRouter()
  const toast = useToast()
  toast.closeAll()

  let templateColumns = ""
  if(noEsGrande) {
    if(esCelular) templateColumns = "1fr" 
    else templateColumns = "2fr 1fr"
  }
  else templateColumns = "1fr 2fr 1fr"


  return (
    <>
      <Head>
        <title>Jab - Home</title>
      </Head>
      <div>
        <Header />
        <Grid 
          templateColumns={templateColumns}
          pt="2%"
          px="5%"
          bg="brand.white"
          h="100vh"
        > 
          <div 
            style={{
              display: noEsGrande ? 'none':''
            }}
          ></div>
          <Stack>
            <Heading size="lg" mb="10px">Bienvenido de vuelta, {props.nombres}!</Heading>
            <Heading size="md" mb="10px">Cursos compartidos contigo</Heading>
            {accesosCursos.map((accesoCurso,i) => (
              <CardCurso key={i} {...accesoCurso.curso} />
              )
            )}
            {!accesosCursos.length && (
              <>
              <p>Oops. Parece que aún no has sido invitado a ningún curso</p>
                <Button 
                maxW="240px"
                  onClick={() => router.push("/explorar")}
                >Explora cursos públicos</Button>
              </>
              
            )}
          </Stack>
          <div></div>
        </Grid>
      </div>
    </>
  )
}

export default Home
