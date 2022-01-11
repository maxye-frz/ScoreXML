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

    const noteHeadColorOptions = ['#000000', '#9381ff', '#005f73', '#0a9396', '#94d2bd', '#ee9b00', '#bb3e03', '#ae2012', '#9b2226'];

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
                            // colors={noteHeadColorOptions}
                            onChangeComplete={handleColorChange}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default NoteHeadColorPicker;