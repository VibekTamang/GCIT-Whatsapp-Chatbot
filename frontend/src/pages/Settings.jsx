import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { User, Shield, Plus, Trash2, X } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Settings = () => {
  const { addNotification } = useNotification();
  // --- Profile State ---
  const [email, setEmail] = useState('admin.gcit@rub.edu.bt');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  // --- Admins State ---
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Super Admin', email: 'admin.gcit@rub.edu.bt', role: 'System Admin' },
    { id: 2, name: 'Tenzin Wangchuk', email: 'tenzin.w@rub.edu.bt', role: 'Moderator' }
  ]);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [newAdminForm, setNewAdminForm] = useState({ name: '', email: '', role: 'Moderator', password: '' });

  // --- Profile Handlers ---
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (isChangingPassword) {
      if (passwords.new !== passwords.confirm) {
        toast.error("New passwords do not match!");
        return;
      }
      if (passwords.new.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return;
      }
      toast.success("Profile and Password updated successfully!");
    } else {
      toast.success("Profile updated successfully!");
    }
    
    addNotification({
      id: Date.now() + Math.random(),
      title: 'Profile Updated',
      message: 'Admin profile settings were modified.',
      type: 'info',
      date: new Date().toISOString()
    });

    setIsChangingPassword(false);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleProfileCancel = () => {
    setEmail('admin.gcit@rub.edu.bt');
    setIsChangingPassword(false);
    setPasswords({ current: '', new: '', confirm: '' });
    toast("Changes cancelled", { icon: "ℹ️" });
  };

  // --- Admins Handlers ---
  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (!newAdminForm.name || !newAdminForm.email || !newAdminForm.password) {
      toast.error("Please fill all required fields");
      return;
    }
    const newAdmin = {
      id: Date.now(),
      name: newAdminForm.name,
      email: newAdminForm.email,
      role: newAdminForm.role
    };
    setAdmins([newAdmin, ...admins]);
    toast.success("Administrator successfully added.");

    addNotification({
      id: Date.now() + Math.random(),
      title: 'New Admin Added',
      message: `${newAdminForm.name} was added as a ${newAdminForm.role}.`,
      type: 'info',
      date: new Date().toISOString()
    });

    setIsAdminModalOpen(false);
    setNewAdminForm({ name: '', email: '', role: 'Moderator', password: '' });
  };

  const confirmDeleteAdmin = (admin) => {
    if (admin.role === 'System Admin') {
      toast.error("Cannot remove the primary System Admin.");
      return;
    }
    setAdminToDelete(admin);
    setIsDeleteModalOpen(true);
  };

  const executeDeleteAdmin = () => {
    setAdmins(admins.filter(a => a.id !== adminToDelete.id));
    toast.success("Administrator removed.");

    addNotification({
      id: Date.now() + Math.random(),
      title: 'Admin Access Revoked',
      message: `Access was revoked for ${adminToDelete.name}.`,
      type: 'warning',
      date: new Date().toISOString()
    });

    setIsDeleteModalOpen(false);
    setAdminToDelete(null);
  };

  return (
    <div className="w-full h-full p-2 max-w-6xl mx-auto space-y-10">
      {/* Header Area */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Settings</h1>
        <p className="text-gray-500 text-sm">Manage your profile and system access</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* LEFT COLUMN: Profile Settings */}
        <div className="bg-white rounded-md shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-gray-400" /> My Profile
          </h2>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
                <User className="w-8 h-8 text-white" />
              </div>
              <button type="button" className="text-blue-500 font-bold text-xs tracking-wide hover:text-blue-700 transition-colors uppercase">
                CHANGE
              </button>
            </div>

            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                Email
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-green text-sm text-gray-800 transition-colors"
                required
              />
            </div>

            {!isChangingPassword ? (
              <div>
                <button type="button" onClick={() => setIsChangingPassword(true)} className="text-blue-500 font-medium text-sm hover:text-blue-700 transition-colors">
                  Change Password
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-5 space-y-4">
                <h4 className="text-sm font-bold text-gray-700 mb-2">Update Password</h4>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Current Password</label>
                  <input type="password" value={passwords.current} onChange={(e) => setPasswords({...passwords, current: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">New Password</label>
                  <input type="password" value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Confirm New Password</label>
                  <input type="password" value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500" required />
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" className="bg-[#78b346] hover:bg-[#689d3a] text-white px-6 py-2 text-sm font-semibold rounded shadow-sm transition-colors">
                Update
              </button>
              <button type="button" onClick={handleProfileCancel} className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 px-6 py-2 text-sm font-bold rounded shadow-sm transition-colors uppercase tracking-widest">
                CANCEL
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Admin Management */}
        <div className="bg-white rounded-md shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
               <Shield className="w-5 h-5 text-gray-400" /> Admin Access
            </h2>
            <button 
              onClick={() => setIsAdminModalOpen(true)}
              className="bg-brand-green hover:opacity-90 text-white px-4 py-2 rounded-md font-medium text-xs flex items-center gap-1.5 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={3} />
              Add Admin
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-3 font-semibold">User</th>
                  <th className="px-5 py-3 font-semibold">Role</th>
                  <th className="px-5 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-50/30">
                    <td className="px-5 py-3">
                      <div className="text-sm font-bold text-gray-800">{admin.name}</div>
                      <div className="text-xs text-gray-500">{admin.email}</div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        admin.role === 'System Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      {admin.role !== 'System Admin' && (
                        <button 
                          onClick={() => confirmDeleteAdmin(admin)} 
                          className="text-red-400 hover:text-red-600 transition-colors"
                          title="Remove Admin"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Admin Modal */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Add Administrator</h3>
              <button type="button" onClick={() => setIsAdminModalOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form id="add-admin-form" onSubmit={handleAddAdmin} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <input type="text" value={newAdminForm.name} onChange={(e) => setNewAdminForm({...newAdminForm, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-brand-green hover:border-gray-400" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Work Email</label>
                <input type="email" value={newAdminForm.email} onChange={(e) => setNewAdminForm({...newAdminForm, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-brand-green hover:border-gray-400" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                <input type="password" value={newAdminForm.password} onChange={(e) => setNewAdminForm({...newAdminForm, password: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-brand-green hover:border-gray-400" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Permission Role</label>
                <select value={newAdminForm.role} onChange={(e) => setNewAdminForm({...newAdminForm, role: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-brand-green bg-white">
                  <option value="Moderator">Moderator</option>
                  <option value="System Admin">System Admin</option>
                </select>
              </div>
            </form>
            <div className="p-5 pt-0 flex gap-3">
              <button type="button" onClick={() => setIsAdminModalOpen(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm py-2 rounded transition-colors">Cancel</button>
              <button type="submit" form="add-admin-form" className="flex-1 bg-brand-green hover:opacity-90 text-white font-semibold text-sm py-2 rounded transition-opacity">Add Admin</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Admin Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4 p-6 text-center">
            <Trash2 className="w-10 h-10 text-red-500 mx-auto mb-3" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-gray-900 mb-1">Revoke Access?</h3>
            <p className="text-sm text-gray-500 mb-6">
              This will permanently delete access rights for <b>{adminToDelete?.name}</b>.
            </p>
            <div className="flex justify-center gap-3 w-full">
              <button onClick={() => setIsDeleteModalOpen(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-semibold text-sm transition-colors flex-1">Cancel</button>
              <button onClick={executeDeleteAdmin} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-semibold text-sm transition-colors flex-1">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
