import useFormField from "../hooks/useFormField";
import { useState } from "react";
import getTokenCookie from "../lib/getTokenCookie";
import axios from "axios";
import constants from "../lib/constants";
import { useRouter } from "next/router";

const { PROXY_URL } = constants

import { 
  Stack,
  Input,
  Select,
  RadioGroup,
  Radio,
  Center, 
  Heading,
  Button, 
  Textarea
} from '@chakra-ui/react'


export async function getServerSideProps(ctx) {
  
  const headers = getTokenCookie(ctx)

  return {
    props: { headers, url: PROXY_URL  }
  }
}

const FormularioCrearCurso = ({ headers, url }) => {

  const CREAR_CURSO_URL = url + "cursos"

  const router = useRouter()

  const [nombre, setNombreInvalido] = useFormField("")
  const [descripcion, setDescripcionInvalido] = useFormField("")
  const [categoria, setCategoriaInvalido] = useFormField("")

  const [esPublicoStr, setEsPublico] = useState("true")

  const categorias = [
   {id:1, nombre: "Programación" },
   {id:2, nombre: "Matematicas" },
   {id:3, nombre: "Biología" },
   {id:4, nombre: "Historia" },
   {id:5, nombre: "Inglés" },
  ]

  const handleSubmit = () => {
    const submitValido = validarCampos()

    if(submitValido) {
      console.log("CLG: subir")
      const data = {
        categoria: categoria.value,
        nombre: nombre.value,
        descripcion: descripcion.value,
        esPublico: esPublicoStr === "true"
      }
      axios({
        method: "post",
        url:CREAR_CURSO_URL,
        data,
        headers
      })
        .then(resp => {
          const data = resp.data
          console.log("LGG: Curso creado correctamente")
          const id = data.identifiers[0].curso_id
          router.push("/miscursos/" + id)
        })
        .catch(err => {
          console.log("LGG: error al crear el curso")
        })
    }
  }

  const validarCampos = () => {
    let submitValido = true 
    if(nombre.value.length < 5) {
      setNombreInvalido(true)
      submitValido = false
    }
    if(descripcion.value.length > 100) {
      setDescripcionInvalido(true) 
      submitValido = false
    }
    if(!categoria.value) {
      setCategoriaInvalido(true)
      submitValido = false
    }

    return submitValido
  }


  return (
    <Center h="100vh" w="100vw">
      <Stack spacing={4} w="80%" maxW="400px">
        <Heading mb="15px" textAlign="center" size="lg">Crea tu curso hoy</Heading>
        <Input type="text" placeholder="Nombre del curso" {...nombre}/>
        <Textarea placeholder="Descripción (opcional)" {...descripcion}/>
        <Select 
          placeholder="Selecciona la categoría"
          {...categoria}
        >
          {categorias.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </Select>
        <RadioGroup value={esPublicoStr} onChange={setEsPublico}>
          <Stack>
            <Radio value="true">Público</Radio>
            <Radio value="false">Privado</Radio>
          </Stack>
        </RadioGroup>
        <Button onClick={handleSubmit}>Crear curso</Button> 
      </Stack>
    </Center>
  )

}

export default FormularioCrearCurso
