import { Form, UseFormRegister, useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import {
  CreateFormInputValidator,
  createFormInputValidator,
} from "../helpers/formInputValidator";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

type TestCreateFormProps = {
  title: string;
  description: string;
};

type AddQuestionProps = {
    register: UseFormRegister<TestCreateFormProps>;
}

const AddQuestionComponent = ({register} : AddQuestionProps) => {
    return (
        <Box>

        </Box>
    )
}

const resolver = zodResolver(createFormInputValidator);

export default function CreateForm() {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestCreateFormProps>();
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const onSubmit = (values: TestCreateFormProps): Promise<void> => {
    console.log(values);
    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: "Form submitted",
          description: "We've created a form for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        reset();
        setShowAddQuestion(false);
        resolve();
      }, 3000);
    });
  };

  const addQuestionHandler = () => {
    setShowAddQuestion(true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors}>

        {/* Input */}
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          placeholder="title"
          {...register("title", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>

        {/* Description */}
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          id="description"
          placeholder="description"
          {...register("description", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>

        {/* Question */}
        <FormLabel htmlFor="question">Question</FormLabel>
        <Box>
            
        <Button onClick = {addQuestionHandler}>Add Question</Button>
        </Box>
        {showAddQuestion && <AddQuestionComponent register = {register} />}

        <Button disabled={isSubmitting} className="mt-4" type="submit">
          Submit
        </Button>

      </FormControl>
    </form>
  );
}
