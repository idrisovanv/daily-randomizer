import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useLazyGetRandomDevelopersQuery } from "api/developers.api";
import { SubmitHandler, useForm } from "react-hook-form";
import SelectField from "components/ui/SelectField";
import { IFormFieldProps } from "interfaces/common.interface";
import { DeveloperOrder, IRandomDevelopersParams, SpeakerType } from "interfaces/developers.interface";
import { useGetTeamsQuery } from "api/teams.api";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { capitalize } from "@mui/material/utils";

interface IRandomizerFormProps {
  handleClose: () => void;
}

const defaultValues: IRandomDevelopersParams = {
  teamId: 0,
  order: DeveloperOrder.RANDOM,
  speaker: SpeakerType.NONE
};

const RandomizerForm: FC<IRandomizerFormProps> = ({ handleClose }): JSX.Element => {
  const { data: teams = [] } = useGetTeamsQuery();

  const [isResults, setIsResults] = useState(false);
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm({ defaultValues });

  const fieldParams: Omit<IFormFieldProps, 'name'> = { control, setValue, errors };

  const [trigger, { currentData, isFetching }] = useLazyGetRandomDevelopersQuery();
  const onGenerate: SubmitHandler<IRandomDevelopersParams> = (formData) => {
    setIsResults(true);
    trigger(formData)
  };
  const handleGenerateNew = (): void => setIsResults(false);

  if (isResults && !isFetching && currentData) {
    return (
      <>
        <Typography variant="subtitle1" color="GrayText">List result:</Typography>
        <Stack spacing={2} component="ul" sx={{ listStyleType: 'decimal', paddingInlineStart: 2.5, mb: 4 }}>
          {currentData?.developers?.map(({ id, name }) => (
            <Typography key={id} component="li">
              {name} 
              <Typography variant="caption" color="GrayText">
                {id === currentData?.speakerId && ' (Designated Speaker)'}
              </Typography>
            </Typography>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handleGenerateNew}>Generate new</Button>
        </Stack>
      </>
    );
  }

  return (
    <Stack
      component="form"
      spacing={4}
      onSubmit={handleSubmit(onGenerate)}
      sx={{ pl: 4, pr: 4 }}
    >
      <SelectField
        label="Developers"
        name="teamId"
        {...fieldParams}
        data={[
          {value: 0, label: 'All available'}, 
          ...teams.map(({id, name}) => ({
            value: id,
            label: name,
          }))
        ]}
      />
      <SelectField
        label="Sorting order"
        name="order"
        {...fieldParams}
        data={Object.values(DeveloperOrder).map((value) => ({
          value,
          label: capitalize(value),
        }))}
      />
      <SelectField
        label="Speaker"
        name="speaker"
        {...fieldParams}
        data={Object.values(SpeakerType).map((value) => ({
          value,
          label: capitalize(value),
        }))}
      />
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button 
          variant="contained" 
          type="submit" 
          disabled={isFetching}
          startIcon={isFetching ? <CircularProgress size={20} /> : null}
        >
          {isFetching ? 'Loading list' : 'Generate list'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default RandomizerForm;