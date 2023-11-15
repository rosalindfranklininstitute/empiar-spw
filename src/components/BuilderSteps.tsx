import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';

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
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Meta Data
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          onClick={() => props.onSelectionChange(1)}
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Workflow Steps
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Review & Submit
        </Typography>
      </Breadcrumbs>
    </div>
  );
}