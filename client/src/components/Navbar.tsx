'use client'
import React from 'react'
import { Button } from "./ui/button"
import Link from 'next/link'
import Image from 'next/image'
import light from '../app/light-bulb.png'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover"

import { CgProfile } from "react-icons/cg";
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'


const Navbar = () => {
  
    const user = useSelector((state: RootState) => state.user.user) ;


    return (
        <div className='sticky top-0  bg-white  px-4 py-4 flex items-center justify-around'>
            <div className='text-3xl flex gap-3'>
                <span ><Image src={light}
                    width={35}
                    height={20}
                    alt="Picture of the author" /></span>
                <Link href={'/'}><h1> Ideas-<span className='text-orange-600 font-bold'>library</span></h1></Link>
            </div>
            <div>
                {user === null ? (
                    <div className='flex gap-6 items-center'>
                        <div>
                            <Button variant="outline" className='bg-orange-600 hover:bg-orange-500 text-black'>
                                <Link href={'/signin'}>Sign In </Link>  </Button>
                        </div>
                        <div>
                            <Button variant="outline" className=''>
                                <Link href={'/signup'}>Sign Up </Link>  </Button>
                        </div>

                    </div>
                ) : (
                    <div className='flex gap-6 items-center '>
                        <div>
                            <Button variant="ghost">
                                <Link href={'/create'} className='font-bold text-lg text-orange-600'> Create </Link>
                            </Button>
                        </div>
                        <div className='flex gap-2'>
                            <Avatar>
                                <AvatarImage src={'#'} />
                                <AvatarFallback>RN</AvatarFallback>
                            </Avatar>
                            <Popover>
                                <PopoverTrigger className='text-sm'>{user?.userName}</PopoverTrigger>
                                <PopoverContent>
                                    <Link className='flex text-md items-center gap-2' href={'/profile'}> <span className='text-lg'><CgProfile /></span> Profile</Link>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default Navbar
