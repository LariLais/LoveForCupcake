<#
Starts the backend jar in background. Usage:
  .\run-backend.ps1 [-Rebuild]

Options:
  -Rebuild : Run 'mvn -DskipTests package' before starting if the jar is missing or you want a fresh build.

The script writes the started JVM PID to `backend.pid` in the same folder.
#>

param(
    [switch]$Rebuild
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$jar = Join-Path $scriptDir 'target\backend-1.0.0.jar'
$pidFile = Join-Path $scriptDir 'backend.pid'

#if jar missing or rebuild requested, build
if ($Rebuild -or -not (Test-Path $jar)) {
    Write-Host "Building backend jar..."

    # Try to find maven in several common locations: MAVEN_HOME, M2_HOME, user profile standard install, or PATH
    $mvnCandidates = @()
    if ($env:MAVEN_HOME) { $mvnCandidates += Join-Path $env:MAVEN_HOME 'bin\mvn.cmd' }
    if ($env:M2_HOME) { $mvnCandidates += Join-Path $env:M2_HOME 'bin\mvn.cmd' }
    $mvnCandidates += Join-Path $env:USERPROFILE 'maven\apache-maven-3.9.5\bin\mvn.cmd'

    $mvnExe = $null
    foreach ($c in $mvnCandidates) {
        if (Test-Path $c) { $mvnExe = $c; break }
    }

    if (-not $mvnExe) {
        # Try to find 'mvn' on PATH
        $cmd = Get-Command mvn -ErrorAction SilentlyContinue
        if ($cmd) { $mvnExe = $cmd.Source }
    }

    if (-not $mvnExe) {
        Write-Error "Maven not found. Install Maven or set MAVEN_HOME/M2_HOME, or add 'mvn' to PATH."
        exit 1
    }

    Write-Host "Using Maven: $mvnExe"
    & $mvnExe -f (Join-Path $scriptDir 'pom.xml') clean package -DskipTests
    if (-not (Test-Path $jar)) {
        Write-Error "Failed to find jar at $jar after build. Aborting."
        exit 1
    }
}

# choose java executable: JAVA_HOME if set, otherwise rely on PATH
if ($env:JAVA_HOME) {
    $javaExe = Join-Path $env:JAVA_HOME 'bin\java.exe'
} else {
    $javaExe = 'java'
}

if (-not (Test-Path $javaExe) -and $javaExe -ne 'java') {
    Write-Error "Cannot find java executable at $javaExe. Set JAVA_HOME or put java on PATH."
    exit 1
}

Write-Host "Starting backend using $javaExe -jar $jar"
$proc = Start-Process -FilePath $javaExe -ArgumentList '-jar', $jar -WindowStyle Minimized -PassThru
Start-Sleep -Seconds 1
if ($proc -and $proc.Id) {
    Set-Content -Path $pidFile -Value $proc.Id -Force
    Write-Host "Backend started (PID $($proc.Id)). PID written to $pidFile"
} else {
    Write-Error "Failed to start backend process."
}