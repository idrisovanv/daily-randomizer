import React, { FC, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { DEVELOPER_ROLE_LABELS, DEVELOPER_STATUS_LABELS } from 'constants/developers';
import { IDeveloper } from 'interfaces/developers.interface';
import { ITeam } from 'interfaces/teams.interface';
import Button from '@mui/material/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextInputField from 'components/ui/TextInputField';
import SelectField from 'components/ui/SelectField';
import { useCreateDeveloperMutation, useUpdateDeveloperMutation } from 'api/developers.api';
import { object, string, number } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { IFormFieldProps } from 'interfaces/common.interface';
import useSetFormErrorsFromSequelize from 'hooks/useSetFormErrorsFromSequelize';

interface IDeveloperFormProps {
  developer?: IDeveloper;
  teams: ITeam[];
  handleClose: () => void;
}

const developerSchema = object({
  name: string()
    .min(3, 'Name must be more than 2 characters')
    .max(45, 'Name must be less than 46 characters'),
  email: string()
    .min(3, 'Email must be more than 2 characters')
    .max(45, 'Email must be less than 46 characters')
    .email('Email is invalid'),
  role: number(),
  status: number(),
  teamId: number(),
});

const DeveloperForm: FC<IDeveloperFormProps> = ({ developer, teams, handleClose }): JSX.Element => {
  const {
    control,
    formState: { errors },
    setValue,
    setError,
    handleSubmit
  } = useForm({ defaultValues: developer, resolver: zodResolver(developerSchema) });

  const fieldParams: Omit<IFormFieldProps, 'name'> = { control, setValue, errors };

  const [createDeveloper, { error: createError, isSuccess: isCreateSuccess }] = useCreateDeveloperMutation();
  const [updateDeveloper, { error: updateError, isSuccess: isUpdateSuccess }] = useUpdateDeveloperMutation();
  const isSuccess = isCreateSuccess || isUpdateSuccess;
  
  const onSuccess: SubmitHandler<IDeveloper> = (formData) => {
    if (developer?.id) {
      updateDeveloper({ id: developer.id, formData });
    } else {
      createDeveloper(formData);
    }
  };
  
  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess, handleClose]);
  
  useSetFormErrorsFromSequelize(createError ?? updateError, setError);

  return (
    <Stack
      component="form"
      spacing={4}
      onSubmit={handleSubmit(onSuccess)}
      sx={{ pl: 4, pr: 4 }}
    >
      <TextInputField 
        label="Name & Surname"
        placeholder="Name example here"
        name="name" 
        {...fieldParams}
      />
      <TextInputField 
        label="Email address"
        placeholder="name@beyondplay.io"
        name="email" 
        {...fieldParams}
      />
      <SelectField
        label="Role"
        name="role"
        {...fieldParams}
        data={Object.keys(DEVELOPER_ROLE_LABELS).map((key) => ({
          value: +key,
          label: DEVELOPER_ROLE_LABELS[key],
        }))}
      />
      <SelectField
        label="Status"
        name="status"
        {...fieldParams}
        data={Object.keys(DEVELOPER_STATUS_LABELS).map((key) => ({
          value: +key,
          label: DEVELOPER_STATUS_LABELS[key],
        }))}
      />
      <SelectField
        label="Team"
        name="teamId"
        {...fieldParams}
        data={teams.map((team) => ({
          value: team.id,
          label: team.name,
        }))}
      />
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">Save</Button>
      </Stack>
    </Stack>
  )
}

export default DeveloperForm;
