import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import FaqsManagement from './pages/FaqsManagement';
import UnansweredQueries from './pages/UnansweredQueries';
import UserActivities from './pages/UserActivities';
import Settings from './pages/Settings';
import Login from './pages/Login';
import SystemStatus from './pages/SystemStatus';
import { FaqProvider } from './context/FaqContext';
import { ContactProvider } from './context/ContactContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';

import CategoriesManagement from './pages/CategoriesManagement';
import ContactsManagement from './pages/ContactsManagement';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <FaqProvider>
          <ContactProvider>
            <BrowserRouter>

            <Toaster position="top-right" />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/" element={<DashboardOverview />} />
                  <Route path="/faqs" element={<FaqsManagement />} />
                  <Route path="/categories" element={<CategoriesManagement />} />
                  <Route path="/contacts" element={<ContactsManagement />} />
                  <Route path="/unanswered" element={<UnansweredQueries />} />
                  <Route path="/activities" element={<UserActivities />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/system-status" element={<SystemStatus />} />
                </Route>
              </Route>
            </Routes>
            </BrowserRouter>
          </ContactProvider>
        </FaqProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}



export default App;
