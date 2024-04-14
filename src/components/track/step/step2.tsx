'use client'
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearWithValueLabel from '@/components/upload/progress.upload';
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import ButtonUploadFile from '@/components/upload/button.upload';


const Step2 = () => {

    // const [category, setCategory] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    // const handleChange = (event: SelectChangeEvent) => {
    //     setCategory(event.target.value);
    // };

    const handleSave = () => {
        console.log("check save", title, " ", description, " ", category)
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
        // <Container>
        //     <Box sx={{

        //         marginTop: "10px",

        //     }} >
        //         <Typography> Your file Upload</Typography>
        //         <LinearWithValueLabel />
        //     </Box>
        //     <Box sx={{
        //         display: "flex",
        //         marginTop: "30px",
        //         marginBottom: "15px",
        //         alignItems: 'flex-start'
        //     }} >
        //         <Box sx={{
        //             display: "flex",
        //             flexDirection: "column",
        //             alignItems: "center",
        //             width: "20%",
        //         }}>
        //             <img
        //                 className="imageComment"
        //                 style={{
        //                     width: "200px",
        //                     height: "200px",
        //                     backgroundColor: "grey"
        //                 }}
        //                 src='' alt=''
        //             />

        //             <br />
        //             <ButtonUploadFile />
        //         </Box>
        //         <Box
        //             component="form"
        //             sx={{
        //                 display: "flex",
        //                 flexDirection: "column",
        //                 width: "80%",
        //                 alignItems: "flex-start",
        //                 marginLeft: "30px",

        //             }}
        //             noValidate
        //             autoComplete="off"

        //         >
        //             <TextField sx={{ m: 1, minWidth: "100%" }}
        //                 onChange={(event) => { setTitle(event.target.value); }}
        //                 id="title"
        //                 label="Title"
        //                 variant="standard" />
        //             <TextField sx={{ m: 1, minWidth: "100%" }}
        //                 onChange={(event) => { setDescription(event.target.value); }}
        //                 id="description"
        //                 label="Description"
        //                 variant="standard" />

        //             <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }} size="small">
        //                 <InputLabel id="demo-select-small-label">Category</InputLabel>
        //                 <Select
        //                     labelId="demo-select-small-label"
        //                     id="demo-select-small"
        //                     value={category}
        //                     label="Category"
        //                     onChange={handleChange}
        //                 >
        //                     <MenuItem value={"CHILL"}>CHILL</MenuItem>
        //                     <MenuItem value={"WORKOUT"}>WORKOUT</MenuItem>
        //                     <MenuItem value={"PARTY"}>PARTY</MenuItem>
        //                 </Select>
        //             </FormControl>
        //             <Button
        //                 sx={{ m: 1, marginTop: "15px" }}
        //                 onClick={() => { handleSave() }}
        //                 variant="outlined"
        //             >Save
        //             </Button>
        //         </Box>
        //     </Box>
        // </Container>
        <Container>
            <Box sx={{
                marginTop: "8px",
                marginBottom: "3px"
            }}>
                <div>
                    Your uploading track:
                </div>
                <LinearWithValueLabel />
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
                                src='' alt=''
                            />
                        </div>

                    </div>
                    <div >
                        <ButtonUploadFile />
                    </div>

                </Grid>
                <Grid item xs={6} md={8}>
                    <TextField id="standard-basic" label="Title" variant="standard" fullWidth margin="dense" />
                    <TextField id="standard-basic" label="Description" variant="standard" fullWidth margin="dense" />
                    <TextField
                        sx={{
                            mt: 3
                        }}
                        id="outlined-select-currency"
                        select
                        label="Category"
                        fullWidth
                        variant="standard"
                    //   defaultValue="EUR"
                    >
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
                        }}>Save</Button>
                </Grid>
            </Grid>

        </Container>

    );
}
export default Step2;