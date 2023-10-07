import {
  UseFormRegister,
  useForm,
  UseFieldArrayReturn,
  FieldArrayWithId,
  Control,
  FormState,
  UseFieldArrayRemove,
  UseFormReturn,
  FormProvider,
} from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import CustomInputComponent from "./CustomInputComponent";
import {
  CreateFormInputValidator,
  createFormInputValidator,
} from "../helpers/formInputValidator";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { QuestionComponent } from "./QuestionComponent";
import Wrapper from "./Wrapper";
import FormPreviewComponentDesktop from "./FormPreviewComponentDesktop";
import { AnyZodTuple, z } from "zod";
import DatePickerComponent from "./DatePickerComponent";

const zod = zodResolver(createFormInputValidator);

export default function CreateForm() {
  const toast = useToast();

  const [formValues, setFormValues] = useState<CreateFormInputValidator>({
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    questions: [],
  });

  const form = useForm<CreateFormInputValidator>({
    resolver: zod,
  });

  const { handleSubmit, register, getValues, reset, control, formState } = form;

  const { errors, isSubmitting } = formState;

  const {
    onChange: onStartDateChange,
    name: startDateName,
    ref: startDateRef,
  } = register("startDate");

  const {
    onChange: onEndDateChange,
    name: endDateName,
    ref: endDateRef,
  } = register("endDate");
  
  // const formValues = getValues();

  useEffect(() => {}, [formState.errors]);

  const updateFormValues = () => {
    setFormValues(getValues());
  }

  useEffect(() => {
    updateFormValues();
  }, [])

  console.log(formValues);

  const onSubmit = (values: CreateFormInputValidator): Promise<void> => {
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
        true;
        resolve();
      }, 3000);
    });
  };

  const isFormInvalid = () => {
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      return false;
    }
    return true;
  };

  return (
    <Box className="flex flex-row">
      <FormProvider {...form}>
        <Wrapper className="mr-5 w-2/3 max-w-[600px] overflow-scroll p-4 shadow-inner sm:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={isFormInvalid()}>
              <Box className="m-2 p-2">
                {/* Title */}
                <FormLabel htmlFor="title">Form Title</FormLabel>
                <CustomInputComponent
                  inputType="text"
                  register={register}
                  id="title"
                  placeholder="Title"
                  registerName="title"
                />

                {/* Description */}
                <FormLabel htmlFor="description">Form Description</FormLabel>
                <CustomInputComponent
                  inputType="text"
                  register={register}
                  id="description"
                  placeholder="Description"
                  registerName="description"
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </Box>

              {/* Question */}
              <QuestionComponent
                form={form}
                formState={formState}
                control={control}
                register={register}
              />

              <Box className="m-2 grid gap-y-2 p-2">
                {/* Start Date */}
                <Box>
                  <FormLabel htmlFor="startDate">Start Time</FormLabel>
                  <DatePickerComponent
                    formValues={formValues}
                    control={control}
                    dateRef={startDateRef}
                    name={startDateName}
                    onDateChange={onStartDateChange}
                  />
                </Box>
                {/* End Date */}
                <Box>
                  <FormLabel htmlFor="endDate">End Time</FormLabel>
                  <DatePickerComponent
                    formValues={formValues}
                    control={control}
                    dateRef={endDateRef}
                    name={endDateName}
                    onDateChange={onEndDateChange}
                  />
                </Box>
              </Box>

              {/* Submit Button */}
              <Box className="m-2 flex flex-col p-2">
                <Button disabled={isSubmitting} className="mt-4" type="submit">
                  Submit
                </Button>
              </Box>
            </FormControl>
          </form>
        </Wrapper>
        <FormPreviewComponentDesktop updateFormValues = {updateFormValues} formValues={formValues} className="" />
      </FormProvider>
    </Box>
  );
}

export type QuestionComponentProps = {
  control: Control<CreateFormInputValidator>;
  register: UseFormRegister<CreateFormInputValidator>;
  formState: FormState<CreateFormInputValidator>;
  form: UseFormReturn<CreateFormInputValidator>;
};

export type QuestionProps = {
  index: number;
  value: FieldArrayWithId<CreateFormInputValidator, "questions", "id">;
  update: UseFieldArrayReturn<CreateFormInputValidator, "questions">["update"];
  remove: UseFieldArrayRemove;
  form: UseFormReturn<CreateFormInputValidator>;
  control: Control<CreateFormInputValidator>;
};

export enum QuestionType {
  TEXT = "TEXT",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  SINGLE_CHOICE = "SINGLE_CHOICE",
}

export type OptionComponentProps = {
  control: Control<CreateFormInputValidator>;
  questionIndex: number;
  qType: string;
};

export type CustomInputProps = {
  register: UseFormRegister<CreateFormInputValidator>;
  id: string;
  placeholder: string;
  registerName: any;
  index?: number;
  inputType: 'select' | 'text'; 
  onChange?: React.ChangeEventHandler<HTMLSelectElement> 
  qType?: string;
};
