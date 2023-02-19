import { Control, UseFormSetValue } from "react-hook-form";

export interface IPaginationParams {
  page: number;
  perPage: number;
}

export interface IPaginationResponse<T> {
  rows: T[];
  count: number;
}

export interface IFormFieldProps {
  name: string;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  errors: any;
}