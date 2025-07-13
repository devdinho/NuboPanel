# 🌥️ Nubo Panel

**Nubo Panel** é um painel administrativo e operacional moderno, desenvolvido com **React 19 + Vite**, que se conecta a um backend externo para:

- Gerenciar recursos dinâmicos (como feature flags e ambientes)
- Executar comandos em tempo real via terminal web
- Monitorar containers Docker e recursos da máquina

---

## 🚀 Tecnologias Utilizadas

- [React 19](https://react.dev/)
- [Vite 7](https://vitejs.dev/)
- [Axios](https://axios-http.com/) – API REST
- [TypeScript](https://www.typescriptlang.org/)
- [Docker SDK/API](https://docs.docker.com/engine/api/) (no backend)

---

## 🧠 Visão Geral das Funcionalidades

### 🧪 Gestão de Recursos Dinâmicos
- Feature flags com variantes e rollout controlado
- Ambientes e configurações específicas
- CRUD completo dos recursos via API

---

## 📦 Instalação

```bash
git clone https://github.com/devdinho/nubopanel.git
cd nubo-panel
yarn install
````

---

## 🧪 Ambiente de Desenvolvimento

```bash
npm run dev
```

Abra:
➡️ `http://localhost:5173`

---

## 🔌 Comunicação com Backends

### 1. API REST (Sistema de Recursos)

```ts
const api = axios.create({
  baseURL: 'https://nubo-service.a6n.tech',
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

---

## 🔐 Segurança

* Tokens JWT validados no backend
* Sessões com expiração
* Requisições protegidas com headers `Authorization`
* (Planejado) Autenticação por OAuth/SAML para ambientes corporativos

---

## ✨ Roadmap

* [ ] Integração com sistema de recursos
* [ ] Autenticação JWT
* [ ] Orquestração de deploy com histórico e rollback
* [ ] Modo escuro e responsivo
* [ ] Logs centralizados por ambiente

---

## 👤 Autor

Anderson Freitas
[GitHub](https://github.com/devdinho)
[LinkedIn](https://linkedin.com/in/freitas-anderson/)

---

## 📄 Licença

MIT
