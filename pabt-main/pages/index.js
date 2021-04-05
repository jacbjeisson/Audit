import useFormField from "../hooks/useFormField";
import validateEmail from '../lib/validateEmail';
import axios from 'axios'
import { useRouter } from 'next/router'
import encriptar from '../lib/encriptar'
import Cookies from "cookies"

import Head from 'next/head'
import { Heading, Flex, Input, Stack, Box, Button, Text, HStack } from "@chakra-ui/react"
import Link from '../components/Link';

import constants from '../lib/constants'
const { PROXY_URL } = constants

export function getServerSideProps ({ req, res }) {

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

  return {
    props: { url: PROXY_URL }
  }

}

export default function Home({ url }) {

  const router = useRouter()

  const [campoNombre, setNombreInvalido ] = useFormField('')
  const [campoApellido, setApellidoInvalido ] = useFormField('')
  const [campoEmail, setEmailInvalido ] = useFormField('')
  const [campoPassword, setPasswordInvalido ] = useFormField('')

  const handleSumbit = () => {
    const submitValido = validarCampos()

    if(submitValido) 
      registrarUsuario()

  }

  const registrarUsuario = () => {

    const datosRegistroUsuario = {
      nombres:campoNombre.value,
      apellidos:campoApellido.value,
      correo: campoEmail.value,
      username:campoEmail.value,
      password:encriptar(campoPassword.value),
    }

    axios.post(url + "usuarios",datosRegistroUsuario)
      .then(() => {
        router.push('/login')
      })
      .catch(() => {
        // TODO: Mostrar esto en interfaz
        console.log("Ocurrio un error al registrar el usuario")
      })

  }

  const validarCampos = () => {
    let submitValido = true 
    if(campoNombre.value.length < 1){ 
      setNombreInvalido(true)
      submitValido = false
    }
    if(campoApellido.value.length < 1){
      setApellidoInvalido(true)
      submitValido = false
    }
    if(!validateEmail(campoEmail.value)) {
      setEmailInvalido(true)
      submitValido = false
    }
    if(campoPassword.value.length < 8) {
      setPasswordInvalido(true)
      submitValido = false
    }

    return submitValido

  }

  return (
    <>
      <Head>
        <title>Jab - Registrate hoy</title>
      </Head>
      <Flex bg="brand.white" align="center" justify="space-around" h="100vh" px="12%">
        <Box w="50%" mr="5"> 
          <Heading mb="20px">Plataforma de aprendizaje basada en texto</Heading>
          <Text fontSize="2xl">Registrate hoy. Es gratis!</Text>
        </Box>
        <div>
          <Stack bg="white" boxShadow="base" p="4" borderRadius="6px" spacing={3}>
            <HStack>
              <Input {...campoNombre} type="text" placeholder="Nombre(s)" />
              <Input {...campoApellido} type="text" placeholder="Apellido(s)" />
            </HStack>
            <Input {...campoEmail} type="text" placeholder="Email" />
            <Input {...campoPassword} type="password" placeholder="Contraseña" />
            <Button onClick={handleSumbit}>Registrarse</Button>
            <Text alignSelf="center">¿Ya tienes cuenta?&nbsp;
              <Link href="/login">Inicia sesión</Link>
            </Text>
          </Stack>
        </div>
      </Flex>
    </>
  )
}
