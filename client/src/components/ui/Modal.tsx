import React, { FC } from 'react';
import MuiModal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/system/Stack';

interface IDeveloperModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  children?: React.ReactNode;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
};

const Modal: FC<IDeveloperModalProps> = ({ open, handleClose, title, children }): JSX.Element => {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        <Typography variant="h6" sx={{ pt: 2, pb: 2, pl: 4, pr: 4 }}>
          {title}
        </Typography>
        <Divider/>
        <Stack sx={{ p: 4 }}>
          {children}
        </Stack>
      </Box>
    </MuiModal>
  );
};

export default Modal;