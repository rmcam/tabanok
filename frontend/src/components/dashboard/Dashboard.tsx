import React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import ContentManager from './components/ContentManager';
import StudentProgress from './components/StudentProgress';
import ActivityCreator from './components/ActivityCreator';
import ReportViewer from './components/ReportViewer';

const Dashboard = () => {
  return (
    <div className="container mx-auto py-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-semibold mb-5">Dashboard</h1>

      {/* Herramientas para docentes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Herramientas para docentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3>Diseña lecciones cautivadoras</h3>
            <p>Facilita el aprendizaje con recursos interactivos.</p>
            <ActivityCreator />
          </div>
          <div>
            <h3>Monitorea el avance de tus estudiantes</h3>
            <p>Accede a estadísticas y reportes detallados.</p>
            <StudentProgress />
            <ReportViewer />
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Cómo funciona</h2>
        <p>Una guía sencilla para comenzar.</p>
        {/* Agregar componente de guía */}
      </section>

      {/* Evaluaciones Efectivas */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Evaluaciones Efectivas</h2>
        <ContentManager />
      </section>
    </div>
  );
};

export default Dashboard;
