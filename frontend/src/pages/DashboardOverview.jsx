import React from 'react';
import { Users, MessageSquareText, CheckSquare, AlertCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

// Dummy data for charts
const lineChartData = Array.from({ length: 30 }, (_, i) => ({
  date: String(i + 1).padStart(2, '0'),
  messages: Math.floor(Math.random() * 150) + 30
}));

const barChartData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  count: Math.floor(Math.random() * 200) + 10
}));

// Dummy FAQ data
const faqData = [
  { id: 1, question: "What are the admission requirements?", times: 342, percentage: 90 },
  { id: 2, question: "How do I apply for scholarships?", times: 287, percentage: 75 },
  { id: 3, question: "What programs are available?", times: 265, percentage: 70 },
  { id: 4, question: "What is the tuition fee?", times: 198, percentage: 50 },
  { id: 5, question: "When does registration start?", times: 176, percentage: 40 },
];

const StatCard = ({ title, value, icon: Icon, iconColorClass }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col relative">
    <h3 className="text-gray-500 font-medium text-sm mb-4">{title}</h3>
    <span className="text-3xl font-bold text-gray-800">{value}</span>
    <div className={`absolute top-6 right-6 ${iconColorClass} bg-opacity-10 p-2 rounded-lg`}>
      <Icon className={`w-5 h-5 ${iconColorClass.replace('bg-', 'text-').replace('-100', '-500').replace('bg-opacity-10', '')}`} />
    </div>
  </div>
);

const DashboardOverview = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm">Real-time monitoring and analytics for GCIT AI Chatbot</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Users" 
          value="27" 
          icon={Users} 
          iconColorClass="bg-blue-100 text-blue-500" 
        />
        <StatCard 
          title="Total Messages" 
          value="129" 
          icon={MessageSquareText} 
          iconColorClass="bg-green-100 text-green-500" 
        />
        <StatCard 
          title="Queries Handled" 
          value="89" 
          icon={CheckSquare} 
          iconColorClass="bg-purple-100 text-purple-500" 
        />
        <StatCard 
          title="Unanswered Queries" 
          value="6" 
          icon={AlertCircle} 
          iconColorClass="bg-red-100 text-red-500" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Line Chart Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-800 font-semibold mb-6">Message Over Time(Last 30 Days)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#aaa' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#aaa' }} />
                <Tooltip />
                <Line type="linear" dataKey="messages" stroke="#f28b22" strokeWidth={2} dot={{ r: 3, fill: '#f28b22' }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-800 font-semibold mb-6">Peak Usage Hours</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#aaa' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#aaa' }} />
                <Tooltip cursor={{ fill: '#f5f5f5' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="mb-6">
          <h3 className="text-gray-800 font-bold mb-1">Frequently Asked Questions</h3>
          <p className="text-gray-500 text-sm">Most common user queries</p>
        </div>
        
        <div className="space-y-4">
          {faqData.map((faq) => (
            <div key={faq.id} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-semibold shrink-0">
                  {faq.id}
                </div>
                <span className="text-gray-700 text-sm font-medium">{faq.question}</span>
              </div>
              <div className="flex items-center gap-4 w-1/4 min-w-[120px]">
                <span className="text-gray-500 text-xs whitespace-nowrap">{faq.times} times</span>
                <div className="w-full bg-gray-100 rounded-full h-1.5 hidden sm:block">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${faq.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
