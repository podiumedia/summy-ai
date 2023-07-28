import React from 'react';
import { Box } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';

const SwipablePage = () => {
  const [index, setIndex] = React.useState(0);

  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        <div style={{ background: 'red', height: '100%', textAlign: 'center' }}>
          Page 1
        </div>
        <div style={{ background: 'green', height: '100%', textAlign: 'center' }}>
          Page 2
        </div>
        <div style={{ background: 'blue', height: '100%', textAlign: 'center' }}>
          Page 3
        </div>
      </SwipeableViews>
    </Box>
  );
};

export default SwipablePage;