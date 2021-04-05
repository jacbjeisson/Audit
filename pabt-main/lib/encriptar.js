import { sha256 } from 'js-sha256';


const encriptar = texto => {
  const textoConSha = sha256(texto)
  const textoFinal = "5f2nqwf17a" + textoConSha + "d67326a226"
  return textoFinal
}

export default encriptar
