<#
.SYNOPSIS
    Auto-commits and pushes local changes to GitHub.
.PARAMETER Message
    Optional custom commit message. Defaults to 'Auto-commit: <timestamp>'.
.PARAMETER Branch
    Optional target branch to push to. Defaults to current active git branch.
.EXAMPLE
    .\auto-commit.ps1
.EXAMPLE
    .\auto-commit.ps1 -Message "Update features" -Branch main
#>

param (
    [string]$Message,
    [string]$Branch
)

# Stop execution on unhandled script errors
$ErrorActionPreference = "Stop"

# Ensure we are inside a Git repository
try {
    $gitRepoCheck = git rev-parse --is-inside-work-tree 2>$null
    if ($gitRepoCheck -ne "true") {
        Write-Host "Error: Current directory is not a Git repository." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Error checking Git repository status." -ForegroundColor Red
    exit 1
}

# Get current git status
$status = git status --porcelain

if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes detected in working tree. Nothing to commit." -ForegroundColor Yellow
    exit 0
}

# Determine default commit message if not provided
if ([string]::IsNullOrWhiteSpace($Message)) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $Message = "Auto-commit: $timestamp"
}

# Determine default branch if not provided
if ([string]::IsNullOrWhiteSpace($Branch)) {
    $Branch = (git branch --show-current).Trim()
    if ([string]::IsNullOrWhiteSpace($Branch)) {
        $Branch = "main"
    }
}

Write-Host "Staging changes..." -ForegroundColor Cyan
git add -A

Write-Host "Committing with message: '$Message'..." -ForegroundColor Cyan
git commit -m "$Message"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git commit failed." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Pushing to remote origin/$Branch..." -ForegroundColor Cyan
git push origin $Branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "Successfully committed and pushed changes to GitHub!" -ForegroundColor Green
} else {
    Write-Host "Failed to push changes to GitHub." -ForegroundColor Red
    exit $LASTEXITCODE
}
