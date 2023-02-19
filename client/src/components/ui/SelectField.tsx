import React, { FC } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { Controller } from "react-hook-form";
import { IFormFieldProps } from "interfaces/common.interface";
import { FormHelperText } from "@mui/material";

interface ISelectFieldProps extends IFormFieldProps {
  data: Array<{ value: string | number; label: string }>;
}

const SelectField: FC<ISelectFieldProps & SelectProps> = ({ 
  name, control, setValue, errors, data, ...otherProps 
}): JSX.Element => {
  const error = errors[name];
  return (
    <Controller control={control} name={name} render={({ field }) => (
      <FormControl fullWidth>
        <InputLabel>{otherProps.label}</InputLabel>
        <Select
          {...field}
          error={error}
          onChange={(e) => setValue(field.name, e.target.value)}
          displayEmpty
          {...otherProps}
        >
          {data.map(({value, label}: any) => (
            <MenuItem key={value} value={value}>{label}</MenuItem>
          ))}
        </Select>
        <FormHelperText error={error}>{error?.message}</FormHelperText>
      </FormControl>
    )} />
  );
};

export default SelectField;
