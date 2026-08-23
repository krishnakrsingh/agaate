<#
.SYNOPSIS
    Periodically auto-commits and pushes code changes to GitHub every X minutes.
.PARAMETER IntervalMinutes
    Interval between check & commit cycles in minutes. Defaults to 5 minutes.
.PARAMETER Branch
    Optional target branch to push to. Defaults to active git branch.
.EXAMPLE
    .\auto-commit-loop.ps1
.EXAMPLE
    .\auto-commit-loop.ps1 -IntervalMinutes 5
#>

param (
    [int]$IntervalMinutes = 4,
    [string]$Branch
)

$IntervalSeconds = $IntervalMinutes * 60

Write-Host "==================================================" -ForegroundColor Green
Write-Host " Auto-Commit Daemon Started" -ForegroundColor Green
Write-Host " Interval : $IntervalMinutes minute(s) ($IntervalSeconds seconds)" -ForegroundColor Green
Write-Host " Press Ctrl+C in PowerShell to stop" -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Green

while ($true) {
    try {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $status = git status --porcelain

        if (-not [string]::IsNullOrWhiteSpace($status)) {
            Write-Host "[$timestamp] Changes detected in working directory. Staging..." -ForegroundColor Cyan
            git add -A

            $commitMsg = "Auto-commit: $timestamp"
            Write-Host "[$timestamp] Committing: '$commitMsg'..." -ForegroundColor Cyan
            git commit -m "$commitMsg"

            if ($LASTEXITCODE -eq 0) {
                if ([string]::IsNullOrWhiteSpace($Branch)) {
                    $targetBranch = (git branch --show-current).Trim()
                    if ([string]::IsNullOrWhiteSpace($targetBranch)) { $targetBranch = "main" }
                } else {
                    $targetBranch = $Branch
                }

                Write-Host "[$timestamp] Pushing to origin/$targetBranch..." -ForegroundColor Cyan
                git push origin $targetBranch

                if ($LASTEXITCODE -eq 0) {
                    Write-Host "[$timestamp] Successfully committed and pushed to GitHub!" -ForegroundColor Green
                } else {
                    Write-Host "[$timestamp] Push failed with exit code $LASTEXITCODE." -ForegroundColor Red
                }
            } else {
                Write-Host "[$timestamp] Git commit failed." -ForegroundColor Red
            }
        } else {
            Write-Host "[$timestamp] No changes detected. Sleeping..." -ForegroundColor DarkGray
        }
    } catch {
        Write-Host "An error occurred: $_" -ForegroundColor Red
    }

    Start-Sleep -Seconds $IntervalSeconds
}
