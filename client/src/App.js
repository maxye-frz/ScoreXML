import UploadDialog from './components/UploadDialog';
import OSMD from './components/OSMD';
import BackgroundColorPicker from './components/BackgroundColorPicker';
import NoteHeadColorPicker from './components/NoteHeadColorPicker';
import Hint from './components/Hint'
import { jsPDF } from 'jspdf';
import 'svg2pdf.js';
import React, { useState, useEffect } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Divider from '@material-ui/core/Divider';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import MuiInput from '@material-ui/core/Input';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import PanToolIcon from '@material-ui/icons/PanTool';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import HelpIcon from '@material-ui/icons/Help';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import GitHubIcon from '@material-ui/icons/GitHub';
import ShareIcon from '@material-ui/icons/Share';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Link from '@mui/material/Link';
import * as ScoreApi from './api/ScoreApi.js';
import { useParams } from "react-router-dom";
require("dotenv").config();

const BASE_URL = process.env.REACT_APP_BASE_URL;
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1,
    position: 'sticky',
    top: 0,
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
  customizeToolbar: {
    minHeight: '40px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    textTransform: 'none'
  },
  title: {
    marginRight: 18,
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  canvas: {
    height: '100%',
    width: '100%',
    overflowX: 'auto',
    overflowY: 'auto',
  },
  toggleButton: {
    border: 'none',
    padding: 6,
    margin: theme.spacing(0.5),
  },
  measureTextField: {
    width: 50,
  },
  zoomTextField: {
    width: 80,
  },
  input: {
    padding: "10px 14px"
  },
  tooltip: {
    fontSize: "0.8em",
  },
}));

const NumInput = styled(MuiInput)`
  width: 40px;
`;

const Input = styled(MuiInput)`
  width: 42px;
`;


export default function App() {


  const classes = useStyles();

  const { shareId } = useParams();

  // file state
  const [file, setFile] = useState('');

  const [fileName, setFileName] = useState('');
  const handleFileChange = (f, name) => {
    setFile(f);
    setFileName(name);
    setUploadDialogOpen(false);
  }

  const getScore = (db_id) => {
    // console.log("id: ", db_id);
    ScoreApi.get(db_id).then((m) => {
      // console.log(m);
      setFileName(m.name);
      setFile(m.musicxml);
    })
  }

  if (shareId) {
    getScore(shareId);
  }

  const [id, setId] = useState('');

  // upload dialog state
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleClickUploadDialogOpen = () => {
    setUploadDialogOpen(true);
  };

  const handleUploadDialogClose = (value) => {
    setUploadDialogOpen(false);
  };

  //save pdf
  const handleSavePDF = () => {
    const osmdCanvas = document.getElementById('osmdCanvas');
    // console.log(osmd);
    const svgElement = osmdCanvas.getElementsByTagName('svg').item(0);
    const width = svgElement.width.baseVal.value;
    const height = svgElement.height.baseVal.value;
    // console.log(width, height);
    const pdf = new jsPDF(width > height ? 'l' : 'p', 'pt', [width, height]);
    // console.log(fileName);
    pdf.svg(svgElement, {}).then(() => { pdf.save(fileName + ".pdf") });
  }

  // share dialog state
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const handleClickShareDialogOpen = () => {
    setShareDialogOpen(true);
  }

  const handleShareDialogClose = () => {
    setShareDialogOpen(false);
  }

  // help dialog state
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  const handleClickHelpDialogOpen = () => {
    setHelpDialogOpen(true);
  }

  const handleHelpDialogClose = () => {
    setHelpDialogOpen(false);
  }

  const uploadScore = () => {
    ScoreApi.create(fileName[0], file).then((m) => {
      // console.log(m._id);
      setId(m._id);
    })
      .then(() => {
        handleClickShareDialogOpen();
      })
  };

  const handleGitHub = () => {
    window.open(GITHUB_URL, '_blank');
  }


  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const handleChangeBackgroundColor = (color) => {
    setBackgroundColor(color);
  }

  const [noteHeadColor, setNoteHeadColor] = useState('#000000');
  const handleChangeNoteHeadColor = (color) => {
    setNoteHeadColor(color);
  }

  // zoom state
  const [zoom, setZoom] = useState(100);
  const handleIncrement = () => {
    setZoom(zoom + 20);
  };
  const handleDecrement = () => {
    if (zoom >= 20) {
      setZoom(zoom - 20);
    }
  };
  const changeZoom = (e) => {
    if (e.target.value === '') {
      e.target.value = '0';
    }
    const number = parseInt(e.target.value);
    if (number >= 0) {
      setZoom(number);
    }
  }

  const [thickness, setThickness] = useState({
    selected: 'staff width',
    staffWidth: 6,
    staffDistance: 1,
    ledgerWidth: 4,
    stemWidth: 3
  })

  const handleFieldChange = (e => {
    const { target } = e;
    setThickness(thickness => ({
      ...thickness,
      selected: target.value
    }))
  })

  const staffWidthArr = [0.01, 0.02, 0.04, 0.06, 0.08, 0.1, 0.15, 0.2, 0.25, 0.3]
  const staffDistanceArr = [5, 8, 12, 18, 25, 30, 35, 40, 45, 50]
  const ledgerWidthArr = [0.3, 0.5, 0.7, 1, 1.5, 2, 2.5, 3, 3.5, 4]
  const stemWidthArr = [0.01, 0.02, 0.05, 0.08, 0.1, 0.12, 0.15, 0.2, 0.25, 0.3]

  const sliderValue = (field) => {
    if (field === 'staff width') {
      return thickness.staffWidth
    }
    if (field === 'staff distance') {
      return thickness.staffDistance
    }
    if (field === 'ledger width') {
      return thickness.ledgerWidth
    }
    if (field === 'stem width') {
      return thickness.stemWidth
    }
  }

  const handleSliderChange = (event, newValue) => {
    if (thickness.selected === 'staff width') {
      setThickness(thickness => ({
        ...thickness,
        staffWidth: newValue
      }));
    }
    if (thickness.selected === 'staff distance') {
      setThickness(thickness => ({
        ...thickness,
        staffDistance: newValue
      }));
    }
    if (thickness.selected === 'ledger width') {
      setThickness(thickness => ({
        ...thickness,
        ledgerWidth: newValue
      }));
    }
    if (thickness.selected === 'stem width') {
      setThickness(thickness => ({
        ...thickness,
        stemWidth: newValue
      }));
    }
  };

  const handleThicknessInputChange = (event) => {
    if (thickness.selected === 'staff width') {
      setThickness(thickness => ({
        ...thickness,
        staffWidth: event.target.value === '' ? '' : Number(event.target.value)
      }));
    }
    if (thickness.selected === 'staff distance') {
      setThickness(thickness => ({
        ...thickness,
        staffDistance: event.target.value === '' ? '' : Number(event.target.value)
      }));
    }
    if (thickness.selected === 'ledger width') {
      setThickness(thickness => ({
        ...thickness,
        ledgerWidth: event.target.value === '' ? '' : Number(event.target.value)
      }));
    }
    if (thickness.selected === 'stem width') {
      setThickness(thickness => ({
        ...thickness,
        stemWidth: event.target.value === '' ? '' : Number(event.target.value)
      }));
    }
  };

  const handleBlur = () => {
    if (sliderValue(thickness.selected) < 1) {
      handleSliderChange(null, 1);
    } else if (sliderValue(thickness.selected) > 10) {
      handleSliderChange(null, 10);
    }
  };


  const [autoColoring, setAutoColoring] = useState(0);
  const handleAutoColoring = () => { setAutoColoring(2 - autoColoring) };

  const [presetColors, setPresetColors] = useState("1");
  const handleSetPresetColors = (e) => {
    setPresetColors(e.target.value);
    setPresetBackgoundColors(e.target.value);
    setPresetNoteHeadColors(e.target.value);
  }

  const setPresetBackgoundColors = (val) => {
    if (val === "1") {
      setBackgroundColor('#FFFFFF');
    } else if (val === "2") {
      setBackgroundColor('#f1e5dc');
    } else if (val === "3") {
      setBackgroundColor('#DCE8F1');
    } else if (val === "4") {
      setBackgroundColor('#FFFFFF');
      setZoom(150);
      setDrawMeasureInterval(4);
      setDrawMeasureStart(false);
    } else if (val === "5") {
      setBackgroundColor('#FFFFFF');
      setZoom(120);
      setDrawMeasureStart(true);
      setFingeringPosition("above");
      setThickness(thickness => ({
        staffWidth: 3,
        staffDistance: 1,
        ledgerWidth: 5,
        stemWidth: 6
      }));
    }
  }


  const setPresetNoteHeadColors = (val) => {
    if (val === "1") {
      setNoteHeadColor('#000000');
    } else if (val === "2") {
      setNoteHeadColor('#000000');
    } else if (val === "3") {
      setNoteHeadColor('#000000');
    } else if (val === "4") {
      setNoteHeadColor('#000000');
    } else if (val === "5") {

    }
  }

  const [font, setFont] = useState("Times New Roman");
  const handleFontChange = (event) => {
    setFont(event.target.value);
  };

  const [isBold, setIsBold] = useState(0);
  const handleBold = () => { setIsBold(1 - isBold) };

  const [drawFingerings, setDrawFingerings] = useState(true);
  const handleDrawFingerings = () => {
    setDrawFingerings(!drawFingerings);
    setExpandFingerings(drawFingerings);
  }

  const [expandFingerings, setExpandFingerings] = useState(true);
  const handleExpandFingerings = () => {
    setExpandFingerings(!expandFingerings);
  }

  const [fingeringPosition, setFingeringPosition] = useState("below");
  const handleSetFingeringPosition = (e) => {
    setFingeringPosition(e.target.value);
    setDrawFingerings(true);
    setExpandFingerings(false);
  }

  const [isFlatBeam, setIsFlatBeam] = useState(false);
  const handleIsFlatBeam = () => {
    setIsFlatBeam(!isFlatBeam);
  }

  const [drawMeasureStart, setDrawMeasureStart] = useState(false);
  const handleDrawMeasureStart = () => {
    setDrawMeasureStart(!drawMeasureStart);
  }

  const [drawMeasureInterval, setDrawMeasureInterval] = useState(1);
  const handleDrawMeasureInterval = (e) => {
    setDrawMeasureInterval(parseInt(e.target.value));
  }


  const [singleHorizontal, setSingleHorizontal] = useState(false);
  const handleSingleHorizontal = () => {
    setSingleHorizontal(!singleHorizontal);
    setBackgroundColor('#FFFFFF');
  }

  const [osmd, setOsmd] = useState(new window.opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas", { backend: "svg", autoResize: true }));

  function valuetext(value) {
    return `${value}`;
  }


  return (
    <div>
      <AppBar position="static" color="default" className={classes.appBar}>

        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ScoreXML
          </Typography>
          <Button
            color="primary"
            onClick={handleClickUploadDialogOpen}
            className={classes.menuButton}
            startIcon={<CloudUploadIcon />}
            size='large'
          >
            Import
          </Button>
          <UploadDialog
            open={uploadDialogOpen}
            onClose={handleUploadDialogClose}
            onUploadChange={handleFileChange}
          />
          <Button
            color="primary"
            onClick={handleSavePDF}
            className={classes.menuButton}
            startIcon={<PictureAsPdfIcon />}
            size='large'
          >
            Save
          </Button>
          <Button
            color="primary"
            // onClick={handleClickShareDialogOpen}
            onClick={uploadScore}
            className={classes.menuButton}
            startIcon={<ShareIcon />}
            size='large'
          >
            Share
          </Button>
          <Dialog
            open={shareDialogOpen}
            onClose={handleShareDialogClose}
            fullWidth
            maxWidth="md"
            fullHeight
            minHeight="md"
          >
            <DialogTitle >Share and embed</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1">
                The following links are valid for 30 days.
              </Typography>
              <List>
                <ListItem>
                  <Tooltip classes={{ tooltip: classes.tooltip }} title="copy to clipboard" arrow={true}>
                    <ListItemButton
                      onClick={() => { navigator.clipboard.writeText(BASE_URL + '/' + id) }}
                    >
                      <ListItemText primary={BASE_URL + '/' + id} />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
                <Divider />
                <ListItem>
                  <Tooltip classes={{ tooltip: classes.tooltip }} title="copy to clipboard" arrow={true}>
                    <ListItemButton
                      onClick={() => { navigator.clipboard.writeText('<iframe src="' + BASE_URL + '/' + id + '" width="100%" height="100%" frameBorder="0" allowfullscreen></iframe>') }}
                    >
                      <ListItemText primary={'<iframe src="' + BASE_URL + '/' + id + '" width="100%" height="100%" frameBorder="0" allowfullscreen></iframe>'} />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>

                <iframe src={BASE_URL + '/' + id} position="relative" width="100%" height="500" />
              </List>

            </DialogContent>
          </Dialog>
          <Button
            color="primary"
            onClick={handleGitHub}
            className={classes.menuButton}
            startIcon={<GitHubIcon />}
            size='large'
          >
            GitHub
          </Button>
          <Button
            color="primary"
            onClick={handleClickHelpDialogOpen}
            className={classes.menuButton}
            startIcon={<HelpIcon />}
            size='large'
          >
            About
          </Button>
          <Dialog
            open={helpDialogOpen}
            onClose={handleHelpDialogClose}
            fullWidth
            maxWidth="md"
            fullHeight
            minHeight="md"
          >
            <DialogTitle >About</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1">
                ScoreXML is developed by Nanxi Ye, advised by 
                <Link href="https://agustinmuriago.com/" underline="none"> Dr. Agustin Muriago </Link> 
                from The Peabody Institute of The Johns Hopkins University and Reid Sczerba 
                from JHU Center for Educational Resources. The application is sponsored by
                <Link href="https://cer.jhu.edu/techfellows" underline="none">
                 JHU Technology Fellowship Grant Program</Link>. The objective of this application is
                to improve accessibility in the process of music teaching by providing customizable
                music notations on digital devices. Special thanks to <Link href="https://phonicscore.com" underline="none">Phonicscore</Link> for developing 
                <Link href="https://github.com/opensheetmusicdisplay/opensheetmusicdisplay" underline="none"> OpenSheetMusicDisplay</Link> renderer, which is the fundamental building block to this project.
              </Typography>
              <br />
              <Divider />
              <br />
              <Typography variant="h6">
                Feedback survey
              </Typography>
              <Typography variant="subtitle1">
                If you have any suggestions for this app, please take our <Link href="https://forms.gle/C8VL4kUgg3XPmHGu7" underline="none">user experience survey</Link>, thank you!
              </Typography>
              <br />
            </DialogContent>
          </Dialog>
        </Toolbar>
        <Divider />
        <Toolbar className={classes.customizeToolbar}>

          <Grid container spacing={0}>
            <Grid item>
              <Box sx={{ width: 230 }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <FormControl style={{ minWidth: 160 }}>
                      <Tooltip classes={{ tooltip: classes.tooltip }} title="Font" arrow={true}>
                        <Select
                          labelId="font-select"
                          id="font-select"
                          value={font}
                          onChange={handleFontChange}
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left"
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left"
                            },
                            getContentAnchorEl: null
                          }}
                          autoWidth="true"
                        >
                          <MenuItem value={"Arial"} style={{ 'fontFamily': 'Arial' }}>Arial</MenuItem>
                          <MenuItem value={"Calibri"} style={{ 'fontFamily': 'Calibri' }}>Calibri</MenuItem>
                          <MenuItem value={"Cambria"} style={{ 'fontFamily': 'Cambria' }}>Cambria</MenuItem>
                          <MenuItem value={"Courier New"} style={{ 'fontFamily': 'Courier New' }}>Courier New</MenuItem>
                          <MenuItem value={"Futura"} style={{ 'fontFamily': 'Futura' }}>Futura</MenuItem>
                          <MenuItem value={"Garamond"} style={{ 'fontFamily': 'Garamond' }}>Garamond</MenuItem>
                          <MenuItem value={"Georgia"} style={{ 'fontFamily': 'Georgia' }}>Georgia</MenuItem>
                          <MenuItem value={"Helvetica"} style={{ 'fontFamily': 'Helvetica' }}>Helvetica</MenuItem>
                          <MenuItem value={"Times New Roman"} style={{ 'fontFamily': 'Times New Roman' }}>Times New Roman</MenuItem>
                          <MenuItem value={"Verdana"} style={{ 'fontFamily': 'Verdana' }}>Verdana</MenuItem>
                        </Select>
                      </Tooltip>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Tooltip classes={{ tooltip: classes.tooltip }} title="Bold" arrow={true}>

                      <ToggleButton
                        className={classes.toggleButton}
                        value="bold"
                        selected={isBold}
                        onChange={handleBold}
                      >
                        <FormatBoldIcon />
                      </ToggleButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item>

              <Box sx={{ width: 180 }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <BackgroundColorPicker
                      color={backgroundColor}
                      handleChange={handleChangeBackgroundColor}
                    />
                  </Grid>
                  <Grid item>
                    <NoteHeadColorPicker
                      color={noteHeadColor}
                      handleChange={handleChangeNoteHeadColor}
                    />
                  </Grid>
                  <Grid item>
                    <Tooltip classes={{ tooltip: classes.tooltip }} title="Automatic color" arrow={true}>
                      <ToggleButton
                        className={classes.toggleButton}
                        value="autoColoring"
                        selected={autoColoring}
                        onChange={handleAutoColoring}
                      >
                        <FormatColorTextIcon />
                      </ToggleButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item>
              <Box sx={{ width: 240 }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Tooltip classes={{ tooltip: classes.tooltip }} title="Show fingering" arrow={true}>

                      <ToggleButton
                        className={classes.toggleButton}
                        value="drawFingerings"
                        selected={drawFingerings}
                        onChange={handleDrawFingerings}
                      >
                        <PanToolIcon />
                      </ToggleButton>

                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip classes={{ tooltip: classes.tooltip }} title="Expand fingering" arrow={true}>

                      <ToggleButton
                        className={classes.toggleButton}
                        value="expandFingerings"
                        selected={!expandFingerings}
                        onChange={handleExpandFingerings}
                      >
                        <ImportExportIcon />
                      </ToggleButton>

                    </Tooltip>
                  </Grid>

                  <Grid item>

                    <Tooltip classes={{ tooltip: classes.tooltip }} title="Fingering position" arrow={true}>

                      <FormControl variant="outlined" className={classes.formControl} style={{ minWidth: 100 }} >
                        <Select
                          native
                          value={fingeringPosition}
                          onChange={handleSetFingeringPosition}
                          input={<OutlinedInput classes={{ input: classes.input }} />}
                        >
                          <option value={"above"}>Above</option>
                          <option value={"below"}>Below</option>
                          <option value={"left"}>Left</option>
                          <option value={"right"}>Right</option>
                        </Select>
                      </FormControl>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item>
              <Box sx={{ width: 150 }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Tooltip classes={{ tooltip: classes.tooltip }} title="Show measure number new line" arrow={true}>

                      <ToggleButton
                        className={classes.toggleButton}
                        value="drawMeasureStart"
                        selected={drawMeasureStart}
                        onChange={handleDrawMeasureStart}
                      >
                        <FormatListNumberedIcon />
                      </ToggleButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip classes={{ tooltip: classes.tooltip }} title="Measure number interval" arrow={true}>

                      <FormControl variant="outlined" className={classes.formControl} style={{ minWidth: 60 }}>
                        <Select
                          native
                          value={drawMeasureInterval}
                          onChange={handleDrawMeasureInterval}
                          input={<OutlinedInput classes={{ input: classes.input }} />}
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                        </Select>
                      </FormControl>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item>
              <Box sx={{ width: 100 }}>
                <Grid container spacing={0} alignItems="center">

                  <Grid item>
                    <Tooltip classes={{ tooltip: classes.tooltip }} title="Flat beam" arrow={true}>

                      <ToggleButton
                        className={classes.toggleButton}
                        value="isFlatBeam"
                        selected={isFlatBeam}
                        onChange={handleIsFlatBeam}
                      >
                        <DragHandleIcon />
                      </ToggleButton>

                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip classes={{ tooltip: classes.tooltip }} title="Show in one line" arrow={true}>

                      <IconButton onClick={handleSingleHorizontal}>
                        <ArrowRightAltIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item>
              <Box sx={{ width: 350 }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <FormControl variant="outlined" className={classes.formControl} style={{ minWidth: 160 }}>
                      <Select
                        native
                        value={thickness.selected}
                        onChange={handleFieldChange}
                        input={<OutlinedInput classes={{ input: classes.input }} />}
                      >
                        <option value={'staff width'}>staff width</option>
                        <option value={'staff distance'}>staff distance</option>
                        <option value={'ledger width'}>ledger width</option>
                        <option value={'stem width'}>stem width</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs>
                    <Slider
                      step={1}
                      min={0}
                      max={10}
                      value={sliderValue(thickness.selected)}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider"
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      value={sliderValue(thickness.selected)}
                      size="small"
                      onChange={handleThicknessInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: 10,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item>
              <Box sx={{ width: 230 }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Button onClick={handleDecrement}><ZoomOutIcon /></Button>
                  </Grid>
                  <Grid item>
                    <Tooltip classes={{ tooltip: classes.tooltip }} title="Zoom" arrow={true}>

                      <TextField
                        value={zoom}
                        size="small"
                        variant="outlined"
                        style={{ minWidth: 80 }}
                        // disableUnderline={false}
                        className={classes.zoomTextField}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        onChange={changeZoom}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Button onClick={handleIncrement}><ZoomInIcon /></Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item>
                    <Tooltip classes={{ tooltip: classes.tooltip }} title="Presets" arrow={true}>

                      <FormControl variant="outlined" className={classes.formControl} style={{ minWidth: 100 }} >
                        <Select
                          native
                          value={presetColors}
                          onChange={handleSetPresetColors}
                          input={<OutlinedInput classes={{ input: classes.input }} />}
                        >
                          <option value={"1"}>Default</option>
                          <option value={"2"}>Light 1</option>
                          <option value={"3"}>Light 2</option>
                          <option value={"4"}>Present mode</option>
                          <option value={"5"}>Easy to read</option>                   
                        </Select>
                      </FormControl>
                    </Tooltip>
                  </Grid>



          </Grid>

          {/* <Divider flexItem orientation="vertical" className={classes.divider} /> */}

          {/* <IconButton onClick={handleBold}>
                <FormatBoldIcon />
            </IconButton> */}


          {/* <BackgroundColorPicker
            color={backgroundColor}
            handleChange={handleChangeBackgroundColor}
          />

          <NoteHeadColorPicker
            color={noteHeadColor}
            handleChange={handleChangeNoteHeadColor}
          />


          <Tooltip classes={{ tooltip: classes.tooltip }} title="Automatic color" arrow={true}>

            <ToggleButton
              className={classes.toggleButton}
              value="autoColoring"
              selected={autoColoring}
              onChange={handleAutoColoring}
            >
              <FormatColorTextIcon />
            </ToggleButton>
          </Tooltip> */}

          {/* <Divider flexItem orientation="vertical" className={classes.divider} /> */}

          {/* <Tooltip classes={{ tooltip: classes.tooltip }} title="Show fingering" arrow={true}>

            <ToggleButton
              className={classes.toggleButton}
              value="drawFingerings"
              selected={drawFingerings}
              onChange={handleDrawFingerings}
            >
              <PanToolIcon />
            </ToggleButton>

          </Tooltip>
          <Tooltip classes={{ tooltip: classes.tooltip }} title="Expand fingering" arrow={true}>

            <ToggleButton
              className={classes.toggleButton}
              value="expandFingerings"
              selected={!expandFingerings}
              onChange={handleExpandFingerings}
            >
              <ImportExportIcon />
            </ToggleButton>

          </Tooltip>

          <Tooltip classes={{ tooltip: classes.tooltip }} title="Fingering position" arrow={true}>

            <FormControl variant="outlined" className={classes.formControl} style={{ minWidth: 100 }} >
              <Select
                native
                value={fingeringPosition}
                onChange={handleSetFingeringPosition}
                input={<OutlinedInput classes={{ input: classes.input }} />}
              >
                <option value={"above"}>Above</option>
                <option value={"below"}>Below</option>
                <option value={"left"}>Left</option>
                <option value={"right"}>Right</option>
              </Select>
            </FormControl>
          </Tooltip> */}
          {/* <Divider flexItem orientation="vertical" className={classes.divider} /> */}
          {/* <Tooltip classes={{ tooltip: classes.tooltip }} title="Flat beam" arrow={true}>

            <ToggleButton
              className={classes.toggleButton}
              value="isFlatBeam"
              selected={isFlatBeam}
              onChange={handleIsFlatBeam}
            >
              <DragHandleIcon />
            </ToggleButton>

          </Tooltip> */}

          {/* <Divider flexItem orientation="vertical" className={classes.divider} /> */}
          {/* <Tooltip classes={{ tooltip: classes.tooltip }} title="Show measure number new line" arrow={true}>

            <ToggleButton
              className={classes.toggleButton}
              value="drawMeasureStart"
              selected={drawMeasureStart}
              onChange={handleDrawMeasureStart}
            >
              <FormatListNumberedIcon />
            </ToggleButton>
          </Tooltip>
          <Tooltip classes={{ tooltip: classes.tooltip }} title="Measure number interval" arrow={true}>

            <FormControl variant="outlined" className={classes.formControl} style={{ minWidth: 60 }}>
              <Select
                native
                value={drawMeasureInterval}
                onChange={handleDrawMeasureInterval}
                input={<OutlinedInput classes={{ input: classes.input }} />}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </Select>
            </FormControl>
          </Tooltip> */}

          {/* <Divider flexItem orientation="vertical" className={classes.divider} /> */}

          {/* <Tooltip classes={{ tooltip: classes.tooltip }} title="Show in one line" arrow={true}>

            <IconButton onClick={handleSingleHorizontal}>
              <ArrowRightAltIcon />
            </IconButton>
          </Tooltip> */}
          {/* <Divider flexItem orientation="vertical" className={classes.divider} /> */}

          {/* <Box sx={{ width: 350 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <FormControl variant="outlined" className={classes.formControl} style={{ minWidth: 160 }}>
                  <Select
                    native
                    value={thickness.selected}
                    onChange={handleFieldChange}
                    input={<OutlinedInput classes={{ input: classes.input }} />}
                  >
                    <option value={'staff width'}>staff width</option>
                    <option value={'staff distance'}>staff distance</option>
                    <option value={'ledger width'}>ledger width</option>
                    <option value={'stem width'}>stem width</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs>
                <Slider
                  step={1}
                  min={0}
                  max={10}
                  value={sliderValue(thickness.selected)}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item>
                <Input
                  value={sliderValue(thickness.selected)}
                  size="small"
                  onChange={handleThicknessInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 10,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </Box> */}

          {/* <Divider flexItem orientation="vertical" className={classes.divider} /> */}

          {/* <Button onClick={handleDecrement}><ZoomOutIcon /></Button>
          <Tooltip classes={{ tooltip: classes.tooltip }} title="Zoom" arrow={true}>

            <TextField
              value={zoom}
              size="small"
              variant="outlined"
              style={{ minWidth: 80 }}
              // disableUnderline={false}
              className={classes.zoomTextField}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              onChange={changeZoom}
            />
          </Tooltip>
          <Button onClick={handleIncrement}><ZoomInIcon /></Button> */}

        </Toolbar>
      </AppBar>
      <Hint file={file} />
      <OSMD
        osmd={osmd}
        file={file}
        zoom={zoom}
        autoColoring={autoColoring}
        font={font}
        isBold={isBold}
        drawFingerings={drawFingerings}
        expandFingerings={expandFingerings}
        drawMeasureStart={drawMeasureStart}
        drawMeasureInterval={drawMeasureInterval}
        // measureStart = {measureStart === "" ? 0 : parseInt(measureStart)}
        // measureEnd = {measureEnd === "end" ? Number.MAX_SAFE_INTEGER : parseInt(measureEnd)}
        singleHorizontal={singleHorizontal}
        backgroundColor={backgroundColor}
        noteHeadColor={noteHeadColor}
        fingeringPosition={fingeringPosition}
        isFlatBeam={isFlatBeam}

        staffWidth={staffWidthArr[thickness.staffWidth]}
        staffDistance={staffDistanceArr[thickness.staffDistance]}
        ledgerWidth={ledgerWidthArr[thickness.ledgerWidth]}
        stemWidth={stemWidthArr[thickness.stemWidth]}
      />
    </div>

  );
}