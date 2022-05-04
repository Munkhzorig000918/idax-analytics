import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import BigNumber from 'bignumber.js'
import { Pie, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, PointElement, LineElement, LinearScale } from 'chart.js';

import { imgLoader } from '../../src/utils'
import WithdrawRequestTable from '../../src/components/withdraw/WithdrawRequestTable'
import WithdrawResponseTable from '../../src/components/withdraw/WithdrawResponseTable'
import RefundRequestTable from '../../src/components/withdraw/RefundRequestTable'
import RefundResponseTable from '../../src/components/withdraw/RefundResponseTable'
import BankRequestTable from '../../src/components/withdraw/BankRequestTable'
import BankResponseTable from '../../src/components/withdraw/BankResponseTable'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

export default function Withdraw({ withdrawReq, totalWithdrawReq, withdrawRes, totalWithdrawRes, refundReq, totalRefundReq, refundRes, totalRefundRes, bankReq, totalBankReq, bankRes, totalBankRes }) {

    let chartTitles = [...new Map(withdrawReq ? withdrawReq.map(item => [item['statusId'], item]) : []).values()]
    let chartValues = chartTitles.map(t => withdrawReq.filter(w => w.statusId == t.statusId))
    
    const data = {
        labels: ['New', 'Req sent', 'Success', 'Req failed', 'Bank failed'],
        datasets: [
          {
            label: '# of Votes',
            data: [withdrawReq ? withdrawReq.filter(w => w.statusId === 1001).length : 0, withdrawReq ? withdrawReq.filter(w => w.statusId === 1002).length : 0, withdrawReq ? withdrawReq.filter(w => w.statusId === 1003).length : 0, withdrawReq ? withdrawReq.filter(w => w.statusId === 1004).length : 0, withdrawReq ? withdrawReq.filter(w => w.statusId === 1005).length : 0],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };

    const lineData = {
        labels: chartTitles.map(t => t.statusId == '1001' ? 'NEW' : t.statusId == '1002' ? 'REQ_SENT' : t.statusId == '1003' ? 'SUCCESS' : t.statusId == '1004' ? 'REQ_FAILED' : t.statusId == '1005' ? 'BANK_FAILED' : t.statusId == '1006' ? 'REFUND_NEW' : t.statusId == '1007' ? 'REFUND_SUCCESS' : t.statusId == '1008' ? 'REFUND_FAILED' : 'UNKHNOW_ERROR'),
        datasets: [
            {
                label: 'Тоо хэмжээ',
                data: chartValues.map(i => i.length),
                borderColor: '#ffd469',
                backgroundColor: '#fff5dd',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
            display: true,
            text: 'Withdraw Line Chart',
            },
        },
    };
    
    return (
        <div className="pb-40">
            <Head>
                <title>Withdraw Analytic</title>
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
                    <span className="uppercase cursor-default">idax withdraw analytics</span>
                </div>
            </header>

            <section className="container mx-auto mt-9 bg-white rounded">
                <div className="flex justify-between p-8 space-x-4">
                    <div className="w-1/3 border rounded shadow p-6">
                        <Pie options={{ plugins: { legend: {position: 'right'} } }} data={data} />
                    </div>
                    <div className="w-2/3 border rounded shadow p-6">
                        <Line options={options} data={lineData} />
                    </div>
                </div>
                <div className="px-8 pb-8 grid grid-cols-6 gap-4">
                    <div className="shadow p-4 space-y-2">
                        <p className="text-sm font-medium">Withdraw Req</p>
                        <span className="font-block text-2xl flex justify-center">{totalWithdrawReq ? new BigNumber(totalWithdrawReq).toFormat(0) : '--'}</span>
                    </div>
                    <div className="shadow p-4 space-y-2">
                        <p className="text-sm font-medium">Withdraw Res</p>
                        <span className="font-block text-2xl flex justify-center">{totalWithdrawRes ? new BigNumber(totalWithdrawRes).toFormat(0) : '--'}</span>
                    </div>
                    <div className="shadow p-4 space-y-2">
                        <p className="text-sm font-medium">Refund Req</p>
                        <span className="font-block text-2xl flex justify-center">{totalRefundReq ? new BigNumber(totalRefundReq).toFormat(0) : '--'}</span>
                    </div>
                    <div className="shadow p-4 space-y-2">
                        <p className="text-sm font-medium">Refund Res</p>
                        <span className="font-block text-2xl flex justify-center">{totalRefundRes ? new BigNumber(totalRefundRes).toFormat(0) : '--'}</span>
                    </div>
                    <div className="shadow p-4 space-y-2">
                        <p className="text-sm font-medium">Bank Req</p>
                        <span className="font-block text-2xl flex justify-center">{totalBankReq ? new BigNumber(totalBankReq).toFormat(0) : '--'}</span>
                    </div>
                    <div className="shadow p-4 space-y-2">
                        <p className="text-sm font-medium">Bank Res</p>
                        <span className="font-block text-2xl flex justify-center">{totalBankRes ? new BigNumber(totalBankRes).toFormat(0) : '--'}</span>
                    </div>
                </div>
            </section>
            <section className="container mx-auto">
                <WithdrawRequestTable title="Withdraw Request Table" data={withdrawReq} />
                <WithdrawResponseTable title="Withdraw Response Table" data={withdrawRes} />
                <RefundRequestTable title="Refund Request Table" data={refundReq} />
                <RefundResponseTable title="Refund Response Table" data={refundRes} />
                <BankRequestTable title="Bank Request Table" data={bankReq} />
                <BankResponseTable title="Bank Response Table" data={bankRes} />
            </section>
        </div>
    )
}

export async function getServerSideProps() {
    let fetchWithdrawReq = await axios.get(`${process.env.API_URL}/withdraw-req?limit=100`)
    let withdrawReq = await fetchWithdrawReq.data
  
    let fetchTotalWithdrawReq = await axios.get(`${process.env.API_URL}/total-withdraw-req`)
    let totalWithdrawReq = await fetchTotalWithdrawReq.data
  
    let fetchWithdrawRes = await axios.get(`${process.env.API_URL}/withdraw-res?limit=100`)
    let withdrawRes = await fetchWithdrawRes.data
  
    let fetchTotalWithdrawRes = await axios.get(`${process.env.API_URL}/total-withdraw-res`)
    let totalWithdrawRes = await fetchTotalWithdrawRes.data
  
    let fetchRefundReq = await axios.get(`${process.env.API_URL}/refund-req?limit=100`)
    let refundReq = await fetchRefundReq.data
  
    let fetchTotalRefundReq = await axios.get(`${process.env.API_URL}/total-refund-req`)
    let totalRefundReq = await fetchTotalRefundReq.data
  
    let fetchRefundRes = await axios.get(`${process.env.API_URL}/refund-res?limit=100`)
    let refundRes = await fetchRefundRes.data
  
    let fetchTotalRefundRes = await axios.get(`${process.env.API_URL}/total-refund-res`)
    let totalRefundRes = await fetchTotalRefundRes.data
  
    let fetchBankReq = await axios.get(`${process.env.API_URL}/bank-req?limit=100`)
    let bankReq = await fetchBankReq.data
  
    let fetchTotalBankReq = await axios.get(`${process.env.API_URL}/total-bank-req`)
    let totalBankReq = await fetchTotalBankReq.data
  
    let fetchBankRes = await axios.get(`${process.env.API_URL}/bank-res?limit=100`)
    let bankRes = await fetchBankRes.data
  
    let fetchTotalBankRes = await axios.get(`${process.env.API_URL}/total-bank-res`)
    let totalBankRes = await fetchTotalBankRes.data
    
    return {
        props: {
          withdrawReq,
          totalWithdrawReq,
          withdrawRes,
          totalWithdrawRes,
          refundReq,
          totalRefundReq,
          refundRes,
          totalRefundRes,
          bankReq,
          totalBankReq,
          bankRes,
          totalBankRes
        }
    }
}