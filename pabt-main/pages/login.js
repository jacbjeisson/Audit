import useFormField from '../hooks/useFormField'
import validateEmail from '../lib/validateEmail'
import { useRouter } from 'next/router'
import encriptar from '../lib/encriptar'
import axios from 'axios'
import Cookies from 'cookies'
import { useToast } from "@chakra-ui/react"

import constants from '../lib/constants'
const { PROXY_URL } = constants

import Head from 'next/head'
import Link from '../components/Link'
import { Box, Stack, Input, Button, Text, Flex, Heading } from '@chakra-ui/react'


export async function getServerSideProps({ req, res }) {

  const cookies = new Cookies(req, res)
  const storedRefreshToken = cookies.get('auth-token')
  if(storedRefreshToken) {
    return {
      redirect: {
        destination: '/home',
        permantent: false
      }
    }
  }

  return { props: { url:PROXY_URL }}
}

const Login = ({ url }) => {

  const [campoEmail, setEmailInvalido ] = useFormField('')
  const [campoPassword, setPasswordInvalido ] = useFormField('')

  const router = useRouter()
  const toast = useToast()


  const mostrarToast = (title, description, status) => {
      toast({
          title,
          description,
          status,
          duration: 3000,
          isClosable: true
        })
  }

  const handleSumbit = () => {
    !validateEmail(campoEmail.value) && setEmailInvalido(true)
    campoPassword.value.length < 8 && setPasswordInvalido(true)

    const dataUsuario = {
      username:campoEmail.value,
      password:encriptar(campoPassword.value),
    }

    autenticarUsuario(dataUsuario)

  }

  const autenticarUsuario = async user => {

    try {
      const resp = await axios({
        method:"post",
        url:url + "usuarios/login",
        data:user
      })
      const data = resp.data
      if(data.ok){
        mostrarToast(
          "Sesión iniciada correctamente",
          "Serás redirigido en un momento",
          "success"
        )
        router.push('/home')
      }
    }
    catch {
      console.log("error al logear")
      mostrarToast(
        "Error al iniciar sesión",
        "Verifica que estas ingresando los datos correctos",
        "error"
      )

    }


  }

  

  return (
    <>
      <Head>
        <title>Iniciar sesión</title>
      </Head>
      <Flex align="center" justify="center" h="100vh" bg="brand.white">
        <Box 
          w='80%' 
          maxW="450px"
          minW="270px"
          p="4%"
          border="1px"
          borderColor="gray.200" 
          borderRadius="5px"
          boxShadow="base"
          bg="white"
        >
          <Heading size="md" align="center">Inicia sesión en PABT</Heading>
          <Stack mt="10px" spacing={3}>
            <Input {...campoEmail} type="text" placeholder="Email" />
            <Input {...campoPassword} type="password" placeholder="Contraseña" />
            <Button onClick={handleSumbit}>Iniciar sesión</Button>
            <Text textAlign="center">¿Aún no tienes cuenta?&nbsp;
              <Link href="/">Regístrate</Link>
            </Text>
          </Stack>
        </Box>
      </Flex>
    </>
  )
}

export default Login
