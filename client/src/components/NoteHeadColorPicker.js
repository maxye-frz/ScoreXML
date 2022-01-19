import React, { useState, useEffect, useRef } from 'react';
import { GithubPicker } from 'react-color';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
    tooltip: {
        fontSize: "0.8em",
    },
});

function NoteHeadColorPicker(props) {

    const classes = useStyles();

    const [pickerVisible, setPickerVisible] = useState(false);
    const [color, setColor] = useState(props.color);
    const onTogglePicker = () => setPickerVisible(!pickerVisible);
    //const handleColorChange = ({ hex }) => console.log(hex);
    const handleColorChange = (e) => {
        props.handleChange(e.hex);
        setColor(e.hex);
    }

    const noteHeadColorOptions = [
        '#000000', '#212529', '#343a40', '#495057', '#6c757d', '#adb5bd', '#ced4da', '#dee2e6',
        '#0d47a1', '#1565c0', '#1976d2', '#1e88e5', '#2196f3', '#42a5f5', '#64b5f6', '#90caf9',
        '#590d22', '#800f2f', '#a4133c', '#c9184a', '#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1',
        '#ff7b00', '#ff8800', '#ff9500', '#ffa200', '#ffaa00', '#ffb700', '#ffc300', '#ffd000',
        '#004b23', '#006400', '#007200', '#008000', '#38b000', '#70e000', '#9ef01a', '#ccff33',
        '#a48971', '#8d6b48', '#9a774f', '#a9845a', '#be986d', '#d2a87d', '#e8c9ab', '#f5d7bd',
    ];

    const picker = useRef();
    const button = useRef();

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const handleClick = e => {
        if (picker.current && picker.current.contains(e.target)) {
            // inside click
            return;
        }
        if (button.current.contains(e.target)) {
            // click button
            return;
        }
        // outside click 
        setPickerVisible(false);
    };

    return (
        <div>
            <Tooltip classes={{ tooltip: classes.tooltip }} title="Note head color" arrow={true}>

                <IconButton onClick={onTogglePicker}>
                    <BorderColorIcon ref={button} />
                </IconButton>
            </Tooltip>
            {
                pickerVisible && (
                    <div style={{ position: 'absolute' }} ref={picker}>
                        <GithubPicker
                            // color={color}
                            colors={noteHeadColorOptions}
                            onChangeComplete={handleColorChange}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default NoteHeadColorPicker;