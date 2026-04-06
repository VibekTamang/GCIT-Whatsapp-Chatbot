import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import { useFaqContext } from '../context/FaqContext';

const FaqsManagement = () => {
  const { faqs, addFaq, editFaq, deleteFaq } = useFaqContext();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [currentFaq, setCurrentFaq] = useState(null); // null means adding new
  const [faqToDelete, setFaqToDelete] = useState(null);

  // Form State
  const [formData, setFormData] = useState({ question: '', answer: '', category: '' });

  const handleOpenModal = (faq = null) => {
    if (faq) {
      setFormData({ question: faq.question, answer: faq.answer, category: faq.category });
      setCurrentFaq(faq);
    } else {
      setFormData({ question: '', answer: '', category: '' });
      setCurrentFaq(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentFaq(null);
    setFormData({ question: '', answer: '', category: '' });
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    if (!formData.question || !formData.answer || !formData.category) {
      toast.error("Please fill all fields");
      return;
    }

    if (currentFaq) {
      // Edit
      editFaq({ 
        ...currentFaq, 
        question: formData.question, 
        answer: formData.answer, 
        category: formData.category
      });
      toast.success("FAQ edited successfully");
    } else {
      // Add
      addFaq({
        question: formData.question,
        answer: formData.answer,
        category: formData.category
      });
      toast.success("FAQ added successfully");
    }
    handleCloseModal();
  };

  const confirmDelete = (faq) => {
    setFaqToDelete(faq);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    deleteFaq(faqToDelete.id);
    toast.success("FAQ deleted successfully");
    setIsDeleteModalOpen(false);
    setFaqToDelete(null);
  };

  return (
    <div className="w-full h-full p-2">
      {/* Header Area */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">FAQs Management</h1>
          <p className="text-gray-500 text-sm">Manage your Knowledge Base and FAQ entries</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="bg-brand-green hover:opacity-90 text-white px-5 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 transition-opacity"
        >
          <Plus className="w-4 h-4" strokeWidth={3} />
          Add FAQs
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-4">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-gray-900 font-bold text-lg">FAQ Entries</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-1/2">Question</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Category</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-center">Count</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Timestamp</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {faqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 mb-1">{faq.question}</div>
                    <div className="text-xs text-gray-500 truncate max-w-md">{faq.answer}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{faq.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">{faq.count}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{faq.timestamp}</td>
                  <td className="px-6 py-4 flex justify-end gap-4 mt-1.5 align-middle">
                    <button 
                      onClick={() => handleOpenModal(faq)}
                      className="text-gray-700 hover:text-black transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => confirmDelete(faq)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {faqs.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No FAQs found. Add one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden translate-y-0 transform transition-all border border-gray-200 m-4">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                {currentFaq ? 'Edit FAQ' : 'Add New FAQ'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-800 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form id="faq-form" onSubmit={handleSave} className="p-6 space-y-5 bg-white">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Category</label>
                <input 
                  type="text" 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                  placeholder="e.g. Courses, Location, General"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Question</label>
                <input 
                  type="text" 
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                  placeholder="What is your question?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Answer</label>
                <textarea 
                  value={formData.answer}
                  onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green h-28 resize-none transition-all"
                  placeholder="Provide the answer..."
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
                form="faq-form"
                className="bg-brand-green hover:opacity-90 text-white px-6 py-2.5 rounded-md font-semibold text-sm transition-opacity"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm overflow-hidden transform transition-all border border-gray-200 m-4">
            <div className="p-6 bg-white text-center">
              <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Validation</h3>
              <p className="text-sm text-gray-600 mb-8">
                Are you sure you want to delete this FAQ entry? This will permanently remove the data.
              </p>
              <div className="flex justify-center gap-3 w-full">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-2.5 rounded-md font-semibold text-sm transition-colors flex-1"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-md font-semibold text-sm transition-colors flex-1"
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqsManagement;
