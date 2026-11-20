import { Link } from 'react-router-dom';
export default function Footer() {
  return <footer className="site-footer"><div className="shell footer-grid">
    <section><div className="footer-brand"><i className="bi bi-activity" /> Medi<span>Lab</span></div><p>Clear reports, caring people, and a simpler way to manage your health. MediLab Diagnostics brings dependable testing closer to every family.</p><div className="socials"><a href="https://www.linkedin.com" aria-label="LinkedIn"><i className="bi bi-linkedin" /></a><a href="https://www.instagram.com" aria-label="Instagram"><i className="bi bi-instagram" /></a><a href="https://www.facebook.com" aria-label="Facebook"><i className="bi bi-facebook" /></a></div></section>
    <section><h4>Explore MediLab</h4><Link to="/about">About us</Link><Link to="/services">Tests and health packages</Link><Link to="/departments">Laboratory departments</Link><Link to="/doctors">Medical leadership</Link></section>
    <section><h4>Patient support</h4><Link to="/appointment">Book a home collection</Link><Link to="/reports">View test reports</Link><Link to="/contact">Contact and locations</Link><Link to="/login">Patient sign in</Link></section>
    <section><h4>Visit or call</h4><p><i className="bi bi-geo-alt" /> 24 Health Avenue, Sector 18<br />New Delhi 110001</p><p><i className="bi bi-telephone" /> +91 1800 120 2026</p><p><i className="bi bi-envelope" /> care@medilabdiagnostics.in</p></section>
  </div><div className="footer-bottom"><div className="shell">Copyright 2026 MediLab Diagnostics. Built for reliable healthcare access. <span>Privacy policy &nbsp; | &nbsp; Terms of use</span></div></div></footer>;
}
