import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Layout from './components/Layout';
import { AboutPage, AppointmentPage, ContactPage, DepartmentsPage, DoctorPortalPage, DoctorsPage, HomePage, LoginPage, ReportsPage, ServicesPage, SignupPage } from './components/Pages';

function App() {
  useEffect(() => { AOS.init({ duration: 650, once: true, offset: 30 }); }, []);
  return <>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctor-portal" element={<DoctorPortalPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
    <ToastContainer position="top-right" autoClose={3500} theme="light" />
  </>;
}
export default App;
