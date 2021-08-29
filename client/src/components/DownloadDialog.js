import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import { jsPDF } from 'jspdf';
import 'svg2pdf.js';

function DownloadDialog(props) {
  const onClose = props.onClose;
  const open = props.open;
  const handleClose = () => {
    onClose();
  };

  const handleCheck = () => {
    const osmdCanvas = document.getElementById('osmdCanvas');
    console.log(osmd);
    const svgElement = osmdCanvas.getElementsByTagName('svg').item(0);
    // console.log(svgElement);
    // svgElement.getBoundingClientRect();
    const width = svgElement.width.baseVal.value;
    const height = svgElement.height.baseVal.value;
    // console.log(width, height);
    const pdf = new jsPDF(width > height ? 'l' : 'p', 'pt', [width, height]);
    pdf.svg(svgElement, {}).then(() => { pdf.save("test.pdf") });

  }
  //console.log(osmd.drawer.Backends);

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Save as PDF</DialogTitle>
      <DialogContent>
        <Button
          onClick={handleCheck}
        >
          check
        </Button>

      </DialogContent>
    </Dialog>
  );
}

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default DownloadDialog;