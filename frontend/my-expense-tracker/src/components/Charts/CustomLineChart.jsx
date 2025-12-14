import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const CustomLineChart = ({data}) => {

    const CustomTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
             {data.items?.map((item, idx) => (
            <div key={idx} className="text-xs text-gray-600 mb-1">
              <span className="font-medium">{item.category || item.source}:</span> Rs {item.amount}
            </div>
          ))}
          <p className="text-sm text-gray-600">
            Total Amount: <span className="text-sm font-medium text-gray-900">Rs {data.amount}</span>
          </p>
        </div>
      );
    }
    return null;
  }
  return (
    <div className='bg-white'>
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#875cf5" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid stroke="none"/>
                <XAxis dataKey="date" tick={{ fill: '#555', fontSize: 12 }} stroke='none' />
                <YAxis tick={{ fill: '#555', fontSize: 12 }} stroke='none' />
                <Tooltip content={<CustomTooltip/>}/>

                <Area type="monotone" dataKey="amount" stroke="#875cf5" strokeWidth={3} fill="url(#incomeGradient)" dot={{r:3 , fill: "#ab8df8"}} />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart