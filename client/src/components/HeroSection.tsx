"use client"
import React from 'react'
import light from "../app/light-bulb.png"
import Image from 'next/image'
import { Button } from './ui/button'

import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import SearchSection from './SearchSection'

const HeroSection = () => {
    const router = useRouter();
    const user = useSelector((store: RootState) => store.user.user);

    return (
        <div className='px-2 p-10 min-h-96  flex flex-col gap-3 items-center justify-center bg-gradient-to-r from-slate-400 from-10% via-slate-100 via-30% to-slate-400 to-90%'>
            <div className='text-lg sm:text-2xl md:text-6xl my-4'>
                <h1 className='text-black flex gap-2 items-center justify-center'><span className='text-slate-900 mx-3'> Welcome to</span> <span><Image src={light} width={45} height={20} alt='light' /> </span>Ideas-<span className='text-orange-600 font-bold'>library</span></h1>
            </div>
            <div className='mt-2'>
                <h1 className='text-lg sm:text-xl md:text-3xl text-orange-600 font-bold' >Discover Innovative Startup Ideas</h1>
            </div>
            <div className='text-slate-800 text-sm max-w-2xl text-center  '>
                <p>Explore creative business concepts from visionaries around the world , Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quaerat, nam accusamus voluptatum distinctio vero atque eaque impedit maiores magnam optio illo laudantium rerum. </p>
            </div>
            <div>
                <Button onClick={() => {
                    user ? (router.push("/create")) :
                        (router.push("/signin"))
                }} className='bg-orange-500 hover:bg-orange-600'>
                    Share Your Idea
                </Button>
            </div>
            <div className='w-full m-5'> 
                <SearchSection />
            </div>

        </div>
    )
}

export default HeroSection
