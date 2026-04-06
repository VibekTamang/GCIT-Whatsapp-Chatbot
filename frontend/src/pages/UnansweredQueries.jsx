import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AlertCircle, CheckSquare, Plus, X, User } from 'lucide-react';
import { useFaqContext } from '../context/FaqContext';

const UnansweredQueries = () => {
  const { unansweredQueries, resolvedToday, resolveQuery } = useFaqContext();
  const [activeQuery, setActiveQuery] = useState(null);
  const [formData, setFormData] = useState({ category: '', answer: '' });

  const handleOpenModal = (query) => {
    setActiveQuery(query);
    setFormData({ category: '', answer: '' });
  };

  const handleCloseModal = () => {
    setActiveQuery(null);
    setFormData({ category: '', answer: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.answer) {
      toast.error("Please fill all fields");
      return;
    }

    resolveQuery(activeQuery.id, {
      question: activeQuery.question,
      answer: formData.answer,
      category: formData.category
    });

    toast.success("Response added to FAQs successfully!");
    handleCloseModal();
  };

  return (
    <div className="w-full h-full p-2">
      {/* Header Area */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Unanswered Queries</h1>
        <p className="text-gray-500 text-sm">Review and Respond to queries</p>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-row items-center gap-6 min-w-[280px]">
          <div className="bg-red-50 text-red-500 p-4 rounded-xl border border-red-100">
            <AlertCircle className="w-8 h-8" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-gray-500 font-medium text-sm mb-1 line-clamp-1">Pending Reviews</h3>
            <span className="text-3xl font-bold text-gray-900">{unansweredQueries.length}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-row items-center gap-6 min-w-[280px]">
          <div className="bg-green-50 text-brand-green p-4 rounded-xl border border-green-100">
            <CheckSquare className="w-8 h-8" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-gray-500 font-medium text-sm mb-1 line-clamp-1">Resolved Today</h3>
            <span className="text-3xl font-bold text-gray-900">{resolvedToday}</span>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-2">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-gray-900 font-bold text-lg">Out-of-Knowledge Queries</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-1/4">User</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-2/4">Query</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Timestamp</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {unansweredQueries.map((query) => (
                <tr key={query.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
                      <span className="text-sm text-gray-600">{query.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 mb-1.5">{query.question}</div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-yellow-100 text-yellow-700">
                      Intent: {query.intent}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{query.timestamp}</td>
                  <td className="px-6 py-4 text-right align-middle">
                    <button 
                      onClick={() => handleOpenModal(query)}
                      className="inline-flex items-center gap-1.5 bg-brand-green hover:opacity-90 text-white px-3 py-1.5 rounded text-xs font-semibold shadow-sm transition-opacity"
                    >
                      <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                      Add Response
                    </button>
                  </td>
                </tr>
              ))}
              {unansweredQueries.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    No pending queries. You're all caught up!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Response Modal */}
      {activeQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
           <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden transform transition-all border border-gray-200 m-4">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Provide Response</h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-800 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form id="response-form" onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
              {/* Context Block showing the query */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-100 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">User Query</span>
                <p className="text-gray-900 text-sm font-medium">{activeQuery.question}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Category</label>
                <input 
                  type="text" 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                  placeholder="e.g. Policies, Payments, General"
                  required
                />
              </div>
            
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Your Final Response</label>
                <textarea 
                  value={formData.answer}
                  onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green h-28 resize-none transition-all"
                  placeholder="Type the official answer to add to the knowledge base..."
                  required
                />
              </div>
            </form>

            <div className="p-6 pt-0 bg-white flex justify-end gap-3 flex-row border-t border-gray-100 mt-2 p-4">
               <button 
                type="button" 
                onClick={handleCloseModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2.5 rounded-md font-semibold text-sm transition-colors"
               >
                Cancel
              </button>
              <button 
                type="submit"
                form="response-form"
                className="bg-brand-green hover:opacity-90 text-white px-6 py-2.5 rounded-md font-semibold text-sm transition-opacity"
              >
                Add Response & Resolve
              </button>
            </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default UnansweredQueries;
