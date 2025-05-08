"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'

// import { Heading2, Mic, StopCircle } from 'lucide-react';
import { chatSession } from '@/utils/GeminiAIModel';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { db } from '@/utils/db';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnswer] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results?.map((result) => {
            setUserAnswer(prevAns => prevAns + result?.transcript)
        })
    }, [results])

    useEffect(() => {
        if (!isRecording && userAnswer?.length > 10) {
            UpdateUserAnswer();
        }
    }, [userAnswer])

    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
        }
        else {
            startSpeechToText();
        }
    }

    const UpdateUserAnswer = async () => {
        setLoading(true);
        const feedBackPrompt = "Question:" + mockInterviewQuestion[activeQuestionIndex]?.question +
            ", User Answer:" + userAnswer + "Depending on the Question and User Answer provided , Please give a rating(out of 10) " +
            "for the answer and also provide feedback as area of improvement if any , im not more than 4 to 5 lines in JSON Format " +
            "with rating field and feedback field ";

        const result = await chatSession.sendMessage(feedBackPrompt);
        const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '').trim();

        // console.log(mockJsonResp);

        const JsonFeedbackResp = JSON.parse(mockJsonResp);

        const resp = await db.insert(UserAnswer)
            .values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY')
            })
        if (resp) {
            toast('User Answer Submitted Successfully');
            setUserAnswer('')
            setResults([])
        }
        setResults([])
        setLoading(false)

    }

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
                <Image src={'/webcam.png'} width={200} height={200} className='absolute' />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>
            <Button
                disabled={loading}
                variant="outline" className='my-10'
                onClick={StartStopRecording}
            >
                {isRecording ?
                    <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
                        <Mic />Stop Recording
                    </h2>
                    : <h2 className='text-primary flex gap-2 items-center'> <Mic/> Record Answer </h2>}
            </Button>

        </div>
    )
}

export default RecordAnswerSection