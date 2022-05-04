import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FcSms } from 'react-icons/fc'

import { imgLoader } from '../src/utils'

export default function Home() {
  return (
    <div>
      <Head>
        <title>iDAX Analytic</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-screen h-16 bg-white px-8 flex items-center justify-between">
        <Link href="/" passHref>
            <div className="relative w-20 h-14 cursor-pointer">
                <Image src="https://saas-oss.oss-cn-hongkong.aliyuncs.com/upload/20220311170245533.png" loader={imgLoader} layout="fill" objectFit="contain" alt="mont" />
            </div>
        </Link>
        <div className="flex items-center space-x-4 font-bold text-lg">
            <span className="uppercase cursor-default">idax analytics</span>
        </div>
      </header>
      
      <div className="flex flex-col items-center space-y-8 mt-20">
        <Link href="/withdraw" passHref>
          <div className="flex items-center justify-center space-x-2 py-4 w-80 rounded-md bg-cyan-500/80 hover:bg-cyan-500 cursor-pointer">
            <div className="relative w-12 h-12">
              <Image src="https://trade.mn/coin-icons/mont.svg" loader={imgLoader} layout="fill" objectFit="contain" alt="mont" />
            </div>
            <span className="font-medium text-xl text-white">MONT WITHDRAW</span>
          </div>
        </Link>
        <Link href="/sms" passHref>
          <div className="flex items-center justify-center space-x-2 py-4 w-80 rounded-md bg-cyan-500/80 hover:bg-cyan-500 cursor-pointer">
            <div className="relative w-12 h-12">
              <FcSms size="50" />
            </div>
            <span className="font-medium text-xl text-white">SMS SERVICE</span>
          </div>
        </Link>
      </div>
    </div>
  )
}