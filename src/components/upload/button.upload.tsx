import { Button, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const ButtonUploadFile = () => {
    return (
        <Button

            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onClick={(event) => { event.preventDefault() }}
        >
            Upload file
            {/* <VisuallyHiddenInput type="file" /> */}
        </Button>
    )
}
export default ButtonUploadFile;