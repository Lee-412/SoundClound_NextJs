
'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDropzone } from 'react-dropzone';
import { StepButton } from '@mui/material';
import Step1 from './step/step1';
import Step2 from './step/step2';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{

                }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const UploadTabs = () => {


    const [value, setValue] = React.useState(0);
    const [trackUpload, setTrackUpload] = React.useState({
        fileName: "",
        percent: 0,
        uploadedTrackName: ""
    })

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            width: '100%',
            border: "1px solid #ccc",
            mt: 5,
        }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Upload Track" {...a11yProps(0)} />
                    <Tab label="Information" {...a11yProps(1)} />

                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0} >

                <Step1
                    setValue={setValue}
                    trackUpload={trackUpload}
                    setTrackUpload={setTrackUpload}
                />

            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Step2
                    trackUpload={trackUpload}
                />
            </CustomTabPanel>

        </Box>
    );
}

export default UploadTabs;