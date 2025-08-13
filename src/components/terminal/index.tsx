import React, { useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { FitAddon } from 'xterm-addon-fit';
import { useHeader } from '../../contexts/HeaderContext';

const BASE_SOCKET_URL: string = import.meta.env.VITE_SOCKET_URL as string;
const SOCKET_PATH = "/terminal/socket.io";
const TOKEN : string = import.meta.env.VITE_TOKEN as string;
const SOCKET_URL: string = `${BASE_SOCKET_URL}/terminal`;
console.log("BASE_SOCKET_URL:", BASE_SOCKET_URL);
console.log("SOCKET_URL:", SOCKET_URL);

// Configurações do terminal
const TERMINAL_OPTIONS = {
  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
  fontSize: 14,
  lineHeight: 1.2,
  cursorBlink: true,
  cursorStyle: 'bar',
  theme: {
    background: '#1e1e1e',
    foreground: '#f8f8f8',
    cursor: '#f8f8f8',
    black: '#000000',
    red: '#e06c75',
    green: '#98c379',
    yellow: '#e5c07b',
    blue: '#61afef',
    magenta: '#c678dd',
    cyan: '#56b6c2',
    white: '#dcdfe4',
    brightBlack: '#5c6370',
    brightRed: '#e06c75',
    brightGreen: '#98c379',
    brightYellow: '#e5c07b',
    brightBlue: '#61afef',
    brightMagenta: '#c678dd',
    brightCyan: '#56b6c2',
    brightWhite: '#dcdfe4'
  }
};

const Terminal = () => {
  const terminalRef = useRef(null);
  const termInstance = useRef(null);
  const socketInstance = useRef(null);
  const { setShowHeader } = useHeader();

  useEffect(() => {
    setShowHeader(false);
  }, [setShowHeader]);

  useEffect(() => {
    let Terminal, io;
    let term, socket;

    const loadScripts = async () => {
      if (!window.Terminal) {
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/xterm/lib/xterm.js";
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }
      if (!window.io) {
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src =
            "https://cdn.jsdelivr.net/npm/socket.io-client/dist/socket.io.min.js";
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }

      Terminal = window.Terminal;
      io = window.io;

      term = new Terminal(TERMINAL_OPTIONS);
      term.open(terminalRef.current);

      socket = io(SOCKET_URL, {
        path: SOCKET_PATH,
        auth: { token: TOKEN },
      });

      socket.on("output", (data) => {
        term.write(data);
      });

      term.onData((data) => {
        socket.emit("input", data);
      });
      
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      
      const resizeTerminal = () => {
        setTimeout(() => {
          fitAddon.fit();
          socket.emit("resize", {
            cols: term.cols,
            rows: term.rows,
          });
        }, 100);
      };

      window.addEventListener("resize", resizeTerminal);
      resizeTerminal();

      termInstance.current = term;
      socketInstance.current = socket;

      return () => {
        window.removeEventListener("resize", resizeTerminal);
        term.dispose();
        socket.disconnect();
      };
    };

    loadScripts();

    return () => {
      if (termInstance.current) termInstance.current.dispose();
      if (socketInstance.current) socketInstance.current.disconnect();
    };
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/xterm/css/xterm.css"
      />
      <style>{`
        .xterm {
          height: 100% !important;
          width: 100% !important;
        }
        .xterm-viewport {
          height: 100% !important;
          width: 100% !important;
        }
        .xterm-screen {
          height: 100% !important;
          width: 100% !important;
        }
      `}</style>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        fontFamily: 'Alexandria, sans-serif'
      }}>
        {/* Header do Terminal */}
        <div style={{
          background: '#2B2B2D',
          padding: '1rem 2rem',
          borderBottom: '1px solid rgba(116, 81, 171, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>

          <Link 
            to="/" 
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              background: 'rgba(116, 81, 171, 0.15)',
              borderRadius: '6px',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(116, 81, 171, 0.25)';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(116, 81, 171, 0.15)';
              e.target.style.color = 'rgba(255, 255, 255, 0.8)';
            }}
          >
            ← Voltar ao Início
          </Link>
        </div>

        {/* Terminal */}
        <div
          id="terminal"
          ref={terminalRef}
          style={{
            flex: 1,
            backgroundColor: "#1e1e1e",
            padding: "0 0 0 10px",
            margin: "0",
            boxSizing: "border-box"
          }}
        ></div>

        {/* Rodapé do Terminal */}
        <div style={{
          background: '#2B2B2D',
          padding: '0.75rem 2rem',
          borderTop: '1px solid rgba(116, 81, 171, 0.3)',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          <p style={{ margin: 0 }}>
            Terminal conectado via WebSocket • Use Ctrl+C para interromper comandos
          </p>
        </div>
      </div>
    </>
  );
};

export default Terminal;
