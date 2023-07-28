import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function CommentCard({ comment }) {
  return (
    <Card variant="outlined" style={{ margin: '8px 0' }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comment}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CommentCard;