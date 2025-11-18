<#
Stops the backend started by `run-backend.ps1` using the PID stored in `backend.pid`.
Usage: .\stop-backend.ps1
#>

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$pidFile = Join-Path $scriptDir 'backend.pid'

if (-not (Test-Path $pidFile)) {
    Write-Host "PID file not found at $pidFile. Nothing to stop."
    exit 0
}

$pid = Get-Content $pidFile | Select-Object -First 1
if (-not $pid) {
    Write-Error "PID file empty or unreadable"
    exit 1
}

try {
    Write-Host "Stopping backend PID $pid"
    Stop-Process -Id $pid -Force -ErrorAction Stop
    Remove-Item $pidFile -ErrorAction SilentlyContinue
    Write-Host "Backend stopped and PID file removed."
} catch {
    Write-Error "Failed to stop process $pid: $_"
    exit 1
}
