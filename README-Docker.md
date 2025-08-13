# Docker Dinâmico para NuboPanel

Este projeto inclui um Dockerfile dinâmico que lê a variável `VITE_ENV` do arquivo `.env` para determinar qual comando executar automaticamente.

## Como Funciona

### Dockerfile Dinâmico
- **Leitura do .env**: O container lê automaticamente o arquivo `.env` na inicialização
- **Comando dinâmico**: Executa `npm run ${VITE_ENV}` baseado na variável `VITE_ENV`
- **Fallback**: Se `VITE_ENV` não estiver definido, usa `dev` como padrão

### Comportamento por Ambiente

#### VITE_ENV=dev
- Executa: `npm run dev --host 0.0.0.0`
- Porta: 5173
- Hot reload habilitado

#### VITE_ENV=hmg
- Executa: `npm run hmg` (build) + `npm run preview --host 0.0.0.0`
- Porta: 4173
- Serve arquivos buildados

#### VITE_ENV=prod
- Executa: `npm run prod` (build) + `npm run preview --host 0.0.0.0`
- Porta: 4173
- Build otimizado para produção

## Como Usar

### Opção 1: Docker Compose (Recomendado)

```bash
# Desenvolvimento
docker-compose --profile dev up

# Homologação
docker-compose --profile hmg up

# Produção
docker-compose --profile prod up
```

### Opção 2: Docker Build Direto

```bash
# Build da imagem
docker build -t nubopanel .

# Executar com .env (usa VITE_ENV do arquivo)
docker run -p 5173:5173 -p 4173:4173 -v $(pwd):/app -v /app/node_modules nubopanel

# Executar forçando ambiente específico
docker run -e VITE_ENV=dev -p 5173:5173 -v $(pwd):/app -v /app/node_modules nubopanel
docker run -e VITE_ENV=hmg -p 8080:4173 nubopanel
docker run -e VITE_ENV=prod -p 80:4173 nubopanel
```

### Opção 3: Usando apenas .env

```bash
# Configure VITE_ENV no seu arquivo .env
echo "VITE_ENV=dev" >> .env
docker-compose up

# Ou para outros ambientes
echo "VITE_ENV=hmg" >> .env
docker-compose up
```

## Portas dos Ambientes

- **Desenvolvimento**: http://localhost:5173
- **Homologação**: http://localhost:8080
- **Produção**: http://localhost:4173

## Otimizações Incluídas

1. **Dockerfile dinâmico**: Uma única imagem que se adapta ao ambiente
2. **Alpine Linux**: Imagens menores e mais seguras
3. **Cache de dependências**: Layers otimizados para rebuild rápido
4. **Configuração por .env**: Flexibilidade total através de variáveis de ambiente
5. **Script inteligente**: Detecta automaticamente o ambiente e executa o comando correto
6. **Vite preview**: Serve arquivos buildados de forma otimizada
7. **.dockerignore**: Exclui arquivos desnecessários do contexto de build

## Vantagens da Abordagem Dinâmica

- **Uma única imagem**: Não precisa buildar imagens diferentes para cada ambiente
- **Flexibilidade**: Muda o comportamento apenas alterando variáveis de ambiente
- **Simplicidade**: Menos complexidade no Dockerfile e docker-compose
- **Reutilização**: A mesma imagem pode ser usada em qualquer ambiente
- **Configuração centralizada**: Tudo controlado pelo arquivo .env

## Variáveis de Ambiente

- `VITE_ENV`: Define qual comando npm executar (dev, hmg, prod)
- `NODE_ENV`: Definido automaticamente baseado no VITE_ENV
- Todas as variáveis do arquivo `.env` são carregadas automaticamente

## Troubleshooting

### Problema: Aplicação não carrega no navegador
- Verifique se a porta está correta
- Confirme se o container está rodando: `docker ps`

### Problema: Changes não aparecem em desenvolvimento
- Verifique se os volumes estão montados corretamente
- Use o docker-compose para desenvolvimento

### Problema: Build falha
- Verifique se o yarn.lock está atualizado
- Limpe o cache do Docker: `docker system prune`

## Comandos Úteis

```bash
# Ver logs do container
docker-compose logs -f [service-name]

# Rebuild sem cache
docker-compose build --no-cache

# Parar todos os serviços
docker-compose down

# Remover volumes
docker-compose down -v
```