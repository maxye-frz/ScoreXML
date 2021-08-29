import React, { useState, useEffect, useRef } from 'react';
import { TwitterPicker } from 'react-color';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PaletteIcon from '@material-ui/icons/Palette';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
    tooltip: {
        fontSize: "0.8em",
    },
});

function BackgroundColorPicker(props) {

    const classes = useStyles();


    const [pickerVisible, setPickerVisible] = useState(false);
    const [color, setColor] = useState(props.color);
    const onTogglePicker = () => setPickerVisible(!pickerVisible);
    //const handleColorChange = ({ hex }) => console.log(hex);
    const handleColorChange = (e) => {
        props.handleChange(e.hex);
        setColor(e.hex);
    }

    const backgroundColorOptions = ['#FFFFFF', '#e8e8e4', '#d8e2dc', '#f8edeb', '#ffe5d9', '#ffd7ba', '#eddcd2'];

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
            <Tooltip classes={{ tooltip: classes.tooltip }} title="Background color" arrow={true}>

                <IconButton onClick={onTogglePicker}>
                    <PaletteIcon ref={button} />
                </IconButton>
            </Tooltip>
            {
                pickerVisible && (
                    <div style={{ position: 'absolute' }} ref={picker}>
                        <TwitterPicker
                            color={color}
                            colors={backgroundColorOptions}
                            onChangeComplete={handleColorChange}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default BackgroundColorPicker;