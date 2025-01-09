import React from 'react';
import './Footer.css'

export default function Footer () {
    return(
<div className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">
              <span className="icon">🐾</span>
              Dogs Breeds App
            </h3>
            <p className="footer-text">
              Un proyecto de portafolio desarrollado por Ivo Rojas
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">
              <span className="icon">💻</span>
              Tecnologías Utilizadas
            </h4>
            <ul className="tech-list">
              {["React", "Redux", "CSS", "Node.js", "JavaScript"].map((tech) => (
                <li key={tech} className="tech-item">{tech}</li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">Contacto</h4>
            <div className="contact-links">
              <a href="mailto:ivo.2001@hotmail.com" className="contact-link">
                <span className="icon">✉️</span>
                ivo.2001@hotmail.com
              </a>
              <a href="https://github.com/ivorojas" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="icon">🐙</span>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/ivo-rojas-753a95239/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="icon">💼</span>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© {new Date().getFullYear()} Ivo Rojas. </p>
          {/*<p className="portfolio-note">Desarrollado como proyecto de portafolio</p>*/}
        </div>
      </div>
    </div>
    )
}