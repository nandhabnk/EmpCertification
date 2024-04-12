import { useDispatch } from "react-redux";

import { Button, Stack } from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";

import { FormControl, FormHelperText, FormLabel, Textarea } from "@mui/joy";

import { SubmitHandler, useForm } from "react-hook-form";

import { requestActions } from "../../../store/request-slice";

import { toast } from "react-toastify";

import * as Styled from "./TextAreaField.style";

type Inputs = {
  purpose: string;
};

const TextAreaField = ({
  data,
  updateIsEditting,
}: {
  data: Array<string | number>;
  updateIsEditting: (val: boolean) => void;
}) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (fieldData) => {
    dispatch(requestActions.updateDetail(fieldData));
    updateIsEditting(false);
    toast.success("Purpose field is succesfully updated!", {
      toastId: "update success",
    });
  };

  const fieldErrors = () => {
    const textAreaError = errors.purpose;
    if (textAreaError?.type === "required") return textAreaError.message;
    else if (textAreaError?.type === "minLength")
      return "Purpose field should have a minimum of 50 characters";
    return "";
  };

  return (
    <Styled.TextAreaFieldWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl error={errors.purpose ? true : false}>
          <FormLabel>{data[0]}:</FormLabel>
          <Textarea
            id="purpose"
            defaultValue={data[1]}
            placeholder="Placeholder"
            minRows={3}
            maxRows={6}
            size="md"
            sx={{ minWidth: 300 }}
            {...register("purpose", {
              required: "Purpose field is required",
              minLength: 50,
            })}
          />
          {errors?.purpose && (
            <FormHelperText>
              <InfoIcon />
              {fieldErrors()}
            </FormHelperText>
          )}
          <Stack
            direction="row"
            justifyContent="space-between"
            padding={2}
            id="update-purpose-btn-grp"
          >
            <Button variant="contained" type="submit" color="success">
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => updateIsEditting(false)}
            >
              Cancel
            </Button>
          </Stack>
        </FormControl>
      </form>
    </Styled.TextAreaFieldWrapper>
  );
};

export default TextAreaField;
