import { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@mui/joy";

import InfoIcon from "@mui/icons-material/Info";

import { Button, Stack } from "@mui/material";

import { RequestBody } from "../../../../shared/types/requestDetails";

type Inputs = {
  address_to: string;
  purpose: string;
  issued_on: string;
  employee_id: string;
};

const CreateRequestPage = ({
  requestCertificate,
}: {
  requestCertificate: (reqBody: RequestBody) => Promise<void>;
}) => {
  const [isDateValid, setIsDateValid] = useState(false);

  const onDateChange = (date: string) => {
    if (new Date(date) > new Date()) return setIsDateValid(true);
    setIsDateValid(false);
  };

  const formatDate = (dateString: string) => {
    const dateParts = dateString.split("-");
    return `${Number(dateParts[2])}/${Number(dateParts[1])}/${Number(
      dateParts[0]
    )}`;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isDateValid) {
      const reqBody = data;
      reqBody.issued_on = formatDate(data.issued_on);
      requestCertificate(reqBody);
    }
  };

  const fieldErrors = (fieldId: string) => {
    const errorData = errors[fieldId as keyof Inputs];
    if (errorData?.type === "required") return errorData.message;
    else {
      switch (fieldId) {
        case "address_to":
          return "Address to field only accepts alphanumeric value";
        case "purpose":
          return "Purpose field should have a minimum of 50 characters";
        case "employee_id":
          return "Employee ID field only accepts numeric value";
        default:
          return "";
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl error={errors.address_to ? true : false}>
        <FormLabel>Address to:</FormLabel>
        <Textarea
          id="address_to"
          placeholder="Placeholder"
          minRows={2}
          maxRows={3}
          size="md"
          sx={{ minWidth: 400 }}
          {...register("address_to", {
            required: "Address to field is required",
            pattern: /^[a-zA-Z0-9]+$/,
          })}
        />
        {errors?.address_to && (
          <FormHelperText>
            <InfoIcon />
            {fieldErrors("address_to")}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl error={errors.purpose ? true : false}>
        <FormLabel>Purpose</FormLabel>
        <Textarea
          id="purpose"
          placeholder="Placeholder"
          minRows={3}
          maxRows={5}
          size="md"
          sx={{ minWidth: 400 }}
          {...register("purpose", {
            required: "Purpose field is required",
            minLength: 50,
          })}
        />
        {errors?.purpose && (
          <FormHelperText>
            <InfoIcon />
            {fieldErrors("purpose")}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl
        error={errors.issued_on || (isSubmitted && !isDateValid) ? true : false}
      >
        <FormLabel>Issued on</FormLabel>
        <Input
          min={new Date()}
          type="date"
          id="issued_on"
          {...register("issued_on", {
            required: "Issued on field is required",
            onChange: (e) => onDateChange(e.target.value),
          })}
        />
        {(errors?.issued_on || (isSubmitted && !isDateValid)) && (
          <FormHelperText>
            <InfoIcon />
            {errors?.issued_on
              ? fieldErrors("issued_on")
              : "Please select a future date"}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl error={errors.employee_id ? true : false}>
        <FormLabel>Employee ID</FormLabel>
        <Input
          id="employee_id"
          {...register("employee_id", {
            required: "Employee ID field is required",
            pattern: /^\d+$/,
          })}
        />
        {errors?.employee_id && (
          <FormHelperText>
            <InfoIcon />
            {fieldErrors("employee_id")}
          </FormHelperText>
        )}
      </FormControl>
      <Stack direction="row" justifyContent="space-between" padding={2}>
        <Button variant="contained" color="error" type="reset">
          Reset
        </Button>
        <Button variant="contained" type="submit" color="success">
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default CreateRequestPage;
