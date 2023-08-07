import './App.css';
import React from 'react';
import { ButtonBase, Card, Container, Divider, Grid } from '@mui/material';
import Summary from './Summary';
import ReactPlayer from 'react-player';
import report from './testreport.json';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography, Slider, Box } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TikTokComment from './TikTokComment';
import { Avatar } from '@mui/material';
import { responsiveProperty } from '@mui/material/styles/cssUtils';
import SwipeableViews from 'react-swipeable-views';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Preview } from '@mui/icons-material';
import '@fontsource/poppins'; // Import the Poppins font
import '@fontsource/poppins/700.css'; // Import the Poppins font

import '@fontsource/open-sans'; // Import the Open Sans font
import '@fontsource/open-sans/700.css'; // Import the Open Sans font

import '@fontsource-variable/red-hat-display'; // Import the Red Hat Display font
// import '@fontsource/questrial/700.css';


const botName = "SUMMY";


const characterEmojis = {
  "Supportive": "😊", 
  "Professional": "🤓",
  "Critical": "😪"
};


const theme = createTheme({
  typography: {
    fontFamily: [
      "Red Hat Display Variable",
      'sans-serif',
    ].join(','),
    caption: {
      fontSize: '0.7rem',
      lineHeight: 1.66,
    },
    h4: {
      fontSize: '1.3rem',
      fontWeight: 700,
      letterSpacing: "-2px",
      color:"#222",
    },
    h5: {
      fontSize: '1.4rem',
      color:"#222",
      fontWeight: 900,
    },
    h6: {
      fontSize: '1.4rem',
      fontWeight: 900,
      color:"#005AE0"
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.66,
    },
    body1: {
      fontSize: '1.2rem',
      fontFamily: [
        "Red Hat Display Variable",
        'sans-serif',
      ].join(','),
      color:"#222"
    },
    subtitle1: {
      fontSize: '1rem',
      fontFamily: [
        "Red Hat Display Variable",
        'sans-serif',
      ].join(','),
    }
  },


  palette: {
    primary: {
      main: '#005AE0', // Custom primary color
    },
    secondary: {
      main: '#B7FF70', // Custom secondary color
    },
  },
});


const StyledButton = muiStyled(ButtonBase)(({ theme }) => ({
  borderRadius:30,
  background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.secondary.main})`,
  fontFamily: [
    "Red Hat Display Variable",
    'sans-serif',
  ].join(','),
  fontSize: '1rem',
  fontWeight : 900,
  // letterSpacing:".5px",
  color: theme.palette.primary.main,
  padding: "15px 0px",
  width: "100%",
  boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.4)',
}));

const NamePlate = muiStyled(Typography)(({ theme }) => ({
  borderRadius:30,
  background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.secondary.main})`,
  fontFamily: [
    "Red Hat Display Variable",
    'sans-serif',
  ].join(','),
  fontSize: '1rem',
  fontWeight : 900,
  // letterSpacing:".5px",
  color: theme.palette.primary.main,
  padding: "15px 0px",
  width: "100%",
}));

// Custom styles for the Slider
const CustomSlider = muiStyled(Slider)(({ theme }) => ({

  '& .MuiSlider-thumb': {
    height: 30,
    width: 30,
    backgroundColor: '#fff',
    border: `4px solid ${theme.palette.primary.main}`,
    // marginTop: -8,
    // marginLeft: -12,
    // '&:focus, &:hover, &$active': {
    //   boxShadow: 'inherit',
    // },
  },

  '& .MuiSlider-valueLabel': {
    left: 'calc(-50% + 6px)',
    background:"transparent",
  },

  // '& .MuiSlider-track': {
  //   height: 5,
  //   borderRadius: 5,
  // },

  '& .MuiSlider-rail': {
    height: 25,
    borderRadius: 30,
    opacity: 1,
    background: 'linear-gradient(to right, #B7FF70, #FFEC3E, #FF7A7A)',
  },
}));

const FullPage = styled.div`
height: 100vh;
background-color: #fefefe;
overflow: hidden; 
position: static;
`;

const myToken = 'apify_api_RtAeagNa528JNr5nr99oQ4iGZGlbHH34vzGy';


function App() {

  const [width, setWidth] = React.useState(window.innerWidth > 600 ? 600 : window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  const handleResize = () => {
    setWidth(window.innerWidth > 600 ? 600 : window.innerWidth);
    setHeight(window.innerHeight);
  };

  const [touchStart, setTouchStart] = React.useState(null)
const [touchEnd, setTouchEnd] = React.useState(null)

// the required distance between touchStart and touchEnd to be detected as a swipe
const minSwipeDistance = 50 

const onTouchStart = (e) => {
  console.log('touchstart', e.targetTouches[0].clientX);
  setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
  setTouchStart(e.targetTouches[0].clientX);
}

const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

const onTouchEnd = () => {
  if (!touchStart || !touchEnd) return
  const distance = touchStart - touchEnd;
  const isLeftSwipe = distance > minSwipeDistance;
  const isRightSwipe = distance < -minSwipeDistance;
  if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
  handleChangeIndex(isLeftSwipe ? 1 : 0);
}


  const [index, setIndex] = React.useState(0);

  const handleChangeIndex = (index) => {
    setIndex(index);
  };


  const [selectedReport, setSelectedReport] = React.useState(0);

  const embedUrl = `https://www.tiktok.com/embed/v2/${report.videoId}`;


  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, []);

  let scaleFactor = (width / 330) < 1.4 ? (width / 330) : 1.4;
  let heightFactor = .8;

  return (
    <div style={{
      background: "linear-gradient(210deg, #667eea, #764ba2, #6B8DD6)",
      animation: "gradient 15s ease infinite"
    }}>
      <div className="container">
        <ThemeProvider theme={theme}>

          <FullPage>


            {/* <AppBar className="appBar" position="static" sx={{
             background:"transparent"
            }} elevation={0} variant="outlined">
              <Toolbar>
                <Typography variant="h4">
               
                  {botName}

                  <span style={{marginLeft:5,position:"relative", fontSize:"1.5rem"}}>
                    {Object.keys(characterEmojis).map((emoji, index) =>

                      <span style={{ left: index*12, position: "absolute",
                        display: 'inline-block', zIndex:100/(index+1)}}>{characterEmojis[emoji]}</span>
                    )}
                  </span>


                </Typography>
                <Box sx={{ flexGrow: 1 }} />
     
        <Typography variant="body1" >
               COMMENTS SUMMARY DEMO
        </Typography>
              </Toolbar>
            </AppBar> */}

            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", pt:5}}>
              <img src={process.env.PUBLIC_URL + "/siftsy_logo.png"} alt="image" style={{ height: 50 }} />
            </Box>



            <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>




              <div 
              style={{
                margin: "0 auto",
                width: width,
                height: "95vh",
                // height: 722*heightFactor,
                overflow: "hidden",
                zIndex:5,
              
                
              }}>

              {/* <div style={{position:"absolute", top:0, left:0, width: width, height:"fit-content", zIndex:10, cursor:"pointer", 
            }} onClick={() => handleChangeIndex(index == 0 ? 1 : 0)}>
              
              <PreviewSummary text={report.reportsByCharacter[selectedReport].summary} index={index} handleChangeIndex={handleChangeIndex} botName={botName} report={report} selectedReport={selectedReport} characterEmojis={characterEmojis} />
              </div> */}




                <div style={{width: "fit-content", height:722 * heightFactor, zIndex:10, borderRadius:20, overflow:"hidden", margin:"0 auto"}}>

                <iframe

                  src={embedUrl}
                  frameBorder="0"
                  allowFullScreen
                  width="100%"
                  height={722 * heightFactor}
                  //remove scroll bar   
                  scrolling="no"
                  style={{ 
                    
                    // transform: `scale(${scaleFactor})`, transformOrigin: "top", 
                  
                  
                    overflow:"hidden"    }}
                ></iframe>

              </div>




            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", p:5}}>
              <StyledButton variant="contained" onClick={() => handleChangeIndex(index == 0 ? 1 : 0)}>{index == 0 ? "Siftsy My Comments" : "View Summary"}</StyledButton>
            </Box>

              <Box>
              <SwipeToggle index={index} handleChangeIndex={handleChangeIndex} />

         
              </Box>
              </div>

              <div style={{
                margin: "0 auto", width: "100%", height: "95vh",
                overflowX: "hidden"

              }}>


                <CharacterPicker selectedReport={selectedReport} setSelectedReport={setSelectedReport} characters={characterEmojis} />


                <Card elevation={0} sx={{ p: 2, m: 1, background: "transparent" }}>

                  <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "top", width: "100%" }}>

                    

                    <Typography variant="h6" align="left">TL;DR </Typography>

                    <Card elevation={0} sx={{ borderRadius: 2, background:"#eee", p:3}}>
                      <Typography variant="body1">

                        <MainSummary text={report.reportsByCharacter[selectedReport].summary} />


                      </Typography>
                    </Card>

                  </Box>

                </Card>

                <Divider variant="middle"/>

                <Card elevation={0} sx={{pt:2}}>
                 
                 
                 
                  <Box sx={{ display: "flex", justifyContent: "flex-start", flexDirection:"column", alignItems: "center", width:"100%" }}>
             

                  <Box sx={{justifyContent:"flex-start", display:"flex", width:"100%"}}>

                  <Box>

                  <Typography variant="h6" align="left" sx={{ml:4,mr:4}}>COMMENTS </Typography>
               

                <Card elevation={0} sx={{ p:1, mr:3, ml:3 }}>
              
                    <Typography variant="body1" component="p" align="left" >{`Here are the top comments that ${report.reportsByCharacter[selectedReport].highlightedReason}... `}
                                        
                    </Typography>
               
                </Card>

                </Box>


                </Box>

                    <Box sx={{mt:1}}>
                    <Typography variant="caption" align="center" >{`${report.reportsByCharacter[selectedReport].highlightedComments.length} Comment${report.reportsByCharacter[selectedReport].highlightedComments.length > 1 ? "s" : ""}`}</Typography>
                    </Box>
              

                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }} >

                    {report.reportsByCharacter[selectedReport].highlightedComments.map((comment, index) =>

                      <Box>
                        <TikTokComment
                          username={comment.uniqueId}
                          comment={comment}
                          likes={comment.diggCount}
                          cid={comment.cid}
                          character={report.reportsByCharacter[selectedReport].name}
                          characterEmojis={characterEmojis}
                          botName={botName}
                        />

                      <Divider variant="middle"/>


                      </Box>
                    )}
           
                    <SwipeToggle index={index} handleChangeIndex={handleChangeIndex} />
                    <br/>

                  </Box>
                </Card>


                <SwipeToggle index={index} handleChangeIndex={handleChangeIndex} />

              
              </div>


            </SwipeableViews>


          </FullPage>
        </ThemeProvider>
      </div></div>
  );
}


const characterOptions = report.reportsByCharacter.map((report, index) => ({
  value: index,
  label: report.name,
}));


const CharacterPicker = (props) => {
  const { selectedReport, setSelectedReport, characters } = props;

  const handleCharacterChange = (_, newValue) => {
    setSelectedReport(newValue);
  };

  const valueLabelFormat = (index) => characterOptions[index].label;

  return (
    <div style={{ width: '90%', margin: "0 auto", marginTop: 20, cursor:"pointer" }}>

      <Grid container spacing={2} alignItems="center">
        {characterOptions.map((character, index) => (
          <Grid item xs={4}>

            <Typography color="primary" align="center" onClick={() => setSelectedReport(index)} variant={Object.keys(characters)[selectedReport] == character.label ? "h6" : "subtitle1"}
              style={{ fontWeight: Object.keys(characters)[selectedReport] == character.label ? 900 : 700 }}

            >

            <div style={{fontSize: "1.8em"}}>{characters[character.label]}</div> 
            

              {character.label}

            </Typography>

          </Grid>
        ))}
      </Grid>

      <div style={{ width: "70%", margin: "0 auto", paddingTop:"10px" }}>
        <CustomSlider
          value={selectedReport}
          onChange={handleCharacterChange}
          step={1}
          
          min={0}
          max={2}
          track={false}
          valueLabelFormat={valueLabelFormat}
        
        />
      </div>
    </div>
  );
};

const SwipeToggle = (props) => {
  const { index, handleChangeIndex } = props;

  return (
    <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", mt: 1, mb: 1 }}>
      {index == 0 ?
        // <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%" }}>
        //   <ButtonBase onClick={() => handleChangeIndex(index + 1)} sx={{ ml: 1, mr: 1 }}>

        //     <Typography variant="h6"><span style={{ fontWeight: 700,letterSpacing:"-2px" }}>{botName.toUpperCase()}</span> read these comments...</Typography>

        //     <IconButton onClick={() => handleChangeIndex(index + 1)}>
        //       <ArrowForwardIos />
        //     </IconButton>
        //   </ButtonBase>
        // </Box>
          null

        :
        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%" }}>
          <ButtonBase onClick={() => handleChangeIndex(index - 1)} sx={{ ml: 1, mr: 1 }}>
            <IconButton onClick={() => handleChangeIndex(index - 1)}>
              <ArrowBackIos />
            </IconButton>
            <Typography variant="h6">Back</Typography>
          </ButtonBase>

        </Box>
      }

    </Box>


  );
};

function PreviewSummary(props) {

  const { botName, report, selectedReport, characterEmojis, handleChangeIndex, index, text } = props;

  return (
    <Box sx={{display:"flex", flexDirection:"row", m:1,  alignItems:"center", justifyContent:"flex-end"}} >

    <Box sx={{maxWidth:"80%", overflow:"hidden"}}>
    <Typography variant="h6" align="left" sx={{letterSpacing:"-2px", pl:2, color:"white"
  }} ><b>{botName.toUpperCase()}</b>&nbsp;&nbsp;{characterEmojis[report.reportsByCharacter[selectedReport].name]} 
  
  <span style={{letterSpacing:0, fontSize:".9rem"}}>
  &nbsp; read your comments...
  </span>
  
  </Typography>

    <div style={{ backdropFilter:"blur(10px)", borderRadius:"10px"}}>
    <Card elevation={0} sx={{ borderRadius: 2, background:"#eee", p:2, opacity:.7}}>
      <Typography variant="body1" whiteSpace="nowrap" rows={2} align="left" overflow="hidden" textOverflow="ellipsis" sx={{opacity:1, fontWeight:600}}>
            
            {text}

           
  
  </Typography>
    </Card>
    </div>
    </Box>
    <Box>
    <IconButton onClick={() => handleChangeIndex(1)}>
              <ArrowForwardIos sx={{fill:"white"}}/>
            </IconButton>
            </Box>
    </Box>

  );

      }

function MainSummary(props) {
  // Use a regular expression to find sentence-ending punctuation and add a line break
  const stringWithLineBreaks = props.text.replace(/([.!?])\s/g, "$1\n\n");

  const [more, setMore] = React.useState(false);

  React.useEffect(() => {
    setMore(false);
  }, [props.text])

  return(
    <>
    {stringWithLineBreaks.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      <span style={{ display: index == 0 || more ? "inline" : "none",
        
        // fontSize: index == 0 ? "1.4rem" : null 
        
        }}>{line}
       {index == 0 && !more ? <span onClick={() => setMore(!more)}>.. <span style={{fontWeight:900, color:"#333", cursor:"pointer"}}>more</span></span> : " "}
      <br />
      </span>
    </React.Fragment>
  ))}
  
  {more ? 
  
  <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%"}}>
    <Box sx={{flexGrow:1}}/>
  <span onClick={() => setMore(!more)}><br/><span style={{fontWeight:900, color:"#333",  cursor:"pointer"}}>less</span></span> 
  </Box> : null}
 
  </>
  
  )}


  




export default App;
