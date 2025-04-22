import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SigninForm from './auth/components/SigninForm';
import { AppSidebar } from './components/app-sidebar';
import PageContainer from './components/common/PageContainer';
import Dashboard from './components/dashboard/Dashboard';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import HomePage from './components/HomePage';
import { SidebarProvider } from './components/ui/sidebar';
import PrivateRoute from './components/common/PrivateRoute';
import useAuth from './auth/hooks/useAuth';
// import { SidebarTrigger } from './components/ui/sidebar';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(navigate);
  const showSidebar = location.pathname !== '/' && user;

  return (
    <SidebarProvider>
      {showSidebar && <AppSidebar />}
      <PageContainer>
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SigninForm />} />
            {/* <Route path="/signup" element={<SignupForm />} /> */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/teacher-dashboard" element={<PrivateRoute><TeacherDashboard /></PrivateRoute>} />
          </Routes>
        </div>
      </PageContainer>
    </SidebarProvider>
  );
}

export default App;
