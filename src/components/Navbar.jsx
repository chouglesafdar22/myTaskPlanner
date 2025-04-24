import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-around bg-slate-700 text-white py-2'>
            <div className="logo">
                <span className='flex font-bold text-2xl mx-10'>myTaskPlanner</span>
            </div>
            <ul className="flex gap-8 font-semibold text-xl mx-10">
                <li className='cursor-pointer hover:text-amber-200 hover:font-bold transition-all'>Home</li>
                <li className='cursor-pointer hover:text-amber-200 hover:font-bold transition-all'>Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar
