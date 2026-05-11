import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Pencil, Trash2, Plus, X, FolderTree } from 'lucide-react';
import { useFaqContext } from '../context/FaqContext';

const CategoriesManagement = () => {
  const { categories, addCategory, editCategory, deleteCategory, faqs } = useFaqContext();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [currentCategory, setCurrentCategory] = useState(null); // null means adding new
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [formData, setFormData] = useState({ name: '' });

  const handleOpenModal = (category = null) => {
    if (category) {
      setFormData({ name: category.name });
      setCurrentCategory(category);
    } else {
      setFormData({ name: '' });
      setCurrentCategory(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
    setFormData({ name: '' });
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    // Check for duplicates
    const isDuplicate = categories.some(cat => 
      cat.name.toLowerCase() === formData.name.trim().toLowerCase() && 
      (!currentCategory || cat.id !== currentCategory.id)
    );

    if (isDuplicate) {
      toast.error("Category name already exists");
      return;
    }

    if (currentCategory) {
      editCategory({ 
        ...currentCategory, 
        name: formData.name.trim() 
      });
      toast.success("Category updated successfully");
    } else {
      addCategory(formData.name.trim());
      toast.success("Category added successfully");
    }
    handleCloseModal();
  };

  const confirmDelete = (category) => {
    // Check if category is "General" - prevent deletion of default
    if (category.name === "General") {
      toast.error("Default category 'General' cannot be deleted");
      return;
    }
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    deleteCategory(categoryToDelete.id);
    toast.success("Category deleted successfully");
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const getFaqCount = (categoryName) => {
    return faqs.filter(faq => faq.category === categoryName).length;
  };

  return (
    <div className="w-full h-full p-2">
      {/* Header Area */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Categories Management</h1>
          <p className="text-gray-500 text-sm">Manage FAQ categories and organize your knowledge base</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleOpenModal()} 
            className="bg-brand-green hover:opacity-90 text-white px-5 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 transition-opacity shadow-sm"
          >
            <Plus className="w-4 h-4" strokeWidth={3} />
            Add Category
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-4">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-gray-900 font-bold text-lg">FAQ Categories</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Icon</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900">Category Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-center">FAQs Linked</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 w-16">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-brand-green">
                      <FolderTree className="w-5 h-5" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                      {getFaqCount(category.name)}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-4 mt-1.5 align-middle">
                    <button 
                      onClick={() => handleOpenModal(category)}
                      className="text-gray-700 hover:text-black transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => confirmDelete(category)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete"
                      disabled={category.name === "General"}
                    >
                      <Trash2 className={`w-5 h-5 ${category.name === "General" ? 'opacity-30 cursor-not-allowed' : ''}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden translate-y-0 transform transition-all border border-gray-200 m-4">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                {currentCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-800 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form id="category-form" onSubmit={handleSave} className="p-6 space-y-5 bg-white">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Category Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
                  placeholder="e.g. Finance, Support, IT Services"
                  required
                  autoFocus
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
                form="category-form"
                className="bg-brand-green hover:opacity-90 text-white px-6 py-2.5 rounded-md font-semibold text-sm transition-opacity"
              >
                {currentCategory ? 'Update' : 'Add'}
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Category</h3>
              <p className="text-sm text-gray-600 mb-8">
                Are you sure you want to delete <span className="font-bold">"{categoryToDelete?.name}"</span>? 
                All FAQs in this category will be moved to <span className="font-bold text-brand-green">General</span>.
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
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesManagement;
