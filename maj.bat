@echo off
echo ========================================
echo   Sauvegarde et envoi vers GitHub...
echo ========================================

git add .
git commit -m "Mise a jour automatique"
git push

echo ========================================
echo   Termine ! Votre code est en ligne.
echo ========================================
pause
