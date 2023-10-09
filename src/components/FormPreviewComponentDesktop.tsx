import { Box, NumberInputFieldProps, Textarea } from "@chakra-ui/react";
import React, { use, useEffect } from "react";
import { CreateFormInputValidator } from "~/helpers/formInputValidator";
import Wrapper from "./Wrapper";
import CustomFormButton from "./CustomFormButton";

interface Props {
  className: string;
  formValues: CreateFormInputValidator;
  updateFormValues: () => void;
}

interface DisplayQuestionsProps {
  formValues: CreateFormInputValidator;
}

interface OptionsPreviewProps {
  formValues: CreateFormInputValidator;
  index: number;
}

const OptionsPreview = ({ formValues, index }: OptionsPreviewProps) => {
  const { questions } = formValues;
  
  const particularQuestion = questions[index]
  
  if(particularQuestion === undefined) {
    return <></>
  } 
  
  const { answer: answers, options, questionType  } = particularQuestion
  
  console.log(answers);
  
  if (questionType === "TEXT") {
    return (
      <>
        <Textarea
          disabled={true}
          defaultValue={"Your Answer"}
          className="w-full"
        />
      </>
    );
  }

  if (questionType === "MULTIPLE_CHOICE") {
    console.log("MULTIPLE_CHOICE");
    console.log(answers);
    useEffect(() => {
      console.log("Answer changed");
    }, [answers, questionType, options]);
  

    return (
      <>
        {options.map((option, index) => {
          console.log("got re-rendered");
          const answersArray = answers.map((answer, index) => {
            return Number(answer);
          });
          console.log(answersArray);
          console.log(answersArray.includes(index));
          if (option.optionTitle === "") {
            return <></>;
          }
          return (
            <Box key={index} className="flex flex-row">
              <input
                key={index + 1}
                type="checkbox"
                className="mr-2"
                defaultChecked={answersArray.includes(index)}
                disabled={true}
              />
              <Box>{option.optionTitle}</Box>
            </Box>
          );
        })}
      </>
    );
  }

  if (questionType === "SINGLE_CHOICE") {
    useEffect(() => {
      console.log("Answer changed");
    }, [answers, questionType, answers]);
  
    return (
      <>
        <Box>
          {options.map((option, index) => {
            const answer = Number(answers[0]);
            if (option.optionTitle === "") {
              return <></>;
            }

            return (
              <Box key={index} className="flex flex-row">
                <input
                  type="radio"
                  className="mr-2"
                  disabled={true}
                  defaultChecked={answer === index}
                />
                <Box>{option.optionTitle}</Box>
              </Box>
            );
          })}
        </Box>
      </>
    );
  }
};

const DisplayQuestions = ({ formValues }: DisplayQuestionsProps) => {
  const { questions } = formValues;

  if (questions.length === 0) {
    return <></>;
  }

  return (
    <Box className="grid w-full gap-y-4">
      {questions.map((question, index) => {
        return (
          <Wrapper key={index} className="grid gap-y-1">
            <Box className="font-semibold">
              {index + 1}. {question.questionTitle}
            </Box>
            <Box>{question.questionDescription}</Box>
            <Box>
              <OptionsPreview index = {index} formValues={formValues} />
            </Box>
          </Wrapper>
        );
      })}
    </Box>
  );
};

const FormPreviewComponentDesktop = ({
  formValues,
  updateFormValues,
}: Props) => {
  const { title, description } = formValues;

  return (
    <Wrapper className="relative mr-5 hidden overflow-scroll p-4 shadow-inner sm:w-1/3 lg:block xl:w-1/2">
      <Box className="absolute right-10 top-5">
        <CustomFormButton
          onClick={() => {
            updateFormValues();
          }}
          text={"Reload"}
        />
      </Box>
      <Box className="flex flex-col p-6">
        <Box className="flex flex-col ">
          <Box className="text-5xl font-bold text-purple-700">{title}</Box>
          <Box className="mt-2 text-xl text-gray-500">{description}</Box>
        </Box>
        <Box className="mt-8 flex w-full flex-row">
          <DisplayQuestions formValues={formValues} />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default FormPreviewComponentDesktop;
