import axios from "axios"
import getTokenCookie from "../../lib/getTokenCookie"

import constants from "../../lib/constants"
const { PROXY_URL } = constants

import { Badge, Text, Flex, Heading, Stack, IconButton, Spacer, Button, Divider, StackDivider } from "@chakra-ui/react"
import Header from "../../components/Header"
import { DeleteIcon } from "@chakra-ui/icons"
import { useState } from "react"

export async function getServerSideProps(ctx) {
  const { id } = ctx.query
  const headers = getTokenCookie(ctx)

  try {
    const resp = await axios({
      method: "get",
      url: PROXY_URL + "cursos/creado/" + id,
      data: {},
      headers
    })

    return {
      props: { 
        data: resp.data,
        url: PROXY_URL,
        headers
      }
    }
  } 
  catch(e) {
    console.log("LGG: ocurrio un error",e.message)

    return {
      props: { error: true }
    }
  }

}

const InfoBasicaCurso = ({
  nombre,
  descripcion,
  categoria,
  estadoPublico,
}) => {


  return (
    <>
      <Flex w="50%" mb="6px" direction="row" align="center">
        <Heading size="lg">{nombre}</Heading>
        <Badge ml="10px">{estadoPublico}</Badge>
      </Flex>
      <Text w="50%">{descripcion}</Text>
      {!descripcion && 
      <Text
        w="50%"
        fontStyle="italic"
        color="gray"
      >
        Sin descripción
      </Text>
      }
    </>
  )
}

const CursoCreado = ({ data, headers, error, url }) => {

  const [accesosDados, setAccesosDados] = useState(data.accesosDados)
  if(error)
    return "Ocurrio un error"

  const estadoPublico = data.esPublico ? "Público" : "Privado"

  const handleEliminarAcceso = id => {
    const nuevoArr = accesosDados.filter(el => el.acceso_curso_id !== id)
    setAccesosDados(nuevoArr)
    axios({
      method:"delete",
      url: url + "acceso-cursos/" + id,
      data: {},
      headers
    })
  }

  return (
    <>
      <Header />
      <Flex px="10%" pt="5%" direction="column" align="center">
        <InfoBasicaCurso 
          estadoPublico={estadoPublico}
          {...data}
        />
        <Stack 
          w="50%"
          mt="20px" 
          border="1px solid #cfcfcf"
          borderRadius="7px"
          p="10px"
        >
          <p>Aun no has agregado secciones a este curso...</p>
        </Stack>
        <Flex 
          w="50%"
          mt="15px" 
          direction="column" 
          align="left"
          border="1px solid #cfcfcf"
          borderRadius="7px"
          p="10px"
        >
          <Flex align="center" mb="20px">
            <Heading size="sm">Personas invitadas</Heading>
            <Spacer />
            <Button size="sm">Agregar</Button>
          </Flex>
          <Stack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={2}
          >
            {accesosDados.map((acceso, i) => (
              <Flex align="center" key={i}>
                <p>{acceso.usuario.correo}</p>
                <Spacer />
                <div>
                  <IconButton 
                    variant="danger"
                    size="sm"
                    icon={<DeleteIcon />}
                    onClick={() => 
                        handleEliminarAcceso(acceso.acceso_curso_id)
                    }
                  />
                </div>
              </Flex>
            ))}
            {!accesosDados.length && (
              <Text
                color="gray"
                fontSize="sm"
              >Aun no has invitado a nadie a este curso</Text>
            )}

          </Stack>
        </Flex>
      </Flex>
    </>
  )
}

export default CursoCreado
