import React from 'react';
import ContentManager from './components/ContentManager';
import StudentProgress from './components/StudentProgress';
import ActivityCreator from './components/ActivityCreator';
import ReportViewer from './components/ReportViewer';

const TeacherDashboard = () => {
  return (
    <div>
      <h1>Panel Docente</h1>
      <ContentManager />
      <StudentProgress />
      <ActivityCreator />
      <ReportViewer />
    </div>
  );
};

export default TeacherDashboard;
