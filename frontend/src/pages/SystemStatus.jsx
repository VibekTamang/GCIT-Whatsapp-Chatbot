import React, { useState } from 'react';
import { Database, Server, Activity, CheckCircle, XCircle, CreditCard, Calendar } from 'lucide-react';

const SystemStatus = () => {
  // Mock internal statuses
  const [statuses] = useState([
    { name: 'MongoDB Database', type: 'Database', status: 'connected', icon: Database },
    { name: 'MySQL Database', type: 'Database', status: 'connected', icon: Database },
    { name: 'Llama API', type: 'API service', status: 'working', icon: Server }
  ]);

  // We mirror the mock bill data for display
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [bills] = useState([
    { 
      service: 'MongoDB', 
      amount: '$49.99', 
      dueDate: tomorrow, 
      status: 'upcoming' 
    },
    { 
      service: 'Llama API', 
      amount: '$99.00', 
      dueDate: new Date(today.getFullYear(), today.getMonth() + 1, 15), 
      status: 'active' 
    }
  ]);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Status</h1>
        <p className="text-gray-500 mt-1">Monitor connected applications, databases, and billing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
            <Activity className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Connection Status</h2>
          </div>
          
          <div className="space-y-4">
            {statuses.map((item, idx) => {
              const Icon = item.icon;
              const isWorking = item.status === 'connected' || item.status === 'working';
              
              return (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors border border-gray-100">
                  <div className="flex items-center gap-4 mb-2 sm:mb-0">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isWorking ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      isWorking 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  {/* Simulate a problem description optionally */}
                  {!isWorking && (
                     <p className="text-xs text-red-600 mt-2 sm:hidden w-full">Error: Connection timeout.</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Billing Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
            <CreditCard className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Subscriptions & Billing</h2>
          </div>

          <div className="space-y-4">
            {bills.map((bill, idx) => {
              const isDueTomorrow = bill.dueDate.getDate() === tomorrow.getDate() && 
                                    bill.dueDate.getMonth() === tomorrow.getMonth();

              return (
                <div key={idx} className={`p-4 rounded-lg border ${
                  isDueTomorrow ? 'bg-orange-50/50 border-orange-200' : 'bg-gray-50/50 border-gray-100'
                } transition-colors`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{bill.service}</h3>
                      <div className="flex items-center gap-1.5 mt-1 text-gray-500 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Due: {formatDate(bill.dueDate)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block font-semibold text-gray-900">{bill.amount}</span>
                      <span className={`text-[10px] font-medium px-2 inline-flex py-0.5 rounded-full mt-1 ${
                        isDueTomorrow ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {isDueTomorrow ? 'DUE SOON' : 'ACTIVE'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
