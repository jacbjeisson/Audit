import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import Cookies from 'cookies'

import {useRouter} from 'next/router'

import constants from '../lib/constants'
const { PROXY_URL } = constants

export async function getServerSideProps({ req, res }) {

  const cookies = new Cookies(req, res)
  const storedRefreshToken = cookies.get('auth-token')

  const headers = {
    Authorization: `Bearer ${storedRefreshToken}`
  }

  try {
    const respPerfil = await axios({
      method:"get",
      url:PROXY_URL + "usuarios/yo",
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

const Perfil = ({
  nombres,
  apellidos,
  correo,
}) => {

  const router = useRouter()

  const handleCerrarSesion = () => {
    router.push("/logout")
  }

  return (
    <Box 
      px="20%"
      pt="10%"
      h="100vh"
    >
      <Heading size="lg">{nombres + ' ' + apellidos}</Heading>
      <Text pt="10px">{correo}</Text>
      <Stack pt="20px" maxW="300px">
        <Button onClick={() => router.push("/miscursos")}>Ver cursos que he creado</Button>
        <Button onClick={() => router.push("/home")}>Ver cursos a los que me han invitado</Button>
        <Button onClick={handleCerrarSesion} variant="danger">Cerrar sesión</Button>
      </Stack>
    </Box>
  )
}

export default Perfil
