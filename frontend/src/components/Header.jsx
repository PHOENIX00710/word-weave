import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputAdornment, TextField, Button, createTheme, ThemeProvider, Menu, MenuItem, Fade } from '@mui/material'
import { SearchRounded, SearchOutlined, } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { IoIosClose } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

function Header() {
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1920,
                tablet: 1000, // custom breakpoint
            },
        },
    });

    const [menuBtn, setMenuBtn] = useState(false)

    const handleClick = (event) => {
        setMenuBtn((prevState)=>(
            !prevState
        ));
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <header className='border-b-12 text-red-400 flex items-center justify-between p-4 border-b-4'>

            {/*LOGO*/}

            <div id='logo' className='text-white bg-logo px-3 py-1 rounded-md'>
                <span className=''><span className='text-2xl md:text-4xl'>W</span><span className='md:text-3xl'>ord</span></span>
                <span className=''><span className='text-2xl md:text-4xl'>W</span><span className='md:text-3xl'>eave</span></span>
            </div>

            {/* Nav list desktop view */}

            <nav className=''>
                <ul className="list-none justify-between gap-20 font-bold  hidden tablet:flex">
                    <li className='text-xl hover:text-navLight text-navDark' ><Link to='/'>Home</Link></li>
                    <li className='text-xl hover:text-navLight text-navDark'><Link to='/about'>About</Link></li>
                    <li className='text-xl hover:text-navLight text-navDark'><Link to='/projects' >Projects</Link></li>
                </ul>
            </nav>

            <div id="buttons" className='flex gap-4 sm:first-line:gap-8 items-center relative'>

                {/* Search button desktop view */}

                <ThemeProvider theme={theme}>
                    {<TextField
                        sx={{
                            display: {
                                xs: "none",
                                tablet: "block"
                            },
                        }}
                        label="Search"
                        variant="outlined"
                        size='small'
                        color='warning'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchRounded className='cursor-pointer' />
                                </InputAdornment>
                            ),
                        }}
                    />
                    }
                </ThemeProvider>

                {/* Search button mobile view */}

                <ThemeProvider theme={theme}>
                    {<SearchOutlined
                        className=''
                        sx={{
                            display: {
                                xs: "block",
                                tablet: "none"
                            },
                            cursor: "pointer",
                            fontSize: {
                                xs: "18px",
                                md: "30px"
                            },
                            color: "#000"

                        }}
                    />}
                </ThemeProvider>


                {/*Sign In Button*/}

                <Button
                    variant="contained"
                    color='success'
                    className='text-black'
                    sx={{
                        fontSize: {
                            xs: "small"
                        }
                    }}
                >
                    Sign In
                </Button>

                {/* Menu button mobile view */}

                {
                    !menuBtn &&
                    <ThemeProvider theme={theme}>
                        {<MenuIcon
                            sx={{
                                display: {
                                    xs: "block",
                                    tablet: "none"
                                },
                                cursor: "pointer",
                                color: "black"
                            }}
                            onClick={handleClick}
                        />}
                    </ThemeProvider>
                }

                {/* Nav menu for mobile view */}

                {
                    menuBtn &&
                    <IoIosCloseCircle className='text-black text-3xl absolute -right-4 top-8 hover:text-slate-400 z-10'
                        onClick={handleClick}
                    />
                }

                {
                    menuBtn &&
                    <nav id='nav-mobile' className='absolute right-0 top-12 p-4 bg-white text-black flex flex-col gap-3 tablet:hidden list-none shadow-lg rounded font-mono'>
                        <li
                            className='text-xl hover:bg-slate-300 text-black rounded px-3'
                            onClick={handleClick}
                        >
                            <Link to='/'>Home</Link>
                        </li>
                        <li
                            className='text-xl hover:bg-slate-300 text-black rounded px-3'
                            onClick={handleClick}
                        >
                            <Link to='/about'>About</Link>
                        </li>
                        <li
                            className='text-xl hover:bg-slate-300 text-black rounded px-3'
                            onClick={handleClick}
                        >
                            <Link to='/projects'>Projects</Link>
                        </li>
                    </nav>
                }
            </div>
        </header>
    )
}

export default Header