Write-Host "🚀 Iniciando entorno de desarrollo..." -ForegroundColor Blue

# 1. Iniciar servidor de assets (Vite) en segundo plano
Write-Host "📦 Iniciando servidor de assets (Vite)..." -ForegroundColor Green
Start-Process -FilePath "npm" -ArgumentList "run dev -- --port 4444" -WorkingDirectory "web" -NoNewWindow

# Esperar un poco
Start-Sleep -Seconds 2

# 2. Iniciar servidor MCP (Python)
Write-Host "🐍 Iniciando servidor MCP (FastAPI)..." -ForegroundColor Green

# Activar entorno virtual si existe
if (Test-Path ".venv\Scripts\Activate.ps1") {
    . .venv\Scripts\Activate.ps1
} elseif (Test-Path "server\venv\Scripts\Activate.ps1") {
    . server\venv\Scripts\Activate.ps1
}

# Ejecutar servidor
uvicorn server.main:app --reload --port 8000

# Nota: En PowerShell, si uvicorn corre en primer plano, bloqueará el script.
# Si se cierra la ventana, se cierran ambos procesos.
