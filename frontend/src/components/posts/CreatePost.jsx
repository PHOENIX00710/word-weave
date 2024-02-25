import React, { useState } from 'react'
import { MenuItem, Select } from '@mui/base';
import { Button, InputLabel, TextField } from '@mui/material'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost() {


    // Required states
    const [formData, setFormData] = useState(null)

    // Bolier Plate stuff for File Upload form Material UI
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

    // Handle Changes
    const handleChange = (event) => {
        setFormData({ ...formData, [e.target.id]: event.target.value });
    };
    return (
        <div id='wrapper' className='min-h-screen flex justify-center items-center'>
            <h1>Create Post</h1>
            <section className='flex flex-col gap-2 tablet:flex-row tablet:justify-between'>
                <TextField
                    variant='conatined'
                    id='title'
                    label='Title'
                    onChange={handleChange}
                    value={formData?.title || ''}
                />
                {/* Category Selection */}
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category"
                    value={formData?.category || ''}
                    label="Category"
                    onChange={handleChange}
                >
                    <MenuItem value={"Education"}>Education</MenuItem>
                    <MenuItem value={"Film"}>Film</MenuItem>
                    <MenuItem value={"Sports"}>Sports</MenuItem>
                    <MenuItem value={"Others"}>Others</MenuItem>
                </Select>
            </section>
            <section className='border-2 border-teal-400 border-dotted'>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload file
                    <VisuallyHiddenInput type="file" />
                </Button>
            </section>
            <ReactQuill
                theme="snow"
                onChange={() => {
                    setFormData({ ...formData, ["content"]: quill.getContents() })
                }}
            />
            <Button
                onClick={handleSumbit}
                variant='outlined'
                color='warning'
            >
                Post
            </Button>
        </div>
    )
}

export default CreatePost