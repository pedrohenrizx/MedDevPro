# FluxoÁgil - Gestão Inteligente de Escalas e Plantões Hospitalares

## 🏥 Visão Geral

O **FluxoÁgil** é uma plataforma SaaS de missão crítica desenvolvida para eliminar o caos operacional e o erro humano na gestão de escalas de profissionais de saúde em hospitais, prontos-socorros e clínicas de grande porte.

## ✨ Funcionalidades Implementadas

### 🔐 Autenticação e Segurança
- **Login/Logout** com JWT via Neon Auth
- **Registro de novos usuários**
- **Recuperação de senha**
- **Rotas protegidas** com validação de autenticação
- **Refresh automático de tokens**
- **Validação de sessão expirada**

### 📊 Dashboard Administrativo
- Visualização em tempo real de todos os setores
- Indicadores de "Saúde da Escala"
- Alertas visuais para turnos sem profissionais
- Relatórios de produtividade e controle de horas

### 📅 Gestão de Escalas
- Criação e edição de plantões
- Alocação de profissionais por especialidade
- Validação de regras de descanso (interjornada de 11h)
- Bloqueio automático de excesso de horas

### 🔄 Marketplace de Trocas
- Sistema de trocas inteligentes entre profissionais
- Notificações automáticas para profissionais elegíveis
- Validação automática de regras de compliance
- Aprovação digital com aceite de ambas as partes

### 👥 Gestão de Profissionais
- Cadastro completo com especialidade e CRM
- Histórico de plantões realizados
- Controle de documentos e certificados
- Alertas de vencimento de credenciais

### 🏢 Gestão de Setores
- Cadastro de unidades hospitalares
- Configuração de necessidades por turno
- Monitoramento de cobertura

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18+** com Vite
- **React Router DOM** para navegação com URLs amigáveis
- **Tailwind CSS** para estilização
- **Lucide React** para ícones
- **date-fns** para manipulação de datas
- **Axios** para requisições HTTP
- **Jose** para validação de JWT

### Backend & Banco de Dados
- **Neon Database** (PostgreSQL serverless)
- **Neon Auth** para autenticação segura
- **REST API** do Neon para operações CRUD

### Paleta de Cores
- `#f5f5f5` - Fundo claro
- `#e9e9e9` - Cinza claro
- `#006666` - Verde escuro (primário)
- `#008584` - Verde (secundário)
- `#cccccc` - Cinza
- `#d0dcb3` - Verde suave
- `#dabd90` - Laranja suave
- `#df7670` - Vermelho claro
- `#f4065e` - Rosa (destaque)
- `#837d72` - Marrom cinza

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
cd fluxo-agil
npm install
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build de Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
fluxo-agil/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Cabeçalho com navegação
│   │   └── ProtectedRoute.jsx  # Proteção de rotas
│   ├── context/
│   │   ├── AppContext.jsx      # Estado global da aplicação
│   │   └── AuthContext.jsx     # Autenticação e usuário
│   ├── pages/
│   │   ├── Home.jsx            # Página inicial
│   │   ├── Login.jsx           # Login
│   │   ├── Register.jsx        # Registro
│   │   ├── RecoverPassword.jsx # Recuperação de senha
│   │   ├── Dashboard.jsx       # Dashboard administrativo
│   │   ├── Scales.jsx          # Gestão de escalas
│   │   ├── Exchanges.jsx       # Trocas de plantão
│   │   ├── Professionals.jsx   # Profissionais
│   │   └── Sectors.jsx         # Setores
│   ├── services/
│   │   ├── api.js              # API REST do Neon
│   │   └── auth.js             # Serviço de autenticação
│   ├── App.jsx                 # Componente principal
│   └── main.jsx                # Entry point
├── index.html
├── tailwind.config.js
└── package.json
```

## 🔗 Rotas da Aplicação

### Públicas
- `/` - Página inicial
- `/login` - Login
- `/register` - Registro
- `/recover-password` - Recuperação de senha

### Protegidas (requer autenticação)
- `/dashboard` - Dashboard administrativo
- `/scales` - Gestão de escalas
- `/exchanges` - Trocas de plantão
- `/professionals` - Profissionais
- `/sectors` - Setores

## 🔒 Segurança

- **Autenticação JWT** com Neon Auth
- **Validação de tokens** via JWKS
- **Refresh automático** de tokens expirados
- **Rotas protegidas** com verificação de autenticação
- **Logout automático** em caso de erro 401
- **Armazenamento seguro** de tokens no localStorage

## 📈 Melhorias Futuras

### Inteligência Artificial
- [ ] Algoritmo de sugestão de trocas ideais
- [ ] Previsão de faltas baseada em histórico
- [ ] Otimização automática de escalas

### Mobile
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Check-in com geolocalização

### Integrações
- [ ] Webhooks para notificações em tempo real
- [ ] Integração com sistemas de folha de pagamento
- [ ] API para integração com EHR (Prontuário Eletrônico)

### Compliance
- [ ] Trilhas de auditoria completas
- [ ] Exportação de relatórios para conformidade legal
- [ ] Gestão avançada de credenciais e certificados

## 📄 Licença

© 2024 FluxoÁgil. Todos os direitos reservados.
