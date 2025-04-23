import ActivityCreator from './components/ActivityCreator';
import ContentManager from './components/ContentManager';
import MultimediaGallery from './components/MultimediaGallery';
import MultimediaUploadForm from './components/MultimediaUploadForm';
import ReportViewer from './components/ReportViewer';
import StudentProgress from './components/StudentProgress';

const TeacherDashboard = () => {
  return (
    <div>
      <h1>Panel Docente</h1>
      <ContentManager />
      <StudentProgress />
      <ActivityCreator />
      <ReportViewer />
      <hr /> {/* Separador visual */}
      <MultimediaUploadForm />
      <hr /> {/* Separador visual */}
      <MultimediaGallery />
    </div>
  );
};

export default TeacherDashboard;
