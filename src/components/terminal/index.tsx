import React, { useEffect, useRef } from "react";

const SOCKET_URL: string = import.meta.env.VITE_SOCKET_URL as string;
const SOCKET_PATH = "/terminal/socket.io";
const TOKEN : string = import.meta.env.VITE_TOKEN as string;

console.log("SOCKET_URL:", SOCKET_URL);

const Terminal = () => {
  const terminalRef = useRef(null);
  const termInstance = useRef(null);
  const socketInstance = useRef(null);

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

      term = new Terminal();
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

      const resizeTerminal = () => {
        socket.emit("resize", {
          cols: term.cols,
          rows: term.rows,
        });
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
      <div
        id="terminal"
        ref={terminalRef}
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "black",
        }}
      ></div>
    </>
  );
};

export default Terminal;
