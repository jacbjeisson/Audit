import Image from 'next/image'
import { Badge, Box, Flex, Grid, Text } from "@chakra-ui/react"


const CardCurso = ({
  nombre,
  categoria,
  dificultad,
  autor,
  seccionesCompletadas,
  cantidadSecciones 
}) => {

  const progreso = seccionesCompletadas / cantidadSecciones * 100

  return (
    <Flex 
      bg="white"
      border="1px"
      borderColor="gray.200"
      maxW="600px"
      height="200px"
      borderRadius="10px"
      overflow="hidden"
      _hover={{
        boxShadow:"lg"
      }}
    >
      <Box w="25%" h="100%" position="relative" overflow="hidden">
        <Image
          layout="fill"
          src="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        />
      </Box>
      <Flex direction="column" p="5%" width="75%">
        <Grid templateColumns="70% 30%">
          <Text fontWeight="bold" fontSize="xl">{nombre}</Text>
          <Box textAlign="right">
            <Badge colorScheme="green">{categoria?.nombre}</Badge>
          </Box>
          <Text color="gray.500">{autor?.nombre}</Text>
          <Text color="gray.500" ml="auto" fontSize="sm">{dificultad}</Text>
        </Grid>
      </Flex>
    </Flex>
  )
}

export default CardCurso
