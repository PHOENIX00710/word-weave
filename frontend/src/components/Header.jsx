import React from 'react'
import { Link } from 'react-router-dom'
import { InputAdornment, TextField, Button } from '@mui/material'
import { SearchRounded, } from '@mui/icons-material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

function Header() {
    return (
        <header className='border-b-12 text-red-400 flex items-center justify-between p-4 border-b-4'>
            <div id='logo' className='text-white bg-red-300 px-3 py-1 rounded-md'>
                <span className=''><span className='text-2xl md:text-4xl'>W</span><span className='md:text-3xl'>ord</span></span>
                <span className=''><span className='text-2xl md:text-4xl'>W</span><span className='md:text-3xl'>eave</span></span>
            </div>
            <nav className=''>
                <ul className="list-none flex justify-between gap-4">
                    <li className='text-xl'><Link to='/'>Home</Link></li>
                    <li className='text-xl'><Link to='/about'>About</Link></li>
                    <li className='text-xl'><Link to='/projects'>Projects</Link></li>
                </ul>
            </nav>
            <TextField
                id=""
                label="Search"
                variant="outlined"
                size='small'
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchRounded className='cursor-pointer' />
                        </InputAdornment>
                    ),
                }}
            />
            <div id="buttons" className='flex gap-4 items-center'>
            <DarkModeOutlinedIcon/>
            <Button variant="contained" className='text-black'>Sign In</Button>
            </div>
        </header>
    )
}

export default Header