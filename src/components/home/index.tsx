import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { useHeader } from '../../contexts/HeaderContext';

const Home = () => {
  const { setShowHeader } = useHeader();

  // Garante que o header permaneça oculto na página inicial
  useEffect(() => {
    setShowHeader(false);
  }, [setShowHeader]);
  return (
    <div className="home-container">
      <header className="home-header">
        <img src="/icon2.png" alt="Nubo Panel" />
        <img src="/logo2.png" alt="Nubo Panel" />
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
            <p>Monitoramento em tempo real de recursos do sistema, containers Docker e métricas de performance.</p>
            <Link to="/monitoring" className="feature-link">
              Acessar Monitoramento
            </Link>
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
        <div>
          <p>© 2025 A6N Tecnologia. Todos os direitos reservados.</p>
          <p>Desenvolvido com ❤️ para administração moderna de infraestrutura.</p>
          {/* <p>CNPJ: 00.000.000/0001-00 • Rua Exemplo, 123 • São Paulo/SP</p> */}
        </div>
      </footer>
    </div>
  );
};

export default Home;