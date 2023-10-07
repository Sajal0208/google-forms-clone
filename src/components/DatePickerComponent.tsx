import React, { forwardRef, useEffect, useRef, useState } from "react";
// import { DatePicker } from "rsuite";
import { addMinutes, isBefore } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputComponent from "./DateInputComponent";
import { Controller } from "react-hook-form";

const ranges = [
  {
    label: "today",
    value: new Date(),
    closeOverlay: true,
  },
  {
    label: "10 minutes later",
    value: addMinutes(new Date(), +10),
    closeOverlay: true,
  },
];

interface Props {
  onDateChange: (event: React.SyntheticEvent) => void;
  name: string;
  dateRef: React.Ref<HTMLInputElement>;
  control: any;
  formValues: any;
}

const DatePickerComponent = ({
  onDateChange,
  name,
  dateRef,
  control,
  formValues,
}: Props) => {
  const CustomInput = forwardRef((props: any, innerRef) => {
    return <InputComponent {...props} innerRef={innerRef} />;
  });

  // const handleDateChange = (
  //   value: Date | null,
  //   event: React.SyntheticEvent,
  // ) => {
  //   console.log("handleDateSelect", value);
  //   if (value) {
  //     setDate(value);
  //   }

  //   onDateChange(event);
  // };

  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            selected={field.value}
            showTimeSelect={true}
            name={field.name}
            onChange={(date) => {
              field.onChange(date);
            }}
            todayButton="Today"
            customInput={
              <CustomInput
                className={
                  "w-48 rounded-lg border-2 border-solid border-purple-700 p-2 text-xs sm:w-56 md:text-sm"
                }
                innerRef={dateRef}
              />
            }
            dropdownMode="select"
            isClearable={true}
            placeholderText="Click to select time"
            shouldCloseOnSelect
          />
        )}
      />
    </div>
  );
};

export default DatePickerComponent;
