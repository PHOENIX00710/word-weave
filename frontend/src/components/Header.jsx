import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputAdornment, TextField, Button, createTheme, ThemeProvider } from '@mui/material'
import { SearchRounded, SearchOutlined, } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
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
        setMenuBtn((prevState) => (
            !prevState
        ));
    };

    return (
        <header className='border-b-1 flex items-center justify-between p-4 border-b-4'>

            {/*LOGO*/}

            <Link to={"/home"}>
                <div id='logo' className={`text-white bg-gradient-to-r from-orange-400 via-red-500 to-red-700 font-semibold px-3 py-1 rounded-md flex justify-center items-center h-auto`}>
                    <span className=''><span className={`text-2xl md:text-4xl`}>W</span><span className={`md:text-2xl`}>ord</span></span>
                    <span className=''><span className={`text-2xl md:text-4xl`}>W</span><span className={`md:text-2xl`}>eave</span></span>
                </div>
            </Link>

            {/* Nav list desktop view */}

            <nav className=''>
                <ul className="list-none justify-between gap-20 font-bold  hidden tablet:flex">
                    <li className='text-xl hover:text-navLight text-navDark' ><Link to='/home'>Home</Link></li>
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

                <Link to={"/signin"}>
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
                </Link>

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
                            <Link to='/home'>Home</Link>
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