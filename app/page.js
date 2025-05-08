"use client"

import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import Header from './Header';
import Footer from './Footer';

export default function Home() {
  return (
    <div>
      <div>
        <Header/>
      </div>

     <div>
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
            >
              Conquer Your Interview Anxiety.

              <span className="sm:block"> Practice with a Personalized AI Coach.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Double your chances of landing that job offer with our AI-powered interview preperation platform 
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={'/dashboard'}>
              <li
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              >
                Get Started
              </li>
              </Link>

            </div>
          </div>
        </div>
      </section>
     </div>

     <div>
      <Footer/>
     </div>

    </div>
  );
}
