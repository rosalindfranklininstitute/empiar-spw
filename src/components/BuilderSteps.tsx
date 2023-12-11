import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import DataArrayIcon from '@mui/icons-material/DataArray';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

interface BuilderStepsProps {
    onSelectionChange: (selectedKey: number) => void;
  }

  export default function BuilderSteps(props: BuilderStepsProps) {

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          onClick={() => props.onSelectionChange(0)}
        >
          <DataArrayIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Meta Data
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          onClick={() => props.onSelectionChange(1)}
        >
          <BuildCircleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Workflow Steps
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          onClick={() => props.onSelectionChange(1)}
        >
          <SaveAltIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Review & Submit
        </Link>
      </Breadcrumbs>
    </div>
  );
}