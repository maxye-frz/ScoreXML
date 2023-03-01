import Dropzone from './Dropzone';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';

function UploadDialog(props) {
  const onClose = props.onClose;
  const open = props.open;
  const handleClose = () => {
    onClose();
  };

  const handleFileUpload = (file, name) => {
    props.onUploadChange(file, name);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Upload from local</DialogTitle>
      <DialogContent>
        <Dropzone
          onFileChange={handleFileUpload}
        />
      </DialogContent>
    </Dialog>
  );
}

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default UploadDialog;