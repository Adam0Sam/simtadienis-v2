import './css/app.css';

import { Routes, Route } from 'react-router-dom';

import UserPage from './pages/UserPage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import AdminPage from './pages/AdminPage';
import SuperAdminPage from './pages/SuperAdminPage';
import ErrorModal from './components/modal/ErrorModal';

import PageProvider from './context/PageProvider';

/**
 * The main component of the application.
 * Renders different pages based on the current route.
 * @returns {JSX.Element} The rendered application component.
 */
export default function App() {

  return (
    <Routes>
      <Route path="/" element={
        <PageProvider>
          <UserPage />
        </PageProvider>
      } />
      <Route path="/leaderboard" element={
        <PageProvider>
          <LeaderBoardPage />
        </PageProvider>
      } />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path='/superadmin/*' element={<SuperAdminPage />} />
      <Route path="*" element={<ErrorModal
        status='404'
        errorMessage='Page not found'
      />} />
    </Routes>
  )
}