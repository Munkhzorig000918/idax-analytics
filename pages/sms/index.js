import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import BigNumber from 'bignumber.js'

import { imgLoader } from '../../src/utils'
import ReceiveSmsTable from '../../src/components/sms/ReceiveSmsTable'
import SmsRequestTable from '../../src/components/sms/SmsRequestTable'
import SmsResponseTable from '../../src/components/sms/SmsResponseTable'

export default function Sms({ receiveSms, totalReceiveSms, smsReq, totalSmsReq, smsRes, totalSmsRes }) {
    return (
        <div className="pb-20">
           <header className="w-screen h-16 bg-white px-8 flex items-center justify-between">
                <Link href="/" passHref>
                    <div className="relative w-20 h-14 cursor-pointer">
                        <Image src="https://saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220311170245533.png" loader={imgLoader} layout="fill" objectFit="contain" alt="mont" />
                    </div>
                </Link>
                <div className="flex items-center space-x-4 font-bold text-lg">
                    <span className="uppercase cursor-default">idax sms analytics</span>
                </div>
            </header>
           <div className="container mx-auto mt-9">
                <div className="bg-white p-8 grid grid-cols-3 gap-4">
                    <div className="shadow p-4 space-y-2">
                        <p className="text-sm font-medium">Receive SMS</p>
                        <span className="font-block text-2xl flex justify-center">{totalReceiveSms ? new BigNumber(totalReceiveSms).toFormat(0) : '--'}</span>
                    </div>
                    <div className="shadow p-4 space-y-2">
                        <p className="text-sm font-medium">SMS Request</p>
                        <span className="font-block text-2xl flex justify-center">{totalSmsReq ? new BigNumber(totalSmsReq).toFormat(0) : '--'}</span>
                    </div>
                    <div className="shadow p-4 space-y-2">
                        <p className="text-sm font-medium">SMS Response</p>
                        <span className="font-block text-2xl flex justify-center">{totalSmsRes ? new BigNumber(totalSmsRes).toFormat(0) : '--'}</span>
                    </div>
                </div>
               <section>
                    <ReceiveSmsTable title="Receive SMS Table" data={receiveSms} />
                    <SmsRequestTable title="SMS Request Table" data={smsReq} />
                    <SmsResponseTable title="SMS Response Table" data={smsRes} />
               </section>
           </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    let fetchReceiveSms = await axios.get(`${process.env.API_URL}/receive-sms?limit=100`)
    let receiveSms = await fetchReceiveSms.data

    let fetchTotalReceiveSms = await axios.get(`${process.env.API_URL}/total-receive-sms`)
    let totalReceiveSms = await fetchTotalReceiveSms.data

    let fetchSmsReq = await axios.get(`${process.env.API_URL}/sms-req?limit=100`)
    let smsReq = await fetchSmsReq.data

    let fetchTotalSmsReq = await axios.get(`${process.env.API_URL}/total-sms-req`)
    let totalSmsReq = await fetchTotalSmsReq.data

    let fetchSmsRes = await axios.get(`${process.env.API_URL}/sms-res?limit=100`)
    let smsRes = await fetchSmsRes.data

    let fetchTotalSmsRes = await axios.get(`${process.env.API_URL}/total-sms-res`)
    let totalSmsRes = await fetchTotalSmsRes.data
  
    return {
        props: {
          receiveSms,
          totalReceiveSms,
          smsReq,
          totalSmsReq,
          smsRes,
          totalSmsRes
        }
    }
}