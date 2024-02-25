import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { Button, FormControl, InputLabel, TextField } from '@mui/material'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from '@emotion/styled';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase/firebase.config';

function CreatePost() {

    // Required states
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [file, setFile] = useState(null)
    const [imageURL, setImageURL] = useState('')
    const [progress, setProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(false);
    const [loading, setLoading] = useState(false)


    // Options for categories
    const options = [
        { value: 'politics', label: 'Politics' },
        { value: 'education', label: 'Education' },
        { value: 'health', label: 'Health' }
    ]

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

    // Handle image storing for post using firebase

    useEffect(() => {
        if (file) {
            storeImage()
        }
    }, [file])

    const storeImage = () => {
        const storage = getStorage(app);
        const storageRef = ref(storage, `${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        setLoading(true)
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                setImageUploadError(error.message)
                setProgress(null)
                setLoading(false)
            },
            () => {
                // Above function will run once complete.
                // Here we call the function to get download link for image.
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, ['postImage']: imageURL })
                    setImageUploadError(null)
                    setImageURL(downloadURL)
                    setProgress(null)
                    setLoading(false)
                })
            }
        )
    }

    // Handle Changes
    const handleChange = (e) => {
        // In case we somehow  get an access without a name or id keep both to access
        const name = e.target.id || e.target.name;
        setFormData({ ...formData, [name]: e.target.value });
    };

    // Handle submissions
    const handleSubmit = async (event) => {
        console.log(formData);
    }

    return (
        <div id='wrapper' className='min-h-screen flex justify-center items-center'>
            <div id='actual form' className=' min-w-half flex flex-col gap-8 py-12 max-w-2/3'>
                <h1 className='text-4xl font-semibold mx-auto'>Create Post</h1>
                <section className='flex flex-col gap-2 tablet:flex-row tablet:justify-between '>
                    <TextField
                        variant='outlined'
                        id='title'
                        label='Title'
                        color='warning'
                        onChange={handleChange}
                        value={formData ? formData.title : ''}
                        className=' tablet:w-2/3'
                    />
                    {/* Image upload file  input */}
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        color='warning'
                        tabIndex={-1}
                        disabled={loading}
                        startIcon={<CloudUploadIcon />}
                    >
                        {file ? file.name : "Upload File"}
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                            }}

                        />
                    </Button>
                    {
                        imageURL &&
                        <img
                            src={imageURL}
                            alt='image u uploaded'
                        />
                    }
                </section>

                {/* Category Selection */}
                <Select
                    id='category'
                    name="category"
                    options={options}
                    placeholder="Category"
                    className="basic-multi-select "
                    classNamePrefix="select"
                    onChange={(e) => {
                        setFormData({ ...formData, ['category']: e.value })
                    }}
                />

                {/* Section to write content of Post */}
                <ReactQuill
                    theme="snow"
                    className=''
                    onChange={(content, delta, source, editor) => {
                        const text = editor.getContents().ops[0].insert;
                        setFormData({ ...formData, ['content']: text })
                    }}
                />
                <Button
                    variant='outlined'
                    color='warning'
                    className='w-full'
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    Post
                </Button>
            </div>
        </div>
    )
}

export default CreatePost