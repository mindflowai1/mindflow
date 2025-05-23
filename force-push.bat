@echo off
echo === Script de Sincronizacao Forcada com GitHub ===
echo.
echo Este script vai forcar o envio do seu codigo local para o repositorio GitHub.
echo ATENCAO: Isso vai sobrescrever qualquer mudanca no repositorio remoto.
echo.
echo Iniciando processo...

git add .
git commit -m "Atualizacao forcada via script: %date% %time%"
git push -f origin main

echo.
echo Processo concluido! Se nao houver erros, suas alteracoes foram enviadas para o GitHub.
echo.
pause
