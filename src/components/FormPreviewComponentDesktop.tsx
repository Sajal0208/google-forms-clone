import { Box, Textarea } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { CreateFormInputValidator } from "~/helpers/formInputValidator";
import Wrapper from "./Wrapper";
import CustomFormButton from "./CustomFormButton";

interface Props {
  className: string;
  formValues: CreateFormInputValidator;
  updateFormValues: () => void;
}

interface DisplayQuestionsProps {
  questions: CreateFormInputValidator["questions"];
}

interface OptionsPreviewProps {
  options: CreateFormInputValidator["questions"][0]["options"];
  questionType: CreateFormInputValidator["questions"][0]["questionType"];
  answers: CreateFormInputValidator["questions"][0]["answer"];
}

const OptionsPreview = ({
  options,
  questionType,
  answers,
}: OptionsPreviewProps) => {
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
    console.log("MULTIPLE_CHOICE")

    const indexOfAnswers = answers.map((answer) => {
      return answer
    });

    console.log(indexOfAnswers);

    return (
      <>
        <Box>
          {options.map((option, index) => {
            if (option.optionTitle === "") {
              return <></>;
            }
            return (
              <Box key={index} className="flex flex-row">
                <input
                  type="checkbox"
                  className="mr-2"
                  disabled={true}
                  // defaultChecked={}
                />
                <Box>{option.optionTitle}</Box>
              </Box>
            );
          })}
        </Box>
      </>
    );
  }

  if (questionType === "SINGLE_CHOICE") {
    console.log("SINGLE_CHOICE")

    return (
      <>
        <Box>
          {options.map((option, index) => {
            if (option.optionTitle === "") {
              return <></>;
            }

            return (
              <Box key={index} className="flex flex-row">
                <input
                  type="radio"
                  className="mr-2"
                  disabled={true}
                  defaultChecked={answers[0] === index}
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

const DisplayQuestions = ({ questions }: DisplayQuestionsProps) => {
  if (questions.length === 0) {
    return <>No questions added</>;
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
              <OptionsPreview
                questionType={question.questionType}
                options={question.options}
                answers={question.answer}
              />
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
  const { title, description, questions } = formValues;

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
          <DisplayQuestions questions={questions} />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default FormPreviewComponentDesktop;
