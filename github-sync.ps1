param(
    [Parameter(Mandatory=$true)]
    [string]$CommitMessage,
    
    [Parameter(Mandatory=$false)]
    [string]$Branch = "main",
    
    [Parameter(Mandatory=$false)]
    [switch]$FirstPush = $false
)

# Função para verificar se o repositório remoto já está configurado
function Test-RemoteConfigured {
    $remotes = git remote
    return $remotes -contains "origin"
}

# Adicionar todas as alterações
git add .

# Fazer commit com a mensagem fornecida
git commit -m $CommitMessage

# Se for o primeiro push, configurar o branch principal
if ($FirstPush) {
    git branch -M $Branch
    
    Write-Host "Para o primeiro push, você precisa configurar o repositório remoto."
    Write-Host "Execute o seguinte comando substituindo URL_DO_REPOSITORIO pelo URL do seu repositório GitHub:"
    Write-Host ""
    Write-Host "git remote add origin URL_DO_REPOSITORIO"
    Write-Host "git push -u origin $Branch"
    Write-Host ""
    Write-Host "Por exemplo: git remote add origin https://github.com/seu-usuario/mindflow.git"
    
    exit 0
}

# Verificar se o remote já está configurado
if (-not (Test-RemoteConfigured)) {
    Write-Host "O repositório remoto 'origin' não está configurado."
    Write-Host "Execute o script com o parâmetro -FirstPush para instruções de configuração."
    exit 1
}

# Push para o GitHub
git push origin $Branch

Write-Host "Alterações enviadas com sucesso para o GitHub no branch $Branch!"
