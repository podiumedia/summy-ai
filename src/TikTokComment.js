import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { Comment, FavoriteBorder, Reply } from '@mui/icons-material';

const TikTokCommentCard = styled(Card)(({ theme }) => ({
  width:"100%",
  background:"transparent",
  margin: '0 auto',
  '& .MuiCardHeader-avatar': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const CircularAvatar = styled(Avatar)({
    borderRadius: '50%',
    marginRight:"10px",
    marginTop:"5px"
  });
  

const TikTokComment = (props) => {
  const { username, comment, timestamp, avatar, likes, report, characterAvatar } = props;

  return (
      <TikTokCommentCard elevation={0}>

        
              <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'top', mb: 1, p:2 }}>

                  <CircularAvatar><Comment/></CircularAvatar>

        
                  <Box sx={{ display: 'flex', flexDirection: "column", justifyContent:"flex-start", alignItems: 'center', mb: 1}}>

                  <Box sx={{width:"100%" }}>
                          <Typography variant="h6">
                              {username}
                          </Typography>
                          </Box>
                      

                      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "top"}}>
                         
                          <Box sx={{ display:"flex", flexDirection:"column", justifyContent: "flex-start" }}>
                              <Typography variant="body1" component="p">
                                  {comment.text}
                              </Typography>

                              <Box sx={{ display: "flex", flexDirection:"row", alignItems: "top", mt:3, mb:2}}>

                                        <Box sx={{mr:1}}>
                                    {characterAvatar}
                                    </Box>
                                    <Typography variant="body1" component="p">{addLineBreaksToSentenceEnds(comment.commentSummary)}</Typography>
                            
                                
                                    

                                </Box>
                            
                              {/* <Typography variant="caption" color="textSecondary" component="p">
                          {timestamp}
                      </Typography> */}
                          </Box>


                          <Box sx={{ flexGrow: 1 }} />

                          <Box sx={{ display:"flex", justifyContent: "flex-end" }}>

                              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", ml:2 }}>
                                  <FavoriteBorder style={{ color: "#999" }} />                                 
                                 <Typography variant="caption" color="textSecondary">{likes}</Typography> 
                              </Box>
                          </Box>
                  </Box>

     

             

              <Box sx={{display:"flex", width:"100%"}}>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button endIcon={<Reply/>} onClick={() => window.open(comment.videoWebUrl, "_blank")}
                    sx={{color:"#666", textTransform:"none"}}
                     size="small">Go To Comment</Button>
                </Box>

              </Box>                  
              

              </Box>




            
      </TikTokCommentCard>
  );
};


function addLineBreaksToSentenceEnds(text) {
    // Use a regular expression to find sentence-ending punctuation and add a line break
    const stringWithLineBreaks = text.replace(/([.!?])\s/g, "$1\n\n");
  
  
    const processedText = stringWithLineBreaks.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  
  
    return processedText;
  }
  

export default TikTokComment;
