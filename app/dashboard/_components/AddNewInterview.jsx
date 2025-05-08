"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { chatSession } from '@/utils/GeminiAIModel'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { PrepWise } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { useRouter } from 'next/navigation'




function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();

  const { user } = useUser();


  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    console.log(jobPosition, jobDesc, jobExperience)

    const InputPrompt = "Job Position: " + jobPosition + ", Job Description: " + jobDesc + " Years of Experience: " + jobExperience + ", Depending on this information please give me " + process.env.NEXT_PUBLIC_NUMBER_QUESTIONS + " Interview question with answers in Json Format, Give question and answer as field in JSON"


    const result = await chatSession.sendMessage(InputPrompt)
    const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '').trim();



    // console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {


      const resp = await db.insert(PrepWise).values({
        mockId: uuidv4(),
        jsonMockResp: MockJsonResp,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy')
      }).returning({ mockId: PrepWise.mockId });

      console.log("Inserted ID: ", resp)
      if (resp) {
        setOpenDialog(false)
        router.push('/dashboard/interview/' + resp[0]?.mockId)
      }
    }
    else {
      console.log("ERROR")
    }
    setLoading(false);
  }

  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}>
        <h2 className='text-lg text-center'> + Add New</h2>

      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about job interview</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>

                  <h2>Add Details about your Job Role & Years of Experience </h2>
                  <div className='mt-7 my-5'>
                    <label>Job Role/ Job Position</label>
                    <Input placeholder="Ex. Full Stack developer" required

                      onChange={(event) => setJobPosition(event.target.value)}
                    ></Input>
                  </div>

                  <div className='my-5'>
                    <label>Job Description / Tech Stack (In short)</label>
                    <Textarea placeholder="Ex. React, Java, DSA, OOPs etc" required

                      onChange={(event) => setJobDesc(event.target.value)}></Textarea>
                  </div>

                  <div className='my-5'>
                    <label>Years of Experience</label>
                    <Input placeholder="Ex. 5" type="number" required max="50"

                      onChange={(event) => setJobExperience(event.target.value)}></Input>
                  </div>
                </div>
                <div className='flex gap-5 justify-end'>
                  <Button variant="ghost" type="button" onClick={() => setOpenDialog(false)} >Cancel</Button>
                  <Button type="submit" disabled={loading}>
                    {loading ?
                      <>
                        <LoaderCircle className='animate-spin' />Generating with AI</> : 'Start Interview'

                    }
                  </Button>
                </div>
              </form>


            </DialogDescription>

          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AddNewInterview