import { Route, Routes, useLocation } from 'react-router-dom';
import SigninForm from './auth/components/SigninForm';
import Dashboard from './components/dashboard/Dashboard';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import { SidebarProvider } from './components/ui/sidebar';
import PageContainer from './components/common/PageContainer';
import { AppSidebar } from './components/app-sidebar';
import { SidebarTrigger } from './components/ui/sidebar';
// import SignupForm from './auth/components/SignupForm';

function App() {
  const location = useLocation();
  const showSidebar = location.pathname !== "/";

  return (
    <SidebarProvider>
      {showSidebar && <AppSidebar />}
      <PageContainer>
        <SidebarTrigger />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<div>Página de inicio</div>} />
            <Route path="/signin" element={<SigninForm />} />
            {/* <Route path="/signup" element={<SignupForm />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          </Routes>
        </div>
      </PageContainer>
    </SidebarProvider>
  );
}

export default App;
