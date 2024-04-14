'use client'

import { FileWithPath, useDropzone } from "react-dropzone";
import './theme.scss'
import { Button, Container, styled } from "@mui/material";
import { useCallback } from "react";
import ButtonUploadFile from "@/components/upload/button.upload";
import { sendRequest, sendRequestFile } from "@/utils/api";
import { FileUpload } from "@mui/icons-material";
import { useSession } from "next-auth/react";


const Step1 = () => {
    const { data: session } = useSession();



    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            const audio = acceptedFiles[0];
            const formData = new FormData()
            formData.append('fileUpload', audio)
            const chills = await sendRequestFile<IBackendRes<ITrackTop[]>>({
                url: "http://localhost:8000/api/v1/files/upload",
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': `Bearer ${session?.access_token}`,
                    'target_type': 'tracks'
                },

            });
            console.log("Check AcceptedFiles,", audio);
            console.log(session);
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
                    <ButtonUploadFile />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside>
                    <h4>Files</h4>
                    <ul>{files}</ul>
                </aside>

            </section >
        </Container>

    );
}

export default Step1; 