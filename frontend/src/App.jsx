import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import FaqsManagement from './pages/FaqsManagement';
import UnansweredQueries from './pages/UnansweredQueries';
import UserActivities from './pages/UserActivities';
import Settings from './pages/Settings';
import { FaqProvider } from './context/FaqContext';

function App() {
  return (
    <FaqProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/faqs" element={<FaqsManagement />} />
            <Route path="/unanswered" element={<UnansweredQueries />} />
            <Route path="/activities" element={<UserActivities />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FaqProvider>
  );
}

export default App;
