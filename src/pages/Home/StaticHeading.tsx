import { Typography } from '@mui/material';

const StaticHeading = () => {
  return (
    <div className="row">
      <Typography className="row-item" variant="h6">
        ID
      </Typography>
      <Typography className="row-item" variant="h6">
        Name
      </Typography>
      <Typography className="row-item" variant="h6">
        Address
      </Typography>
      {/* <Typography className="row-item" variant="h6">
        Last Name
      </Typography> */}
      <Typography className="row-item" variant="h6">
        Email
      </Typography>
      <Typography className="row-item" variant="h6">
        Rate Per Hour
      </Typography>
      <Typography className="row-item" variant="h6">
        Hours
      </Typography>
      <Typography className="row-item" variant="h6">
        Total
      </Typography>
      <Typography className="row-item" variant="h6">
        Start Date
      </Typography>
      <Typography className="row-item" variant="h6">
        End Date
      </Typography>
      <Typography className="row-item" variant="h6">
        Days
      </Typography>
      <Typography className="row-item" variant="h6">
        Actions
      </Typography>
    </div>
  );
};

export default StaticHeading;
