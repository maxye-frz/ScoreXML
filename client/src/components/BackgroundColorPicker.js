import React, { useState, useEffect, useRef } from 'react';
import { GithubPicker } from 'react-color';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
// import PaletteIcon from '@material-ui/icons/Palette';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
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

    const backgroundColorOptions = [
        '#f5f5f4', '#e5e6e4', '#d2d2cf', '#dcdcda', '#f6efeb', '#eee7df', '#f6f4ea', '#eceae2',
        '#797d62', '#9b9b7a', '#d9ae94', '#e5c59e', '#f1dca7', '#e4b074', '#d08c60', '#997b66',
        '#eff2d0', '#e4e9c1', '#d8e0b2', '#c0ce93', '#b4c584', '#a8bc74', '#9cb365', '#90a955',
        '#cb9b6c', '#d4a373', '#deb68a', '#e7c8a0', '#f1dbb7', '#faedcd', '#fcf4d7', '#fefae0',
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
            <Tooltip classes={{ tooltip: classes.tooltip }} title="Background color" arrow={true}>

                <IconButton onClick={onTogglePicker}>
                    <FormatColorFillIcon ref={button} />
                </IconButton>
            </Tooltip>
            {
                pickerVisible && (
                    <div style={{ position: 'absolute' }} ref={picker}>
                        <GithubPicker
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