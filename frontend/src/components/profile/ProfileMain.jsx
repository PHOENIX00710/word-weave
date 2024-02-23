import { TextField, Button, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../firebase/firebase.config';
import { deleteFailed, deleteSuccess, upadateRequested, updateFailure, updateSuccess } from '../../features/user/userSlice';

function ProfileMain() {

    // For Navigation
    const navigate = useNavigate();

    // Current user Details
    const userDetails = useSelector((state) => state.user.userDetails)
    const dispatch = useDispatch()

    //For update in general
    const [formData, setFormData] = useState(null)

    // For progress Bar
    const [pictureProgress, setPictureProgress] = useState(null);
    // For image Files
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setImageFileURL] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null)

    // open state for popup confirmation for deleting 

    const [open, setOpen] = useState(false)

    const handlePopUpClose = () => {
        setOpen(false)
    }

    const handleConfirmDelete = async () => {
        const res = await fetch('/api/v1/removeUser', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = res.json()
        if (data.success == false) {
            dispatch(deleteFailed("Failed in removing User"))
            setOpen(false)
        }
        else {
            dispatch(deleteSuccess())
            setOpen(false)
            navigate("/signup")
        }
    }

    // Using reference for upload image
    const fileInputRef = useRef();

    // UseEffect to upload image seperately on firebase and then the link on MongoDB
    useEffect(() => {
        if (imageFile) {
            uploadImage()
        }
    }, [imageFile])

    //Function to upload image on firebase and then update the link to mongoDB
    const uploadImage = async (e) => {
        const storage = getStorage(app);
        // To give a custom name to store the image in storage of firebase
        const fileName = new Date().getTime() + imageFile.name;
        const storageref = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageref, imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setPictureProgress(progress)
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                setImageUploadError("Error in uploading image, size limit : 2MB")
            },
            () => {
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileURL(downloadURL)
                    setFormData({ ...formData, image: downloadURL })
                    setImageUploadError(null)
                });
            }
        )
    }


    //Handle upload of image 
    const hanndleImageChange = (e) => {
        const file = e.target.files[0]; //Access the uploaded files
        if (file) {
            setImageFile(file);  //Set the image file in the state
            setImageFileURL(URL.createObjectURL(file))   //Create a URL for the uploaded file that can be used to display it
        }
    }

    // Handle Updation of username and password
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    //Handle final submission of Changes
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(upadateRequested())
        try {
            const res = await fetch('/api/v1/updateDetails', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json()
            if (data.success == false)
                return dispatch(updateFailure("Failed in updating user Details"))
            else
                return dispatch(updateSuccess({
                    email: data.sendInfo.email,
                    id: data.sendInfo._id,
                    username: data.sendInfo.username,
                    photoURL: data.sendInfo.photoURL ? data.sendInfo.photoURL : "https://cdn.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.webp",
                }))
        }
        catch (error) {
            console.log('Error : ', error)
            dispatch(updateFailure(error.message))
        }
    }

    //Handle deletion of users
    const handleDelete = (e) => {
        e.preventDefault()
        setOpen(true);
    }

    return (
        <div className='w-full flex justify-center items-center min-h-screen mb-8 p-4'>
            <form action="/" method='PUT' className=' tablet:w-1/3 flex justify-center flex-col gap-8'>
                <h1 className='text-center text-3xl font-bold'>PROFILE</h1>
                {/* Accept is specified to ensure only image files are uploaded */}
                <input
                    type="file"
                    accept='image/*'
                    className='m-auto w-64 hidden'
                    onChange={hanndleImageChange}
                    ref={fileInputRef}
                />
                <div className='relative w-32 h-32 border-4 border-slate-600 rounded-full flex justify-center items-start overflow-hidden m-auto' id='upload-image-container'>
                    {
                        pictureProgress &&
                        <CircularProgressbar
                            value={pictureProgress || 0}
                            text={`${pictureProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(62, 152, 199, ${pictureProgress / 100
                                        })`,
                                },
                            }}
                        />
                    }
                    <img src={imageFileURL || userDetails.photoURL} className='cursor-pointer rounded-full w-full h-full object-cover'
                        alt=""
                        onClick={() => fileInputRef.current.click()}
                    />
                    {
                        imageUploadError &&
                        <Alert severity="error">{imageUploadError}</Alert>
                    }
                </div>
                <TextField
                    id='username'
                    variant='filled'
                    value={userDetails?.username}
                    onChange={handleChange}
                />
                <TextField
                    id='password'
                    label='Password'
                    variant='filled'
                    onChange={handleChange}
                />
                <Button
                    variant='contained'
                    color='warning'
                    onClick={handleSubmit}
                >
                    Save Changes
                </Button>
                <div id='extra-options' className='flex justify-between'>
                    <section className='text-red-700 italic font-medium cursor-pointer hover:text-red-900'
                        onClick={handleDelete}
                    >
                        Delete User
                    </section>

                    {/* Popup Confirmation for deleting user */}

                    <Dialog
                        open={open}
                        onClose={handlePopUpClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Delete User?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this user Account. All your progress will be deleted.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handlePopUpClose} autoFocus>No</Button>
                            <Button onClick={handleConfirmDelete}>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Link to={"/signout"}>
                        <section className='text-red-700 italic font-medium cursor-pointer hover:text-red-900'>Sign Out</section>
                    </Link>
                </div>
                {
                    userDetails.error &&
                    <Alert
                        severity={"error"}
                    >
                        {userDetails.error}
                    </Alert>
                }
            </form>
        </div>
    )
}

export default ProfileMain