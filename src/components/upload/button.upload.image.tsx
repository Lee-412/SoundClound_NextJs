import * as React from 'react';

import { Button, styled } from "@mui/material";


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

export default function InputFileUpload() {
    return (
        <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"

        >
            Upload a file
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}
