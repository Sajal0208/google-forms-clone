import React from 'react'
import { Input, Button } from '@chakra-ui/react'

interface CustomFormButtonProps {
    onClick: () => void;
    text: string;
    customStyle?: React.CSSProperties;
}

const CustomFormButton = ({ onClick, text, customStyle } : CustomFormButtonProps) => {
  return (
    <button
        className="mt-2 my-2 text-sm text-gray-500 border-b-2 border-gray-200 hover:border-gray-500"
        type="button"
        onClick={onClick}
        style = {customStyle}
    >
        {text}
    </button>
  )
}

export default CustomFormButton