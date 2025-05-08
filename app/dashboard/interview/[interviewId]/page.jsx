"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { PrepWise } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam' 

function Interview({params}) {

    const [interviewData , setInterviewData] = useState();
    const [webcamEnabled , setWebcamEnabled] = useState();

    useEffect(()=>{
        //console.log(params.interviewId)
        GetInterviewDetails();
    },[])

    // Get interview data by mockId , or interview Id
    const GetInterviewDetails =async () =>{

        const result = await db.select().from(PrepWise)
        .where(eq(PrepWise.mockId , params.interviewId))

        //console.log(result)
        setInterviewData(result[0]);
    }

  return (
    <div className='my-10'>
        <h2 className='font-bold text-2xl'>Let's get Started</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='flex flex-col my-5 gap-5'>
                <div className='flex flex-col p-5 rounded-lg border'>
                <h2><strong>Job Role / Position :</strong>
                {interviewData ? interviewData.jobPosition : 'Loading...'}
                </h2>
                <h2><strong>Job Description / Tech Stack :</strong>
                {interviewData ? interviewData.jobDesc : 'Loading...'}
                </h2>
                <h2><strong>Years of Experience :</strong>
                {interviewData ? interviewData.jobExperience : 'Loading...'}
                </h2>
            </div>
                <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                    <h2 className='flex gap-2 item-center text-yellow-500'><Lightbulb/> <strong>INSTRUCTIONS</strong></h2>
                    <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_NOTE}</h2>
                </div>
            </div>

            <div>
                {/* Webcam setup */}
                {webcamEnabled ? <Webcam
                onUserMedia={()=>setWebcamEnabled(true)}
                onUserMediaError={()=> setWebcamEnabled(false)}
                mirrored={true}
                style={{
                    height:300,
                    width:300
                }}
                />
                :
                <>
                <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
                <Button variant="ghost" className='w-full' onClick={()=>setWebcamEnabled(true)} >Enable the WebCam and Microphone</Button>
                </>
                }
            </div>

        </div>

        <div className='flex justify-end items-end p-5'>
            <Link href={'/dashboard/interview/'+ params.interviewId + '/start'}>
                <Button>Start Interview</Button>
            </Link>
        </div>
    </div>
  )
}

export default Interview