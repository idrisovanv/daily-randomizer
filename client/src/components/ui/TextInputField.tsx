import React, { FC } from "react";
import { Controller } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { IFormFieldProps } from "interfaces/common.interface";

const TextInputField: FC<IFormFieldProps & TextFieldProps> = ({ 
  name, setValue, control, errors, ...otherProps 
}): JSX.Element => {
  const error = errors[name];
  return (
    <Controller control={control} name={name} render={({ field }) => (
      <TextField
        name={name}
        value={field.value || ''}
        error={error}
        helperText={error?.message}
        {...otherProps}
        onChange={(e) => setValue(field.name, e.target.value)}
      />
    )}/>
  );
}

export default TextInputField;
  