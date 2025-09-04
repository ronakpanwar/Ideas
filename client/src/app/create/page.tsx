'use client'
import React, { useEffect } from 'react'
import CreatePost from './CreatePost'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'

const Page = () => {
  const user = useSelector((store:RootState)=>store.user.user);
  const router = useRouter();

  useEffect(()=>{
    if(!user){
      router.push('/');
    }
  } , )
  
  return (
    <div>
      <CreatePost/>
    </div>
  )
}

export default Page
