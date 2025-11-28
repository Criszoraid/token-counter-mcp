# Token Counter MCP Widget

Widget interactivo para ChatGPT que cuenta tokens y estima costes de diferentes modelos de IA.

## ✨ Características

- ✅ **Widget Interactivo de React** con [OpenAI Apps SDK UI](https://www.npmjs.com/package/@openai/apps-sdk-ui)
- ✅ **Servidor MCP** en Python/FastAPI que expone herramientas a ChatGPT
- ✅ **Actualización Dinámica** - El widget se actualiza cuando ChatGPT crea/completa tareas
- ✅ **Diseño Moderno** con Tailwind CSS 4 y componentes accesibles
- ✅ **Desplegado en Render** - Listo para usar en producción
- ✅ **JSON-RPC 2.0** - Protocolo MCP estándar
- ✅ **Recursos HTML** - Widgets embebidos con `text/html+skybridge`

## 🎯 ¿Cómo Funciona?

1. **Usuario pregunta a ChatGPT**: *"Muéstrame mis tareas"* (o *"Cuenta los tokens de este texto"*)
2. **ChatGPT llama al servidor MCP** usando JSON-RPC 2.0
3. **Servidor responde** con datos estructurados + HTML del widget
4. **ChatGPT renderiza** el widget React directamente en la conversación
5. **Usuario interactúa** con el widget
6. **Widget se actualiza** dinámicamente

## 🌐 Demo en Vivo

**Servidor en Producción:**
🔗 [https://token-counter-mcp.onrender.com](https://token-counter-mcp.onrender.com)

**Endpoint MCP:**
🔗 [https://token-counter-mcp.onrender.com/mcp/sse](https://token-counter-mcp.onrender.com/mcp/sse)

**Widget de Prueba:**
🔗 [https://token-counter-mcp.onrender.com/widget](https://token-counter-mcp.onrender.com/widget)

## 📋 Requisitos

- **Node.js 18+** ([Descargar](https://nodejs.org/))
- **Python 3.10+** ([Descargar](https://www.python.org/))
- **npm** (incluido con Node.js)
- **Git** (opcional, para clonar el repositorio)

## 🛠️ Instalación Local

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Criszoraid/token-counter-mcp.git
cd token-counter-mcp
```

### 2. Instalar Dependencias de Node.js

```bash
cd web
npm install
cd ..
```

### 3. Crear Entorno Virtual de Python

**macOS/Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

**Windows:**
```powershell
python -m venv .venv
.venv\Scripts\activate
```

### 4. Instalar Dependencias de Python

```bash
pip install -r server/requirements.txt
```

## 🚀 Desarrollo Local

### Opción A: Script Automático (Recomendado)

**macOS/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Windows:**
```powershell
.\start-dev.ps1
```

Esto inicia automáticamente:
- ✅ Servidor de assets estáticos (puerto 4444)
- ✅ Servidor MCP Python/FastAPI (puerto 8000)

### Opción B: Manual

**Terminal 1 (Frontend):**
```bash
cd web
npm run dev -- --port 4444
```

**Terminal 2 (Backend):**
```bash
# Asegúrate de tener el venv activado
uvicorn server.main:app --reload --port 8000
```

