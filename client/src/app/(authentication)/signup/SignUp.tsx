'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'


interface Data {
    name: string,
    userName: string,
    email: string,
    password: string
}

const SignUp = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()

    const [data, setData] = useState<Data>({
        name: '',
        userName: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/sign-up`, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message);
               router.push('/signin');
            }

        } catch (error: any) {
            toast.error(error?.response?.data?.message || "somthing is Wrong");
        } finally {
            setLoading(false);
        }
    }
  return (
    <div className='h-screen flex items-center justify-center '>
    <div className='flex flex-col gap-4  w-96 border-2 border-zinc-300 shadow-lg py-10 px-10 rounded-3xl'>
        <h1 className=' text-center text-3xl mx-4 mb-6 font-bold'>Lets Join Us  </h1>
        <form action="" onSubmit={handleSubmit}>

            <div className='flex flex-col gap-4'>
                <Input className='w-full focus-visible:border-2 focus-visible:border-slate-600 shadow-sm' type='text' placeholder='Name' name='name' value={data.name} onChange={handleChange} />

                <Input className='w-full focus-visible:border-2 focus-visible:border-slate-600 shadow-sm' type='text' placeholder='User Name' name='userName' value={data.userName} onChange={handleChange} />

                <Input className='w-full focus-visible:border-2 focus-visible:border-slate-600 shadow-sm' type='email' placeholder='Email' name='email' value={data.email} onChange={handleChange} />

                <Input className='w-full focus-visible:border-2 focus-visible:border-slate-600 shadow-sm' type='password' placeholder='password' name='password' value={data.password} onChange={handleChange} />

            </div>
            <div className='mt-6'>
                <Button type='submit' disabled={loading} className='w-full'>
                    {loading ? <Loader2 className="animate-spin" /> : 'Sign Up'}

                </Button>
            </div>
        </form>
        <div className='text-sm'>
            <p>Already have account... <Link href={'/signin'} className='text-orange-600 underline'> SignIn</Link> </p>
        </div>
    </div>
</div>
  )
}

export default SignUp
