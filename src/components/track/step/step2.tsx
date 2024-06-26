'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import LinearWithValueLabel from '@/components/upload/progress.upload';
import { Button, Container, Grid, MenuItem, TextField, styled } from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export interface DataUploadStep2 {
    trackUpload: {
        fileName: string;
        percent: number,
        uploadedTrackName: string;
    }
}

interface NewTrackUpload {
    title: string;
    description: string;
    trackUlrl: string;
    imgUrl: string;
    category: string
}

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

function InputFileUpload() {
    return (
        <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"

            onChange={(e) => {
                const event = e.target as HTMLInputElement;
                if (event.files) {
                    console.log(event.files[0]);
                }

            }}
            startIcon={<CloudUploadIcon />}
        >
            Upload a file
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}


const Step2 = (props: DataUploadStep2) => {

    const { trackUpload } = props;

    const [infor, setInfor] = React.useState<NewTrackUpload>({
        title: "",
        description: "",
        trackUlrl: "",
        imgUrl: "",
        category: ""
    })

    React.useEffect(() => {
        if (trackUpload && trackUpload.uploadedTrackName) {
            setInfor({
                ...infor,
                trackUlrl: trackUpload.uploadedTrackName

            })

        }
    }, [props.trackUpload])
    const handleSave = () => {
        console.log(infor);
    }


    const category = [
        {
            value: 'CHILL',
            label: 'CHILL',
        },
        {
            value: 'WORKOUT',
            label: 'WORKOUT',
        },
        {
            value: 'PARTY',
            label: 'PARTY',
        }
    ];

    return (

        <Container sx={{
            height: "80vh"
        }} >
            <Box sx={{
                marginTop: "1vh"
            }}>
                <div>
                    {props.trackUpload.fileName}
                </div>
                <LinearWithValueLabel trackUpload={props.trackUpload} />
            </Box>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={6} md={4}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    <div style={{ height: 200, width: 200, background: "#ccc" }}>
                        <div>
                            <img
                                className="imageComment"
                                style={{
                                    width: "200px",
                                    height: "200px",
                                }}
                                src="" alt=''
                            />
                        </div>

                    </div>
                    <div>
                        <InputFileUpload />
                    </div>
                </Grid>
                <Grid item xs={6} md={8}>
                    <TextField
                        label="Title" variant="standard"
                        fullWidth
                        margin="dense"
                        defaultValue={infor.title}
                        onChange={(e) => setInfor({
                            ...infor,
                            title: e.target.value
                        })} />

                    <TextField
                        label="Description"
                        variant="standard"
                        fullWidth
                        margin="dense"
                        defaultValue={infor.description}
                        onChange={(e) => setInfor({
                            ...infor,
                            description: e.target.value
                        })} />

                    <TextField
                        sx={{
                            mt: 3
                        }}

                        select
                        label="Category"
                        fullWidth
                        variant="standard"
                        defaultValue={infor.category}
                        onChange={(e) => setInfor({
                            ...infor,
                            category: e.target.value
                        })} >
                        {category.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="outlined"
                        sx={{
                            mt: 5,
                            mb: 2
                        }}
                        onClick={handleSave}>
                        Save</Button>
                </Grid>
            </Grid>

        </Container >

    );
}
export default Step2;