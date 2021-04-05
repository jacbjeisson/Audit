import {Button, Flex, Spacer} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Modal = ({ show, children, onClose, onConfirm }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true)
  }, [])


  const handleClickModal = e => {
    console.log("LGG: hola>>")
  }

 

  const modalContent = show ? (
    <div
      style={{
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div
        onClick={handleClickModal}
        style={{
          padding: 20,
          background: '#fff',
          borderRadius: '2px',
          display: 'inline-block',
          minHeight: '300px',
          margin: '1rem',
          position: 'relative',
          minWidth: '300px',
          width: '60vw',
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
          justifySelf: 'center',
        }}
      >
        <div style={{ minHeight:"270px" }}>
          {children}
        </div>
        <hr />
        <Flex mt="5px">
          <Button onClick={onConfirm}>Aceptar</Button>
          <Button ml="auto" onClick={onClose} variant="outline">Cancelar</Button>
        </Flex>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }    

}

export default Modal;
