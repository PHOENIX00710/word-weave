import { Button } from '@mui/material'
import { LuGithub } from "react-icons/lu";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import React from 'react'

function Footer() {
    return (
        <footer className='w-full p-7 flex flex-col gap-8 tablet:flex-row  tablet:justify-around items-center bg-gradient-to-r from-teal-300 via-teal-500 to-green-500'>
            {/* LOGO */}
            <section id='logo-section' className='flex flex-col gap-1'>
                <div id='logo' className={`text-white bg-gradient-to-r from-orange-400 via-red-500 to-red-700 w-fit font-bold px-3 py-1 rounded-md  flex justify-center items-center h-auto`}>
                    <span className=''><span className={`text-4xl md:text-6xl`}>W</span><span className={`text-2xl md:text-4xl`}>ord</span></span>
                    <span className=''><span className={`text-4xl md:text-6xl`}>W</span><span className={`text-2xl md:text-4xl`}>eave</span></span>
                </div>
                <strong className='tablet:text-xl m-auto'>Join Us at WordWeave!!</strong>
            </section>
            {/* SUBSCRIBE */}
            <section className='flex h-max '>
                <input
                    type="text"
                    placeholder='Enter your Email '
                    className='p-3 focus:outline-double focus:outline-orange-400'
                />
                <Button
                    type='submit'
                    variant='contained'
                    color='warning'
                >
                    Subscribe
                </Button>
            </section>
            {/* Follow */}
            <div id='social-media-btns' className='flex items-center justify-start gap-x-4 text-4xl text-orange-500'>
                <a href="https://www.linkedin.com/in/swapnil-jha-5b5aab219" target='_blank'>
                    <AiFillLinkedin
                        className='hover:scale-125'
                    />
                </a>
                <a href="https://github.com/PHOENIX00710" target='_blank'>
                    <AiFillGithub
                        className='hover:scale-125'
                    />
                </a>
                <a href="https://www.instagram.com/swapnil_00710/" target='_blank'>
                    <AiFillInstagram
                        className='hover:scale-125'
                    />
                </a>
            </div>

        </footer>
    )
}

export default Footer