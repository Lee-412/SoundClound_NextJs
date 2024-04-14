'use client'

import { FileWithPath, useDropzone } from "react-dropzone";
import './theme.scss'
import { Button, styled } from "@mui/material";
import { useCallback } from "react";
import ButtonUploadFile from "@/components/upload/button.upload";


const Step1 = () => {
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        console.log("Check AcceptedFiles,", acceptedFiles);

    }, [])
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop });

    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">

            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <ButtonUploadFile />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>

        </section>

    );
}

export default Step1; 