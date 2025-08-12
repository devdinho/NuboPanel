import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>
          <img src="/icon2.png" alt="Nubo Panel" />
          Nubo Panel
        </h1>
        <p>Painel administrativo e operacional moderno</p>
      </header>

      <main className="home-main">
        <section className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🖥️</div>
            <h3>Terminal Web Interativo</h3>
            <p>Execute comandos shell via WebSocket com terminal nativo no navegador usando Xterm.js</p>
            <Link to="/terminal" className="feature-link">
              Acessar Terminal
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Observabilidade de Infraestrutura</h3>
            <p>Monitore CPU, RAM, disco e temperatura com dashboard de status do sistema</p>
            <div className="feature-link disabled">
              Em breve
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🐳</div>
            <h3>Monitoramento Docker</h3>
            <p>Gerencie containers com listagem, logs em tempo real e ações de start/stop/restart</p>
            <div className="feature-link disabled">
              Em breve
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Deploy Automatizado</h3>
            <p>Execute pipelines locais e deploy remoto via SSH/API com logs e histórico</p>
            <div className="feature-link disabled">
              Em breve
            </div>
          </div>
        </section>

        <section className="tech-stack">
          <h3>🚀 Tecnologias Utilizadas</h3>
          <div className="tech-list">
            <span className="tech-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
              React 19
            </span>
            <span className="tech-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite" />
              Vite 7
            </span>
            <span className="tech-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" alt="Socket.IO" />
              Socket.IO
            </span>
            <span className="tech-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="Xterm.js" />
              Xterm.js
            </span>
            <span className="tech-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" />
              TypeScript
            </span>
            <span className="tech-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" />
              Docker API
            </span>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>Desenvolvido com ❤️ para administração de infraestrutura</p>
      </footer>
    </div>
  );
};

export default Home;