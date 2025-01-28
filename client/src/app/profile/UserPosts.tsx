'use client'

import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { MdMessage } from "react-icons/md";
import { LuTableOfContents } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/PostCards";
import { useState } from "react";

const UserPosts = () => {

    const posts = useSelector((store: RootState) => store.user.userPost);
    const msgs = useSelector((store: RootState) => store.user.userMsg);

    const [open, setOpen] = useState('post');


    const newMsg = msgs.slice().reverse();

    return (
        <div className="my-4">
            <div className="flex items-center justify-around ">
                <Button variant='outline' className={`${open === 'post' ? 'border-2 border-black bg-zinc-100' : ''} w-full `}
                    onClick={() => {
                        setOpen('post');
                    }}
                >
                    Posts <LuTableOfContents />
                </Button>
                <Button variant='outline' className={`${open === 'msg' ? 'border-2 border-black bg-zinc-100' : ''} w-full `}
                    onClick={() => {
                        setOpen('msg')
                    }}
                >
                    Messages <MdMessage />
                </Button>
            </div>

            <div className={`p-2 md:p-10 mt-6 ${open === 'post' ? '' : 'hidden'} `}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {
                        posts.length > 0 ? (posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))) : (
                            <div className=" ">
                                <h1 className="">Not Post Yet..</h1>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={`p-2 md:p-10 mt-6 ${open === 'msg' ? '' : 'hidden'} `}>

                {
                    msgs.length>0 ? (newMsg.map((msg) => (
                        <div key={msg._id} className="flex items-center justify-center border-2 rounded-2xl shadow-lg m-2 md:m-6">
                            <div className="p-4 w-full md:w-3/4">
                                <h2 className= "text-md md:text-xl font-bold">Email - {msg.email} </h2>
                                <p className="text-sm md:text-md text-slate-900 my-2">{msg.msg}</p>
                            </div>
                        </div>
                    ))):(
                        <div className=" text-center mty-10">
                            <h1>Not Messages Yet...</h1>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default UserPosts
