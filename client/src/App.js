import UploadDialog from './components/UploadDialog';
import OSMD from './components/OSMD';
import BackgroundColorPicker from './components/BackgroundColorPicker';
import NoteHeadColorPicker from './components/NoteHeadColorPicker';
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
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import HelpIcon from '@material-ui/icons/Help';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import GitHubIcon from '@material-ui/icons/GitHub';



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


export default function App() {

  const classes = useStyles();

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
    console.log(osmd);
    const svgElement = osmdCanvas.getElementsByTagName('svg').item(0);
    const width = svgElement.width.baseVal.value;
    const height = svgElement.height.baseVal.value;
    // console.log(width, height);
    const pdf = new jsPDF(width > height ? 'l' : 'p', 'pt', [width, height]);
    console.log(fileName);
    pdf.svg(svgElement, {}).then(() => { pdf.save(fileName + ".pdf") });
  }

  const handleGitHub = () => {
    window.open('https://github.com/maxye-frz/ScoreXML','_blank');
  }


  // file state
  const [file, setFile] = useState('');
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + 'Gymnopdie_No._1_Satie.musicxml')
      .then(response => response.text())
      .then(text => setFile(text));
  }, []);

  const [fileName, setFileName] = useState('Gymnopdie_No._1_Satie');
  const handleFileChange = (f, name) => {
    setFile(f);
    setFileName(name);
    setUploadDialogOpen(false);
    //console.log("set global file state!");
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


  const [autoColoring, setAutoColoring] = useState(0);
  const handleAutoColoring = () => { setAutoColoring(1 - autoColoring) };

  const [font, setFont] = useState("Times New Roman");
  const handleFontChange = (event) => {
    setFont(event.target.value);
  };

  const [isBold, setIsBold] = useState(0);
  const handleBold = () => { setIsBold(1 - isBold) };

  const [drawFingerings, setDrawFingerings] = useState(false);
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

  const [drawMeasureInterval, setDrawMeasureInterval] = useState(2);
  const handleDrawMeasureInterval = (e) => {
    setDrawMeasureInterval(parseInt(e.target.value));
  }

  const [staffWidth, setStaffWidth] = useState(0.1);
  const handleStaffWidth = (e) => {
    setStaffWidth(e.target.value === '' ? '' : Number(e.target.value));
  }
  const handleStaffBlur = () => {
    if (staffWidth < 0.05) {
      setStaffWidth(0.05);
    } else if (staffWidth > 0.3) {
      setStaffWidth(0.3);
    }
  };

  const [staffDistance, setStaffDistance] = useState(8);
  const handleStaffDistance = (e) => {
    setStaffDistance(e.target.value === '' ? '' : Number(e.target.value));
  }
  const handleDistanceBlur = () => {
    if (staffDistance < 1) {
      setStaffDistance(1);
    } else if (staffDistance > 50) {
      setStaffDistance(50);
    }
  };

  const [ledgerWidth, setLedgerWidth] = useState(1);
  const handleLedgerWidth = (e) => {
    setLedgerWidth(e.target.value === '' ? '' : Number(e.target.value));
  }
  const handleLedgerBlur = () => {
    if (ledgerWidth <= 0.5) {
      setLedgerWidth(0.5);
    } else if (staffWidth > 4) {
      setLedgerWidth(4);
    }
  };

  const [stemWidth, setStemWidth] = useState(0.1);
  const handleStemWidth = (e) => {
    setStemWidth(e.target.value === '' ? '' : Number(e.target.value));
  }
  const handleStemBlur = () => {
    if (stemWidth <= 0.01) {
      setStemWidth(0.01);
    } else if (stemWidth > 0.3) {
      setStemWidth(0.3);
    }
  };

  const [singleHorizontal, setSingleHorizontal] = useState(false);
  const handleSingleHorizontal = () => {
    setSingleHorizontal(!singleHorizontal);
  }

  const [osmd, setOsmd] = useState(new window.opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas", { backend: "svg", autoResize: true }));



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
            import
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
            save
          </Button>
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
            className={classes.menuButton}
            startIcon={<HelpIcon />}
            size='large'
          >
            help
          </Button>
        </Toolbar>
        <Divider />
        <Toolbar className={classes.customizeToolbar}>
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

          <Divider flexItem orientation="vertical" className={classes.divider} />

          {/* <IconButton onClick={handleBold}>
                <FormatBoldIcon />
            </IconButton> */}


          <BackgroundColorPicker
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
          </Tooltip>

          <Divider flexItem orientation="vertical" className={classes.divider} />

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

            <FormControl variant="outlined" className={classes.formControl} style={{ minWidth: 60 }} >
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
          <Divider flexItem orientation="vertical" className={classes.divider} />
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

          <Divider flexItem orientation="vertical" className={classes.divider} />
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
          <Tooltip classes={{ tooltip: classes.tooltip }} title="Measure number interval" arrow={true}>

            <FormControl variant="outlined" className={classes.formControl} style={{ minWidth: 40 }}>
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

          <Divider flexItem orientation="vertical" className={classes.divider} />

          <Tooltip classes={{ tooltip: classes.tooltip }} title="Show in one line" arrow={true}>

            <IconButton onClick={handleSingleHorizontal}>
              <ArrowRightAltIcon />
            </IconButton>
          </Tooltip>
          <Divider flexItem orientation="vertical" className={classes.divider} />

          <Typography variant="body1">
            Staff width:
          </Typography>
          <NumInput
            disableUnderline={true}
            value={staffWidth}
            size="small"
            onChange={handleStaffWidth}
            onBlur={handleStaffBlur}
            inputProps={{
              step: 0.05,
              min: 0,
              max: 0.3,
              type: 'number',
            }}
          />

          <Typography variant="body1">
            Staff distance:
          </Typography>
          <NumInput
            disableUnderline={true}
            value={staffDistance}
            size="small"
            onChange={handleStaffDistance}
            onBlur={handleDistanceBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: 50,
              type: 'number',
            }}
          />

          <Typography variant="body1">
            Ledger width:
          </Typography>
          <NumInput
            disableUnderline={true}
            value={ledgerWidth}
            size="small"
            onChange={handleLedgerWidth}
            onBlur={handleLedgerBlur}
            inputProps={{
              step: 0.5,
              min: 0.5,
              max: 4,
              type: 'number',
            }}
          />

          <Typography variant="body1">
            Stem width:
          </Typography>
          <NumInput
            disableUnderline={true}
            value={stemWidth}
            size="small"
            onChange={handleStemWidth}
            onBlur={handleStemBlur}
            inputProps={{
              step: 0.01,
              min: 0.01,
              max: 0.3,
              type: 'number',
            }}
          />


          <Divider flexItem orientation="vertical" className={classes.divider} />

          <Button onClick={handleDecrement}><ZoomOutIcon /></Button>
          <Tooltip classes={{ tooltip: classes.tooltip }} title="Zoom" arrow={true}>

            <TextField
              value={zoom}
              size="small"
              variant="outlined"
              // disableUnderline={false}
              className={classes.zoomTextField}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              onChange={changeZoom}
            />
          </Tooltip>
          <Button onClick={handleIncrement}><ZoomInIcon /></Button>

        </Toolbar>
      </AppBar>
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

        staffWidth={staffWidth}
        staffDistance={staffDistance}
        ledgerWidth={ledgerWidth}
        stemWidth={stemWidth}
      />
    </div>

  );
}