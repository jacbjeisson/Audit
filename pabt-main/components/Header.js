import { useRouter } from 'next/router'

import { Button, Flex } from "@chakra-ui/react"
import Image from 'next/image'


const BotonHeader = ({ texto, href, ...rest }) => {

  const router = useRouter()
 
  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <Button 
      onClick={handleClick}
      colorScheme="gray"
      variant="ghost"
      {...rest}>
      <a href={href}>{texto}</a>
    </Button>
  )

}

const Header = () => {

  const router = useRouter()

  const handleCrearCurso = () => {
    router.push('/crear-curso')
  }

  return (
    <Flex 
      alignItems="center"
      h="7vh"
      px="15%"
      direction="row"
      spacing="5"
      border="1px"
      borderColor="gray.300"
    >
      <Image 
        src="/Jab.svg"
        alt="logo de Jab"
        width={100}
        height={50}
      />
      <BotonHeader texto="Explorar" href="/login" ml="auto"/>
      <BotonHeader texto="Mi perfil" href="/perfil" />
      <Button onClick={handleCrearCurso}>Crear curso</Button>
    </Flex>
  )
}

export default Header
