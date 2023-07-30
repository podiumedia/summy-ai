import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, ButtonBase } from '@mui/material';
import { Comment, FavoriteBorder, Reply, Send, SendToMobile } from '@mui/icons-material';

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
  const { username, comment, timestamp, avatar, likes, report, character, characterEmojis, botName } = props;

  return (
      <TikTokCommentCard elevation={0}>

        
              <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'top', p:2 }}>

                  <CircularAvatar><Comment/></CircularAvatar>

        
                  <Box sx={{ display: 'flex', flexDirection: "column", justifyContent:"flex-start"}}>

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

                              <Box sx={{ display: "flex", flexDirection:"column", alignItems: "top", mt:2, ml:2}}>

                                        <Box>
                                          <Typography variant="h6"  sx={{letterSpacing:"-2px", pl:1}}>
                                    <b>{botName.toUpperCase()}</b>&nbsp;&nbsp;{characterEmojis[character]}
                                    </Typography>
                                    </Box>

                                    <Card elevation={0} sx={{background:"#eee", borderRadius:3, p:1}}>
                                    <Typography variant="body1" component="p">
                                      
                                      <CommentSummary text={comment.commentSummary}/></Typography>
                            
                                    </Card>
                                
                                    

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

     

             

              <Box sx={{display:"flex", width:"100%", mt:1}}>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button endIcon={<SendToMobile/>} onClick={() => window.open(comment.videoWebUrl + "#:~:text=" + comment.text, "_blank")}
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
  

  function CommentSummary(props) {
    // Use a regular expression to find sentence-ending punctuation and add a line break
    const stringWithLineBreaks = props.text.replace(/([.!?])\s/g, "$1\n\n");
    const length = stringWithLineBreaks.split('\n').length;
  
    const [more, setMore] = React.useState(false);
  
    React.useEffect(() => {
      setMore(false);
    }, [props.text])
  
    return(
      <>
      {stringWithLineBreaks.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        <span style={{ display: index == 0 || more ? "inline" : "none"}}>{line}
        {index == 0 && !more && length > 1 ? <span onClick={() => setMore(!more)}>.. <span style={{fontWeight:700, color:"#666",  cursor:"pointer"}}>more</span></span> : " "}
        </span>
      </React.Fragment>


 
      ))}

    {more ? <span onClick={() => setMore(!more)}><span style={{fontWeight:700, color:"#666",  cursor:"pointer"}}>less</span></span> : null}

      </>
    
    )}

export default TikTokComment;
