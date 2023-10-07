import React, { useEffect } from "react";
import { OptionComponentProps } from "./CreateForm";
import {
  Control,
  UseFieldArrayRemove,
  UseFieldArrayReturn,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import CustomFormButton from "./CustomFormButton";
import { Box, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { CreateFormInputValidator } from "~/helpers/formInputValidator";
import { Radio, RadioGroup } from "@chakra-ui/react";

interface InputProps {
  field: any;
  index: number;
  control: Control<CreateFormInputValidator>;
  remove: UseFieldArrayRemove;
  questionIndex: number;
  qType: string;
  answerFieldArray?: any;
}

const Input = ({
  field,
  index,
  control,
  remove,
  questionIndex,
  qType,
  answerFieldArray,
}: InputProps) => {
  const { register } = control;
  const form = useFormContext();
  const { formState, getFieldState, getValues } = form;
  const fieldName = `questions.${questionIndex}.options.${index}.optionTitle`;
  const fieldState = getFieldState(fieldName);
  const { error } = fieldState;
  const fieldError = fieldState ? fieldState.error : undefined;
  const errorMessage = fieldError?.message;
  const formValues = getValues();

  if (qType === "TEXT" || qType === "") {
    return <></>;
  }

  if (qType === "SINGLE_CHOICE") {
    return (
      <Box className="relative flex w-full flex-col">
        <Box className="flex flex-row">
          <input
            {...register(`questions.${questionIndex}.answer`)}
            type="radio"
            value={index}
            className="mr-2"
            onChange = {(e) => {
              answerFieldArray.remove()
              answerFieldArray.append(e.target.value)
            }}
          />
          <input
            className="w-full border-b-2 border-gray-200 hover:border-gray-500 focus:border-hidden"
            key={field.id}
            {...register(
              `questions.${questionIndex}.options.${index}.optionTitle`,
            )}
            placeholder={`Option ${index + 1}`}
          />
        </Box>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
        <Box className="absolute right-0 top-0">
          <CustomFormButton
            customStyle={{
              marginTop: "0px",
              borderBottom: "none",
            }}
            text="Delete Option"
            onClick={() => {
              remove(index);
            }}
          />
        </Box>
      </Box>
    );
  }

  if (qType === "MULTIPLE_CHOICE") {
    return (
      <Box className="relative flex w-full flex-col">
        <Box className="flex flex-row">
          <input
            {...register(`questions.${questionIndex}.answer`)}
            type="checkbox"
            value={index}
            className="mr-2"
            onChange={(e) => {
              const {answer} = formValues.questions[questionIndex]
              const answerIndex = answer.indexOf(e.target.value)
              if (answerIndex > -1) {
                answerFieldArray.remove(answerIndex)
              } else {
                answerFieldArray.append(e.target.value)
              }
            }}
          />
          <input
            className="w-full border-b-2 border-gray-200 hover:border-gray-500 focus:border-hidden"
            key={field.id}
            {...register(
              `questions.${questionIndex}.options.${index}.optionTitle`,
            )}
            placeholder={`Option ${index + 1}`}
          />
        </Box>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
        <Box className="absolute right-0 top-0">
          <CustomFormButton
            customStyle={{
              marginTop: "0px",
              borderBottom: "none",
            }}
            text="Delete Option"
            onClick={() => {
              remove(index);
            }}
          />
        </Box>
      </Box>
    );
  }
};

const OptionComponent = ({
  control,
  questionIndex,
  qType,
}: OptionComponentProps) => {
  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: `questions.${questionIndex}.options`,
  });

  const answerFieldArray = useFieldArray({
    control: control,
    name: `questions.${questionIndex}.answer`,
  });

  useEffect(() => {
    console.log(qType);
  }, [qType]);

  if (qType === "TEXT" || qType === "") {
    return <></>;
  }

  return (
    <Box>
      <FormLabel>Question Options</FormLabel>
      <Box className="relative grid gap-y-1">
        {fields.map((field, index) => {
          console.log(field);
          return (
            <Input
              control={control}
              field={field}
              index={index}
              key={field.id}
              questionIndex={questionIndex}
              remove={remove}
              qType={qType}
              answerFieldArray={answerFieldArray}
            />
          );
        })}
      </Box>

      <CustomFormButton
        text={"Add Option"}
        onClick={() => {
          append({
            optionTitle: "",
            questionId: "",
          });
        }}
      />
    </Box>
  );
};

export default OptionComponent;
