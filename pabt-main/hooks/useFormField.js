import { useCallback, useState } from "react";

const useFormField = initialValue => {
  const [value, setValue] = useState(initialValue)
  const [isInvalid, setIsInvalid] = useState(false)
  const onChange = useCallback(
    e => { 
      setValue(e.target.value),
      setIsInvalid(false)
    },
    []
  )

  const input = { value, isInvalid, onChange }
  return [input, setIsInvalid] 
};

export default useFormField
