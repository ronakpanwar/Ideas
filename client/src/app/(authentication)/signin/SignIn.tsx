'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { setUser } from '@/redux/userSlice'


interface Data {
    email: string,
    password: string
}


const SignIn = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()

    const [data, setData] = useState<Data>({
        email: '',
        password: ''
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
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/sign-in`, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message);
                router.push('/');
                dispatch(setUser(res.data.user));
                console.log(res.data.user);
            }

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something went wrong");
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong");
            }

        } finally {
            setLoading(false);
        }
    }



    return (
        <div className='h-screen flex items-center justify-center '>
            <div className='flex flex-col gap-4  w-96 border-2 border-zinc-300 shadow-lg py-10 px-10 rounded-3xl'>
                <h1 className=' text-center text-3xl mx-4 mb-6 font-bold'>Welcome back </h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-4'>
                        <Input className='w-full focus-visible:border-2 focus-visible:border-slate-600 shadow-sm' type='email' placeholder='Email' name='email' value={data.email} onChange={handleChange} />
                        <Input className='w-full focus-visible:border-2 focus-visible:border-slate-600 shadow-sm' type='password' placeholder='password' name='password' value={data.password} onChange={handleChange} />

                    </div>
                    <div className='mt-6'>
                        <Button type='submit' disabled={loading} className='w-full'>
                            {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}

                        </Button>
                    </div>
                </form>
                <div className='text-sm'>
                    <p>create account... <Link href={'/signup'} className='text-orange-600 underline'> SignUp</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn
