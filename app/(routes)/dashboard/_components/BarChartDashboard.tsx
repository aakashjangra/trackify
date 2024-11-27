import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartDashboard = ({ budgetList }: any) => {
  return (
    <div>
      <h2 className='font-bold text-xl mb-5'>Activity</h2>
      <div className='border rounded-lg p-5'>
        <ResponsiveContainer width={500} height={350}>
          <BarChart
            data={budgetList}
            margin={{
              top: 15,
            }}
          >
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='totalSpend' stackId="a" fill='#4845d2' />
            <Bar dataKey='amount' stackId="a" fill='#17a99c' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BarChartDashboard