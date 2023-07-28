import logo from './logo.svg';
import './App.css';
import React from 'react';
import { ButtonBase, Card, Container, Grid } from '@mui/material';
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
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const botName = "Summy";

const StyledAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const SupportiveAvatar = <Avatar src="/supportive.png" alt="Supportive" />;
const ProfessionalAvatar = <Avatar src="/professional.png" alt="Professional" />;
const CriticalAvatar = <Avatar src="/critical.png" alt="Critical" />;

const characters = {
  "Supportive": SupportiveAvatar,
  "Professional": ProfessionalAvatar,
  "Critical": CriticalAvatar,
}

const charactersSize = (size) =>{
  return {
  "Supportive" :  <Avatar sx={{height:size, width:size}} src="/supportive.png" alt="Supportive" />,
  "Professional": <Avatar sx={{height:size, width:size}} src="/professional.png" alt="Professional" />,
  "Critical": <Avatar  sx={{height:size, width:size}} src="/critical.png" alt="Critical" />
  }
}



const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
    caption:  {
      fontSize: '0.7rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    h5:{
      fontSize: '1rem',
      fontWeight: 700,
      color:"white"
    },
    h6:{
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.66,
    },
    body1:{
      fontSize: '1rem',
      fontFamily: [
        'Open Sans',
        'sans-serif',
      ].join(','),
    },
    subtitle1:{
      fontSize: '1rem',
      fontFamily: [
        'Open Sans',
        'sans-serif',
      ].join(','),
    }
  },

  
  palette: {
    primary: {
      main: '#8a23fe', // Custom primary color
    },
    secondary: {
      main: '#f44336', // Custom secondary color
    },
  },
});

// Custom styles for the Slider
const CustomSlider = muiStyled(Slider)(({ theme }) => ({

  '& .MuiSlider-thumb': {
    height: 25,
    width: 25,
    backgroundColor: '#fff',
    border: `2px solid ${theme.palette.primary.main}`,
    // marginTop: -8,
    // marginLeft: -12,
    // '&:focus, &:hover, &$active': {
    //   boxShadow: 'inherit',
    // },
  },

  '& .MuiSlider-valueLabel': {
    left: 'calc(-50% + 6px)',
  },

  // '& .MuiSlider-track': {
  //   height: 5,
  //   borderRadius: 5,
  // },

  '& .MuiSlider-rail': {
    height: 10,
    borderRadius: 5,
    opacity:1,
    background: 'linear-gradient(to right, #008547, orange, #960000)',
  },
}));


const GlassmorphicContainer = styled.div`
  backdrop-filter: blur(10px);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2, #6B8DD6);
  background-size: 600% 600%;
  animation: gradientAnimation 15s ease infinite;

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const FullPage = styled.div`
height: 100vh;
background-color: #ffffff;
overflow: hidden; 
`;

const myToken = 'apify_api_RtAeagNa528JNr5nr99oQ4iGZGlbHH34vzGy';


function App() {

  const [width, setWidth] = React.useState(window.innerWidth > 600 ? 600 : window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  const handleResize = () => {
    setWidth(window.innerWidth > 600 ? 600 : window.innerWidth);
    setHeight(window.innerHeight);
  };

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

  let scaleFactor = (width/330) < 1.8 ? (width/330) : 1.8;
  let heightFactor = 1.2;

  let panelHeight = document.getElementById("tiktok-embed") ? document.getElementById("tiktok-embed").getBoundingClientRect().height : "100%";


  
  return (
    <div style={{  background: "linear-gradient(210deg, #667eea, #764ba2, #6B8DD6)",
    animation: "gradient 15s ease infinite"}}>
      <div className="container">
    <ThemeProvider theme={theme}>

    <FullPage style={{  
   background: index == 0 ? "white" :
            report.reportsByCharacter[selectedReport].name == "Critical" ? 
            
            "linear-gradient(180deg, #960000, #ff5050, #e35353)" : 
            
            
            report.reportsByCharacter[selectedReport].name == "Professional" ? 
            
            "linear-gradient(135deg, #cd4e00, #f69421, #fc8800)" : 
            
            
            "linear-gradient(135deg, #008547, #19b066, #069c5d)"}}>
       

    <AppBar className="appBar" position="static" sx={{  background: "linear-gradient(135deg, #667eea, #764ba2, #6B8DD6)"
          }}      elevation={0} variant="outlined">
      <Toolbar>
        <img height={40} src={`3/professional.png`}></img>
        
        <Typography variant="h5" style={{letterSpacing:.5}}>
          {botName.toUpperCase()}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* <Typography variant="h6" >
          {report.creator.username}
        </Typography> */}
        AUDIENCE FEEDBACK AI DEMO
      </Toolbar>
    </AppBar>


  
  
    <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>

  
    <div style={{
      margin:"0 auto",
  width:width,
  height:"95vh",
  // height: 722*heightFactor,
  overflowX: "hidden",
}}>
          <SwipeToggle index={index} handleChangeIndex={handleChangeIndex}/>

      <iframe
          id="tiktok-embed"
            title="TikTok Video"
            src={embedUrl}
            frameBorder="0"
            allowFullScreen
            width="100%"
        height={722 * heightFactor}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            //remove scroll bar   
            style={{transform: `scale(${scaleFactor})`, transformOrigin:"top", overflowY:"scroll", overflowX:"hidden"}}
          ></iframe>
  </div> 
    
        <div style={{ margin: "0 auto", width: "100%", height:"95vh",
  overflowX: "hidden"

  
  
  }}>

<SwipeToggle index={index} handleChangeIndex={handleChangeIndex}/>

          <CharacterPicker selectedReport={selectedReport} setSelectedReport={setSelectedReport} characters={characters}/>


          <Card elevation={0} sx={{ p:2, m:1, background:"transparent"}}>

            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "top", width: "100%" }}>

              {charactersSize("3em")[report.reportsByCharacter[selectedReport].name]}
             
              <Box sx={{borderRadius: 2, pl:2}}>
                <Typography variant="h5" style={{lineHeight: 1.3, fontStyle: "italic" }}>

                  {addLineBreaksToSentenceEnds(report.reportsByCharacter[selectedReport].summary)}


                </Typography>
              </Box>

            </Box>

          </Card>



            <Card elevation={0} sx={{p:1, pb:4}}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", m:2 }}>

<Typography variant="h6" align="center" style={{fontStyle: "italic" }}>Top comments that {report.reportsByCharacter[selectedReport].highlightedReason}...</Typography>

</Box>
          <Box sx={{ display: "flex", flexDirection:"column", justifyContent: "center", width:"100%"}} >

          {report.reportsByCharacter[selectedReport].highlightedComments.map((comment, index) =>

            <Box>
              <TikTokComment
                username={comment.uniqueId}
                comment={comment}
                likes={comment.diggCount}
                cid={comment.cid}
                characterAvatar={characters[report.reportsByCharacter[selectedReport].name]}
              />
             
          

            </Box>
          )}

</Box>
</Card>
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
    <div style={{ width: '80%', margin:"0 auto", marginTop:20}}>      

      <Grid container spacing={2} alignItems="center">
      {characterOptions.map((character, index) => (
        <Grid item xs={4}>
           
          <Typography onClick={() => setSelectedReport(index)} color="white" align="center" variant={Object.keys(characters)[selectedReport] == character.label ? "h6" : "subtitle1"}
          style={{fontWeight: Object.keys(characters)[selectedReport] == character.label ? 700 : null}}
          
          >
        
          {character.label}
       
          </Typography>
     
          </Grid>
      ))}
        </Grid>

      <div style={{width:"70%", margin:"0 auto"}}>
      <CustomSlider
        value={selectedReport}
        onChange={handleCharacterChange}
        step={1}
        marks
        min={0}
        max={2}
        track={false}
        valueLabelFormat={valueLabelFormat}
        sx={{
          '& .MuiSlider-thumb': {
            backgroundColor: '#ffffff', // Set thumb color to transparent
            boxShadow: 'none', // Remove thumb shadow
          },
          '& .MuiSlider-track': {
            backgroundColor: '#ffffff', // Set track color to transparent
          },
        }}
      />
      </div>
    </div>
  );
};

const SwipeToggle = (props) => {
  const { index, handleChangeIndex } = props;

  return (
    <Box sx={{ position:"relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", mt:1, mb:1}}>
      {index == 0 ?
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%" }}>
    <ButtonBase onClick={() => handleChangeIndex(index + 1)} sx={{ml:1, mr:1}}>
        

        <img height={30} style={{margin:5}} src="professional.png"/>

        <Typography variant="h6" style={{ fontStyle: "italic", fontWeight:700 }}>{botName} read your comments...</Typography>

      <IconButton onClick={() => handleChangeIndex(index + 1)}>
        <ArrowForwardIos/>
      </IconButton>
      </ButtonBase>
      </Box>


  :  
  <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%" }}>
    <ButtonBase onClick={() => handleChangeIndex(index - 1)} sx={{ml:1, mr:1}}>
  <IconButton onClick={() => handleChangeIndex(index - 1)}>
        <ArrowBackIos />
      </IconButton>
  <Typography variant="h6" style={{ fontStyle: "italic", fontWeight:700 }}>Back to TikTok</Typography>
  </ButtonBase>

  </Box>
}

    </Box>
    
    
  );
};


function addLineBreaksToSentenceEnds(text) {
  // Use a regular expression to find sentence-ending punctuation and add a line break
  const stringWithLineBreaks = text.replace(/([.!?])\s/g, "$1\n\n");


  const processedText = stringWithLineBreaks.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      <span style={{fontSize:index==0 ? "1.4rem" : null}}>{line}</span>
      {/* {line} */}
      <br />
    </React.Fragment>
  ));


  return processedText;
}



export default App;
