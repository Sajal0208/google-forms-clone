import { useFieldArray } from "react-hook-form";
import { Box, Button, Heading } from "@chakra-ui/react";
import { QuestionComponentProps } from "./CreateForm";
import { Question } from "./Question";
import { CreateQuestionInputValidator } from "~/helpers/questionInputValidator";
import CustomFormButton from "./CustomFormButton";

export const QuestionComponent = ({
  control,
  form
}: QuestionComponentProps) => {
  console.log("hello");

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "questions",
  });

  return (
    <Box className="m-2 p-2">
      {fields.map((field, index) => {
        return (
          <Question
            form = {form}
            key = {field.id}
            update={update}
            index={index}
            value={field}
            remove={remove}
            control={control}
          />
        );
      })}

      <CustomFormButton
        text = "Add Question"
        onClick={() => {
          append({
            questionTitle: "",
            questionDescription: "",
            questionType: "TEXT",
            options: [{
              optionTitle: "",
              questionId: "",
            }],
            answer: [],
            isRequired: true,
          } as CreateQuestionInputValidator);
        }}
      />
    </Box>
  );
};
