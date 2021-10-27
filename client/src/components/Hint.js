import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Hint(props) {
    const file = props.file;
    if (file === '') {
        console.log("display")
        return (
            <div>
                <Typography variant="h6" align="center" style={{
                    paddingTop: '100px',
                }}>
                    Click import to upload musicXML file, or use <Link href="61797c98ffabbf8efab5b745" underline="none">our example</Link>
                </Typography>
            </div>
        )
    } else {
        return null;
    }
}

export default Hint;