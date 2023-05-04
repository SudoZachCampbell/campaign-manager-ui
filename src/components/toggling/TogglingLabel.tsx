import React, { useState } from 'react';
import { Box, IconButton, Typography, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/EditTwoTone';

interface Props {
  label: string;
  toggleEdit: Function;
  title?: boolean;
  column?: boolean;
  noEdit?: boolean;
  children: any;
}

export default function (props: Props) {
  const [hideEdit, setHideEdit] = useState<boolean>(true);

  const toggleEdit = () => {
    props.toggleEdit();
  };

  const handleMouseEnter = () => {
    setHideEdit(false);
  };

  const handleMouseLeave = () => {
    setHideEdit(true);
  };

  return (
    <Box
      marginBottom={!props.noEdit ? 2 : 0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      display='flex'
    >
      {!props.noEdit || props.column ? (
        <Box
          display='flex'
          mr={3}
          flexDirection={props.column ? 'column' : 'row'}
        >
          <Typography
            variant={props.title ? 'h6' : 'subtitle2'}
            style={{ marginRight: '1em', marginBottom: '0.25em' }}
          >
            {' '}
            {props.label}:
          </Typography>
          <Box display='flex'>
            {props.children}
            <IconButton
              style={{
                visibility: hideEdit || props.noEdit ? 'hidden' : 'visible',
              }}
              size='small'
              onClick={toggleEdit}
            >
              <EditIcon fontSize='small' />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Grid container>
          <Grid item xs={5}>
            <Typography
              variant={props.title ? 'h6' : 'subtitle2'}
              style={{ marginRight: '1em' }}
            >
              {' '}
              {props.label}:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Box display='flex'>
              {props.children}
              <IconButton
                style={{
                  marginLeft: '1em',
                  visibility: hideEdit || props.noEdit ? 'hidden' : 'visible',
                }}
                size='small'
                onClick={toggleEdit}
              >
                <EditIcon fontSize='small' />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
