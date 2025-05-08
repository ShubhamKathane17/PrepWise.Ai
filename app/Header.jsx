"use client"

import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path = usePathname();
    useEffect(()=>{
        console.log(path);
    },[])

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <Image src={'/logo.png'} width={130} height={100} alt='logo' />

        <ul className='hidden md:flex gap-6'>

            <Link href={'/dashboard'}>
            <li className={`text-xl hover:text-primary hover:font-bold transition-all cursor-pointer 
                ${path=='/dashboard' && 'text-primary font-bold' }`}>Dashboard</li>
            </Link>

            <Link href={'/plans'}>
            <li className={`text-xl hover:text-primary hover:font-bold transition-all cursor-pointer 
                ${path=='/dashboard/plan' && 'text-primary font-bold' }`}>Plans</li>
            </Link>

            <Link href={'/how'}>
            <li className={`text-xl hover:text-primary hover:font-bold transition-all cursor-pointer 
                ${path=='/dashboard/how' && 'text-primary font-bold' }`}>How it works</li>
            </Link>
        </ul>

        <div class="flex items-center gap-4">
          <div class="sm:flex sm:gap-4">
            <a
              class="rounded-md bg-teal-600 px-5 py-2.5 text-md font-medium text-white shadow"
              href="/dashboard"
            >
              Login
            </a>

            <div class="hidden sm:flex">
              <a
                class="rounded-md bg-gray-100 px-5 py-2.5 text-md font-medium text-teal-600"
                href="/dashboard"
              >
                Register
              </a>
            </div>
          </div>

          <div class="block md:hidden">
            <button class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

    </div>
  )
}

export default Header