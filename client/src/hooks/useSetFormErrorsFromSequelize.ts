import { useEffect } from "react";
import { UseFormSetError } from "react-hook-form";
import { IDeveloper } from "interfaces/developers.interface";
import { capitalize } from "@mui/material/utils";

const useSetFormErrorsFromSequelize = (error: any, setError: UseFormSetError<IDeveloper>): void => {
  useEffect(() => {
    if (error) {
      if (error?.data?.name?.includes('Sequelize') && error?.data?.errors) {
        error.data.errors.forEach(({ path, message }: any) => {
          setError(path, { message: capitalize(message) });
        });
      }
    }
  }, [error]);
}

export default useSetFormErrorsFromSequelize;