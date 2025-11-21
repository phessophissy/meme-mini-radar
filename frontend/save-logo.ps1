# Save Logo Script
# This script helps you save the Meme Mini-Radar logo to the correct location

$destinationPath = "C:\Users\HomePC\meme-mini-radar\frontend\public\logo.png"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Meme Mini-Radar Logo Setup" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Please save your logo image to:" -ForegroundColor Green
Write-Host $destinationPath -ForegroundColor White
Write-Host ""
Write-Host "OR drag and drop your logo file here and press Enter:"
$logoPath = Read-Host

if ($logoPath) {
    $logoPath = $logoPath.Trim('"')
    if (Test-Path $logoPath) {
        Copy-Item $logoPath -Destination $destinationPath -Force
        Write-Host ""
        Write-Host " Logo saved successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Now run: git add public/logo.png ; git commit -m 'Add logo' ; git push" -ForegroundColor Cyan
    } else {
        Write-Host "File not found. Please check the path." -ForegroundColor Red
    }
}
