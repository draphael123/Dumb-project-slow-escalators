# Script to push code to GitHub and prepare for Vercel deployment
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$true)]
    [string]$RepoName
)

$repoUrl = "https://github.com/$GitHubUsername/$RepoName.git"

Write-Host "Setting up Git remote..." -ForegroundColor Green
git remote remove origin 2>$null
git remote add origin $repoUrl

Write-Host "Switching to main branch..." -ForegroundColor Green
git branch -M main

Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host "`n✅ Code pushed to GitHub!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://vercel.com/new" -ForegroundColor White
Write-Host "2. Click 'Import Git Repository'" -ForegroundColor White
Write-Host "3. Select your GitHub account and find '$RepoName'" -ForegroundColor White
Write-Host "4. Click 'Import' and then 'Deploy'" -ForegroundColor White
Write-Host "`nYour site will be live in ~2 minutes! 🚀" -ForegroundColor Cyan

