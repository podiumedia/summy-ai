import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import CommentCard from './CommentCard';

function Summary({ username, comments }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total Comments: {comments.length}
        </Typography>
        <div>
          {comments.map((comment, index) => (
            <CommentCard key={index} comment={comment} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Summary;