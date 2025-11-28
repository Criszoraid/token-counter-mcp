#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando entorno de desarrollo...${NC}"

# Función para matar procesos hijos al salir
cleanup() {
    echo -e "${BLUE}🛑 Deteniendo servidores...${NC}"
    kill $(jobs -p) 2>/dev/null
}
trap cleanup EXIT

# 1. Iniciar servidor de assets (Vite)
echo -e "${GREEN}📦 Iniciando servidor de assets (Vite)...${NC}"
cd web
npm run dev -- --port 4444 &
VITE_PID=$!
cd ..

# Esperar un poco a que Vite arranque
sleep 2

# 2. Iniciar servidor MCP (Python)
echo -e "${GREEN}🐍 Iniciando servidor MCP (FastAPI)...${NC}"
# Asumimos que el venv está en server/venv o .venv
if [ -d ".venv" ]; then
    source .venv/bin/activate
elif [ -d "server/venv" ]; then
    source server/venv/bin/activate
else
    echo "⚠️ No se encontró entorno virtual. Intentando usar python3 del sistema..."
fi

# Instalar dependencias si es necesario (opcional, para asegurar)
# pip install -r server/requirements.txt > /dev/null 2>&1

# Ejecutar servidor
# Usamos uvicorn directamente
uvicorn server.main:app --reload --port 8000 &
MCP_PID=$!

echo -e "${BLUE}✨ Todo listo!${NC}"
echo -e "   - Assets: http://localhost:4444"
echo -e "   - MCP Server: http://localhost:8000"
echo -e "   - Widget: http://localhost:8000/widget"

# Mantener script corriendo
wait $VITE_PID $MCP_PID
