# Token Counter MCP Widget

Widget interactivo para ChatGPT que cuenta tokens y estima costes de diferentes modelos de IA.

## 🚀 Despliegue en Render

1. Sube el proyecto a GitHub
2. Conecta tu repositorio en [Render](https://render.com)
3. Render detectará automáticamente el archivo `render.yaml`
4. El servicio se desplegará automáticamente

## 🔧 Desarrollo Local

### Backend (Python)
```bash
cd server
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend (React)
```bash
cd web
npm install
npm run build
```

## 📡 Conectar a ChatGPT

1. Ve a ChatGPT → Configuración → MCP Connectors
2. Añade tu endpoint: `https://tu-app.onrender.com/mcp`
3. Usa el tool `token_counter` en tus conversaciones

## 🛠️ Tecnologías

- **Backend**: Python, FastAPI, FastMCP, tiktoken
- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Protocolo**: Model Context Protocol (MCP)
