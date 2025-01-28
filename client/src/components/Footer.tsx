import Link from 'next/link'
import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


const Footer = () => {
    return (
        <div className='bg-slate-900 text-slate-200 p-2 flex items-center justify-between '>
            <div>
                <h1 className='text-slate-400'>Created By - <span className='text-orange-500'>Ronak Panwar</span></h1>
            </div>
            <div className='flex gap-6 mr-10 text-xl'>
                <Link href={'/'}>
                    <FaGithub className='hover:text-orange-500'/>
                </Link>
                <Link href={'/'}>
                    <FaLinkedin className='hover:text-orange-500'/>
                </Link>
            </div>
        </div>
    )
}

export default Footer
