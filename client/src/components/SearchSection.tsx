import React from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { FaSearch } from "react-icons/fa";

const SearchSection = () => {
    return (
        <div className=' '>
        <div className='flex px-4 py-2 w-full max-w-md bg-white rounded-3xl   m-auto items-center justify-center shadow-md'>
            <Input type="search" placeholder="Search ideas..." className='bg-white border-none '/>
            <Button type="submit" className='bg-orange-600 py-4 px-3 rounded-full hover:bg-orange-500'><FaSearch/></Button>
        </div>
        </div>
    )
}

export default SearchSection
