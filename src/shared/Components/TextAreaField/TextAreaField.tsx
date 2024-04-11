import { useDispatch } from "react-redux";

import { Button, ButtonGroup } from "@mui/material";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
  Typography,
} from "@mui/joy";

import { SubmitHandler, useForm } from "react-hook-form";

import { requestActions } from "../../../store/request-slice";

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
  };

  const fieldErrors = () => {
    const textAreaError = errors.purpose;
    if (textAreaError?.type === "required") return textAreaError.message;
    else if (textAreaError?.type === "minLength")
      return "The purpose should have a minimun length of 50";
    return "";
  };

  return (
    <Styled.TextAreaFieldWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>{data[0]}:</FormLabel>
          <Textarea
            error={errors.purpose ? true : false}
            id="purpose"
            defaultValue={data[1]}
            placeholder="Placeholder"
            minRows={3}
            size="md"
            endDecorator={
              <Typography level="body-xs" sx={{ ml: "auto" }}>
                10 character(s)
              </Typography>
            }
            sx={{ minWidth: 300 }}
            {...register("purpose", {
              required: "The purpose field is required",
              minLength: 5,
            })}
          />
          {errors && <FormHelperText>{fieldErrors()}</FormHelperText>}
          <ButtonGroup aria-label="Basic button group">
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
          </ButtonGroup>
        </FormControl>
      </form>
    </Styled.TextAreaFieldWrapper>
  );
};

export default TextAreaField;
