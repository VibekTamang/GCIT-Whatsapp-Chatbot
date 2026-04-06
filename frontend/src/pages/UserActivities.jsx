import React, { useState } from 'react';
import { X, Bot, User } from 'lucide-react';

// Static Data for the Table
const userList = [
  { id: 1, phone: "+975 17749436", messages: 45, lastActive: "March 20, 11:40AM" },
  { id: 2, phone: "+975 17767564", messages: 34, lastActive: "March 17, 11:20AM" },
  { id: 3, phone: "+975 17778907", messages: 12, lastActive: "March 8, 4:30PM" },
  { id: 4, phone: "+975 17778907", messages: 20, lastActive: "March 8, 3:20PM" },
  { id: 5, phone: "+975 17778907", messages: 20, lastActive: "March 8, 3:20PM" },
  { id: 6, phone: "+975 17778907", messages: 20, lastActive: "March 8, 3:20PM" },
  { id: 7, phone: "+975 17778907", messages: 20, lastActive: "March 8, 3:20PM" },
  { id: 8, phone: "+975 17778907", messages: 20, lastActive: "March 8, 3:20PM" },
  { id: 9, phone: "+975 17778907", messages: 20, lastActive: "March 8, 3:20PM" },
];

// Mock Chat History for GCIT
const mockChatHistory = [
  { sender: 'bot', text: 'Tashi Delek! Welcome to the GCIT AI Assistant. How can I help you today?', time: '11:30 AM' },
  { sender: 'user', text: 'Hi, what courses do you offer?', time: '11:32 AM' },
  { sender: 'bot', text: 'GCIT offers undergraduate degrees in Computer Science, specializing in Artificial Intelligence, Blockchain, and Full Stack Development. We also offer interactive design courses.', time: '11:32 AM' },
  { sender: 'user', text: 'What is the tuition fee for the AI program?', time: '11:35 AM' },
  { sender: 'bot', text: 'For precise tuition fee information, please visit our official admissions portal at admissions.rub.edu.bt, as it varies depending on scholarship status (RGoB vs Self-Financed).', time: '11:36 AM' },
  { sender: 'user', text: 'Okay, thank you. Where are you located?', time: '11:38 AM' },
  { sender: 'bot', text: 'Our campus is located in Kabjisa, Thimphu.', time: '11:40 AM' },
];

const UserActivities = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const openChatHistory = (user) => {
    setSelectedUser(user);
  };

  const closeChatHistory = () => {
    setSelectedUser(null);
  };

  return (
    <div className="w-full h-full p-2">
      {/* Header Area */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">User Activity & Logs</h1>
        <p className="text-gray-500 text-sm">View conversation history and track user interactions</p>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-4">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-gray-900 font-bold text-lg">User List</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-1/4">Phone Number</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-center w-1/4">Total Message</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-1/4">Last Active</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right w-1/4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {userList.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-800">{user.phone}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">{user.messages}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 truncate">{user.lastActive}</td>
                  <td className="px-6 py-4 flex justify-end mt-1.5 align-middle">
                    <button 
                      onClick={() => openChatHistory(user)}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
                    >
                      View History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chat History Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all border border-gray-200 m-4 flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-none mb-1">
                    {selectedUser.phone}
                  </h3>
                  <p className="text-xs text-brand-green font-semibold">User Conversation</p>
                </div>
              </div>
              <button 
                onClick={closeChatHistory} 
                className="text-gray-400 hover:text-gray-800 transition-colors bg-white border border-gray-200 rounded p-1.5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Chat Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6">
              {mockChatHistory.map((msg, idx) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div key={idx} className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'} items-end gap-2`}>
                      
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isBot ? 'bg-brand-green/20' : 'bg-blue-100'}`}>
                        {isBot ? <Bot className="w-4 h-4 text-brand-green" /> : <User className="w-4 h-4 text-blue-600" />}
                      </div>

                      {/* Message Bubble */}
                      <div className="flex flex-col gap-1">
                        <div className={`p-4 rounded-2xl text-sm shadow-sm ${
                          isBot 
                            ? 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm' 
                            : 'bg-blue-600 text-white rounded-br-sm'
                        }`}>
                          {msg.text}
                        </div>
                        <span className={`text-[10px] text-gray-400 ${isBot ? 'text-left ml-1' : 'text-right mr-1'}`}>
                          {msg.time}
                        </span>
                      </div>
                      
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer (Read-only status) */}
            <div className="p-4 bg-white border-t border-gray-100 text-center shrink-0">
              <p className="text-xs text-gray-400 font-medium">History is read-only. Responses should be added via Unanswered Queries.</p>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default UserActivities;
