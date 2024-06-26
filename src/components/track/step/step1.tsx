'use client'

import { FileWithPath, useDropzone } from "react-dropzone";
import './theme.scss'
import { Button, Container, styled } from "@mui/material";
import { useCallback, useState } from "react";
import { sendRequest, sendRequestFile } from "@/utils/api";
import { FileUpload, Token } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import axios from "axios";
export interface DataUpload {
    setValue: (v: number) => void,
    trackUpload: any,
    setTrackUpload: any
}
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

function ButtonFileUpload() {
    return (
        <Button
            onClick={(event) => event.preventDefault()}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}

const Step1 = (props: DataUpload) => {
    const { data: session } = useSession();
    const [percent, setPercent] = useState(0)
    const { trackUpload } = props;

    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            const audio = acceptedFiles[0];
            const formData = new FormData()
            formData.append('fileUpload', audio)


            try {
                const res = await axios.post("http://localhost:8000/api/v1/files/upload",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${session?.access_token}`,
                            'target_type': 'tracks',
                            delay: 5000
                        },
                        onUploadProgress: progressEvent => {
                            //@ts-ignore
                            let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                            // setPercent(percentCompleted);
                            props.setValue(1);
                            props.setTrackUpload({
                                ...trackUpload,
                                fileName: acceptedFiles[0].name,
                                percent: percentCompleted
                            })
                        }
                    })
                props.setTrackUpload({
                    ...trackUpload,
                    uploadedTrackName: res.data.data.fileName
                })
                console.log("check data audio", res.data.data.fileName);
            } catch (error) {

                //@ts-ignore
                alert(error?.response?.data?.message)
            }


        }
    }, [session])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'audio': ['.mp3', '.m4a', '.wav']
        }

    });

    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <Container>
            <section className="container">

                <div {...getRootProps({ className: 'dropzone' })}
                    style={{
                        marginTop: "30px",
                        marginBottom: "30px"
                    }}
                >
                    <input {...getInputProps()} />
                    <ButtonFileUpload />
                    <p> Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside>
                    <h4>Files</h4>
                    <ul>{files}</ul>
                </aside>

            </section >
        </Container >

    );
}

export default Step1; 