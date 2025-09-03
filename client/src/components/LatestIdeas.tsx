"use client"
import { RootState } from '@/redux/store'
import React, { useState } from 'react'
import {  useSelector } from 'react-redux'
import PostCard from './PostCards'

const LatestIdeas = () => {
    const post = useSelector((store:RootState) => store.user.posts);
   
    const [postData , SetPostData] = useState([...post].reverse().slice(0,3));


  return (
    <div className='m-10'>
         <h1 className='font-bold   text-4xl text-center'>Featured Ideas</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6   my-10'>
                {
                    postData.map((post)=>(
                         <PostCard key={post._id} post={post} check={false} />
                    ))
                }
            </div>
         
    </div>
  )
}

export default LatestIdeas
