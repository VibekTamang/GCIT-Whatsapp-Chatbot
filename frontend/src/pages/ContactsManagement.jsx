import React, { useState, useMemo, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Pencil, Trash2, Plus, X, Search, Phone, Mail, User, Briefcase, UserCircle2 } from 'lucide-react';
import { useContactContext } from '../context/ContactContext';

const ContactsManagement = () => {
  const { contacts, addContact, editContact, deleteContact } = useContactContext();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    contactNo: '',
    email: '',
    designation: ''
  });

  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    const query = searchQuery.toLowerCase();
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(query) ||
      contact.designation.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query)
    );
  }, [contacts, searchQuery]);

  // For the "highlight/point" feature: 
  // If the search query exactly matches or is a strong match, we can highlight the top result
  const exactMatchId = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();
    const match = contacts.find(c => c.name.toLowerCase() === query);
    return match ? match.id : null;
  }, [contacts, searchQuery]);

  const handleOpenModal = (contact = null) => {
    if (contact) {
      setFormData({
        name: contact.name,
        gender: contact.gender,
        contactNo: contact.contactNo,
        email: contact.email,
        designation: contact.designation
      });
      setCurrentContact(contact);
    } else {
      setFormData({
        name: '',
        gender: 'Male',
        contactNo: '',
        email: '',
        designation: ''
      });
      setCurrentContact(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentContact(null);
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.designation) {
      toast.error("Name and Designation are required");
      return;
    }

    if (currentContact) {
      editContact({ ...currentContact, ...formData });
      toast.success("Contact updated successfully");
    } else {
      addContact(formData);
      toast.success("Contact added successfully");
    }
    handleCloseModal();
  };

  const confirmDelete = (contact) => {
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    deleteContact(contactToDelete.id);
    toast.success("Contact deleted successfully");
    setIsDeleteModalOpen(false);
    setContactToDelete(null);
  };

  return (
    <div className="w-full h-full p-2">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Contacts Management</h1>
          <p className="text-gray-500 text-sm">Manage employee directory and contact information</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Creative Search Bar */}
          <div className="relative group min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-green transition-colors" />
            <input 
              type="text"
              placeholder="Search by name, email or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all shadow-sm text-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button 
            onClick={() => handleOpenModal()} 
            className="bg-brand-green hover:opacity-90 text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4" strokeWidth={3} />
            Add Contact
          </button>
        </div>
      </div>

      {/* Contacts Grid/Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Profile</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Information</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredContacts.map((contact) => {
                const isExactMatch = exactMatchId === contact.id;
                const isHighlighted = searchQuery && contact.name.toLowerCase().includes(searchQuery.toLowerCase());

                return (
                  <tr 
                    key={contact.id} 
                    className={`group transition-all duration-300 ${
                      isExactMatch 
                        ? 'bg-brand-green/5 border-l-4 border-brand-green' 
                        : isHighlighted 
                          ? 'bg-yellow-50/30' 
                          : 'hover:bg-gray-50/80'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-transform group-hover:scale-105 ${
                          contact.gender === 'Male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                        }`}>
                          {contact.name.charAt(0)}
                        </div>
                        {/* The "Point" indicator for search results */}
                        {isHighlighted && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-green border-2 border-white rounded-full animate-pulse shadow-sm" title="Search Match"></div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={`text-sm font-bold text-gray-900 mb-0.5 ${isExactMatch ? 'text-brand-green' : ''}`}>
                          {contact.name}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Briefcase className="w-3 h-3" />
                          {contact.designation}
                        </div>
                        <span className={`mt-1 text-[10px] px-2 py-0.5 rounded-full w-fit font-semibold tracking-wide uppercase ${
                          contact.gender === 'Male' ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'
                        }`}>
                          {contact.gender}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-xs text-gray-600 hover:text-brand-green transition-colors cursor-pointer group/item">
                          <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center group-hover/item:bg-brand-green/10 transition-colors">
                            <Phone className="w-3 h-3" />
                          </div>
                          {contact.contactNo || <span className="text-gray-300 italic">Not provided</span>}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600 hover:text-brand-green transition-colors cursor-pointer group/item">
                          <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center group-hover/item:bg-brand-green/10 transition-colors">
                            <Mail className="w-3 h-3" />
                          </div>
                          {contact.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenModal(contact)}
                          className="p-2 text-gray-500 hover:text-brand-green hover:bg-brand-green/10 rounded-lg transition-all"
                          title="Edit Contact"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => confirmDelete(contact)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete Contact"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredContacts.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <Search className="w-10 h-10 mb-2 opacity-20" />
                      <p className="text-sm font-medium">No contacts found matching your search</p>
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="text-brand-green text-xs hover:underline mt-1"
                      >
                        Clear search filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                  {currentContact ? <Pencil className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {currentContact ? 'Edit Contact' : 'New Contact Entry'}
                  </h3>
                  <p className="text-xs text-gray-500">Fill in the employee details below</p>
                </div>
              </div>
              <button onClick={handleCloseModal} className="p-2 text-gray-400 hover:text-gray-800 transition-colors rounded-full hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form id="contact-form" onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all text-sm"
                      placeholder="e.g. Jigme Dorji"
                      required
                    />
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Gender</label>
                  <div className="flex gap-2">
                    {['Male', 'Female'].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData({...formData, gender: g})}
                        className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                          formData.gender === g 
                            ? 'bg-brand-green/10 border-brand-green text-brand-green shadow-sm' 
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Designation / Role</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={formData.designation}
                    onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all text-sm"
                    placeholder="e.g. Senior Lecturer"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      value={formData.contactNo}
                      onChange={(e) => setFormData({...formData, contactNo: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all text-sm"
                      placeholder="e.g. 17XXXXXX"
                    />
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all text-sm"
                      placeholder="e.g. user@rub.edu.bt"
                    />
                  </div>
                </div>
              </div>
            </form>
            
            <div className="p-6 pt-0 flex gap-3">
              <button 
                type="button" 
                onClick={handleCloseModal}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold text-sm transition-all"
               >
                Cancel
              </button>
              <button 
                type="submit"
                form="contact-form"
                className="flex-1 bg-brand-green hover:shadow-lg hover:shadow-brand-green/20 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all"
              >
                {currentContact ? 'Update Contact' : 'Save Contact'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 className="w-10 h-10" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Contact?</h3>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Are you sure you want to remove <span className="font-bold text-gray-800">"{contactToDelete?.name}"</span> from the directory? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-bold text-sm transition-colors"
                >
                  No, Keep it
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-red-200"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsManagement;
