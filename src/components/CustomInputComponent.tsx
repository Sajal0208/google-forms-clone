import { FormErrorMessage, Input, Select } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { CustomInputProps } from "./CreateForm";
import { FormState } from "react-hook-form";
import { CreateFormInputValidator } from "~/helpers/formInputValidator";
import { useFormContext } from "react-hook-form";

const CustomInputComponent = ({
  register,
  id,
  placeholder,
  registerName,
  index,
  inputType,
  onChange,
  qType,
}: CustomInputProps) => {
  const form = useFormContext();
  const { formState, getFieldState } = form;
  const fieldState = getFieldState(registerName);
  const { error } = fieldState;
  const fieldError = fieldState ? fieldState.error : undefined;
  const errorMessage = fieldError?.message;

  useEffect(() => {}, [fieldError]);

  if (inputType === "text") {
    return (
      <>
        <Input
          id={id}
          placeholder={placeholder}
          {...register(registerName)}
          style={{
            height: "30px",
          }}
        />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </>
    );
  }

  if (inputType === "select") {
    return (
      <>
        <Select
          height={{
            base: "30px",
          }}
          {...register(registerName)}
          placeholder="Select Option"
          value={qType}
          onChange={onChange}
        >
          <option value="TEXT">TEXT</option>
          <option value="MULTIPLE_CHOICE">MULTIPLE CHOICE</option>
          <option value="SINGLE_CHOICE">SINGLE CHOICE</option>
        </Select>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </>
    );
  }
};

export default CustomInputComponent;
