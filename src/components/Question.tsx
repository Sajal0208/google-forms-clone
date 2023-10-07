import {
  FormLabel,
  Input,
  Select,
  Box,
  FormHelperText,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { QuestionProps, QuestionType } from "./CreateForm";
import Wrapper from "./Wrapper";
import { useEffect } from "react";
import { FormState, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { CreateFormInputValidator } from "~/helpers/formInputValidator";
import OptionComponent from "./OptionComponent";
import CustomInputComponent from "./CustomInputComponent";
import CustomFormButton from "./CustomFormButton";

export const Question = ({
  index,
  update,
  value,
  remove,
  form,
  control,
}: QuestionProps) => {
  const [toggleList, setToggleList] = useState(true);
  const [qType, setQType] = useState("TEXT");

  const { register, formState } = form;

  const sortLogo = toggleList ? "/sort-down.png" : "/sort-right.png";

  return (
    <Box className="relative">
      <Box className="flex flex-row text-xl font-bold text-purple-700">
        <img
          className="h-8 w-8 cursor-pointer"
          src={sortLogo}
          onClick={() => {
            setToggleList(!toggleList);
          }}
        />
        <span>Question {index + 1}</span>
      </Box>
      {toggleList && (
        <Wrapper customStyle={{}} className=" grid gap-y-2">
          <Box>
            <FormLabel>Question Title</FormLabel>
            <CustomInputComponent
              inputType="text"
              index={index}
              register={register}
              id="questionTitle"
              placeholder="Question Title"
              registerName={`questions.${index}.questionTitle` as const}
            />
          </Box>
          <Box>
            <FormLabel>Question Description</FormLabel>
            <CustomInputComponent
              inputType="text"
              index={index}
              register={register}
              id="questionDescription"
              placeholder="Question Description"
              registerName={`questions.${index}.questionDescription` as const}
            />
          </Box>
          <Box>
            <FormLabel>Question Type</FormLabel>
            <CustomInputComponent 
              inputType="select"
              index={index}
              register={register}
              id="questionType"
              placeholder="Question Type"
              registerName={`questions.${index}.questionType` as const}
              qType = {qType}
              onChange={(e) => {
                setQType(e.target.value);
              }}
            />
          </Box>
          {<OptionComponent qType = {qType} control={control} questionIndex={index} />}
        </Wrapper>
      )}
      <Box className="absolute right-0 top-0">
        <CustomFormButton
          text={"Remove Question"}
          onClick={() => remove(index)}
        />
      </Box>
    </Box>
  );
};
