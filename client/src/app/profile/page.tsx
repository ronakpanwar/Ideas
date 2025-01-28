'use client'
import React, { useEffect } from 'react'
import UserProfile from './UserProfile'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'

const Page = () => {

  const user = useSelector((store:RootState)=>store.user.user);
  const router = useRouter();
  useEffect(()=>{
    if(user === null){
      router.push('/')
    }
  } ,[user, router]);
  return (
    <div className=''>
      <UserProfile/>
    </div>
  )
}

export default Page
