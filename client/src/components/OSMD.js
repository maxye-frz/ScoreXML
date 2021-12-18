import { useState, useEffect } from 'react';

function debounce(fn, ms) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null; fn.apply(this, arguments);
        }, ms)
    }
}

function OSMD(props) {

    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    const osmd = props.osmd;
    const file = props.file;
    const zoom = props.zoom / 100;
    const autoColoring = props.autoColoring;
    // const stemColoring = props.stemColoring
    const font = props.font;
    const isBold = props.isBold;
    const drawFingerings = props.drawFingerings;
    const expandFingerings = props.expandFingerings;
    const fingeringPosition = props.fingeringPosition;
    const isFlatBeam = props.isFlatBeam;
    const drawMeasureStart = props.drawMeasureStart;
    const drawMeasureInterval = (drawMeasureStart) ? Number.MAX_SAFE_INTEGER : props.drawMeasureInterval;
    // const measureStart = props.measureStart;
    // const measureEnd = props.measureEnd;
    const singleHorizontal = props.singleHorizontal;
    const backgroundColor = props.backgroundColor;
    const noteHeadColor = (autoColoring) ? "#000000" : props.noteHeadColor;
    const staffWidth = props.staffWidth;
    const staffDistance = props.staffDistance;
    const ledgerWidth = props.ledgerWidth;
    const stemWidth = props.stemWidth;

    useEffect(() => {

        //need clean up here! cause unnecessary network
        const debounceHandleResize = debounce(function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        }, 100);

        osmd.setOptions({
            coloringMode: autoColoring,
            coloringSetCustom: ['#e21c48', '#009C95', '#5E50A1', '#CF3E96', '#bcd85f', '#F99D1C', '#fff32b', '#000000'],
            // colorStemsLikeNoteheads: stemColoring,
            defaultFontFamily: font,
            // defaultFontStyle: 0,
            drawFingerings: drawFingerings,
            measureNumberInterval: drawMeasureInterval,
            // drawMeasureNumbersOnlyAtSystemStart: drawMeasureStart,
            renderSingleHorizontalStaffline: singleHorizontal,
            fingeringPosition: fingeringPosition,
            // drawFromMeasureNumber: measureStart,
            // drawUpToMeasureNumber: measureEnd,
        });

        osmd.load(file).then(() => {
            osmd.zoom = zoom;
            osmd.EngravingRules.DefaultFontStyle = isBold;
            osmd.EngravingRules.PageBackgroundColor = backgroundColor;
            osmd.EngravingRules.DefaultColorNotehead = noteHeadColor;
            osmd.EngravingRules.RenderFingerings = true;
            osmd.EngravingRules.FingeringInsideStafflines = !expandFingerings;
            osmd.EngravingRules.FlatBeams = isFlatBeam;
            osmd.EngravingRules.RenderMeasureNumbers = true;
            osmd.EngravingRules.StaffLineWidth = staffWidth;
            osmd.EngravingRules.LedgerLineWidth = ledgerWidth;
            osmd.EngravingRules.StemWidth = stemWidth;
            osmd.EngravingRules.BetweenStaffDistance = staffDistance;

            osmd.render();
        });

        window.addEventListener('resize', debounceHandleResize);

        return () => {
            window.removeEventListener('resize', debounceHandleResize);
        }
    });


    return (null);
}

export default OSMD;