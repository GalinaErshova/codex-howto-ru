## Шпаргалка PowerShell

### Перевод распространённых Bash-команд

| Bash | PowerShell | Замечание |
|---|---|---|
| `pwd` | `Get-Location` | Показывает текущую папку |
| `ls -la` | `Get-ChildItem -Force` | Ключи Bash не переносить |
| `mkdir -p path` | `New-Item -ItemType Directory -Force -Path 'path'` | Только для создания папок |
| `cat file` | `Get-Content -LiteralPath 'file' -Encoding UTF8` | Возвращает строки |
| `cat file` целиком | `Get-Content -LiteralPath 'file' -Raw -Encoding UTF8` | Возвращает одну строку |
| `cp -r source target` | `Copy-Item -LiteralPath 'source' -Destination 'target' -Recurse` | Проверить конечную структуру папок |
| `export NAME=value` | `$env:NAME = 'value'` | Только текущий процесс и его дочерние |
| `which codex` | `Get-Command codex` | Может вернуть ps1, cmd или exe |
| `python3` | `python` либо `py -3` | Сначала проверить версию |
| `command1 && command2` | отдельные строки и проверка `$LASTEXITCODE` | `&&` отсутствует в Windows PowerShell 5.1 |
| `./script.sh` | `& '.\script.ps1'` | Сценарий требуется переписать под PowerShell |

Не переносите `chmod`, `sudo`, `/tmp`, `$VAR` и Bash here-document в нативную PowerShell-сессию. WSL — отдельная среда; Linux-команды допустимы, когда явно выбран WSL.

### Пути с пробелами и кириллицей

```powershell
$projectPath = Join-Path (Get-Location).Path 'Учебный проект'
New-Item -ItemType Directory -Force -Path $projectPath | Out-Null
Get-ChildItem -LiteralPath $projectPath -Force
```

`-LiteralPath` не интерпретирует квадратные скобки как шаблон. Для запуска программы по пути с пробелами используйте оператор вызова `&`:

```powershell
$pythonCommand = (Get-Command python -ErrorAction Stop).Source
& $pythonCommand --version
if ($LASTEXITCODE -ne 0) { throw 'Интерпретатор не запустился' }
```

### UTF-8 без зависимости от версии PowerShell

В Windows PowerShell 5.1 и PowerShell 7 различаются кодировки вывода в файл по умолчанию. Для воспроизводимой записи текстового шаблона используйте .NET:

```powershell
$templatePath = Join-Path (Get-Location).Path 'example.txt'
if (Test-Path -LiteralPath $templatePath) { throw 'Файл уже существует: выберите другое имя' }
$templateText = @'
Цель: проверить обработку пустого ввода.
Результат: воспроизведение и проверенный diff.
'@
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[IO.File]::WriteAllText($templatePath, $templateText, $utf8NoBom)
```

Одинарный here-string сохраняет `$skill-name` и другие `$...` буквально. В двойном here-string PowerShell пытается подставить переменные. Не подставляйте секреты в команды или шаблоны.

### Не маскируйте неуспех внешней программы

```powershell
python -m unittest discover -s backend -p 'test_*.py'
if ($LASTEXITCODE -ne 0) { throw 'Тесты завершились с ошибкой' }
```

`$ErrorActionPreference = 'Stop'` полезен для cmdlet, но сам по себе не превращает любой ненулевой код внешнего процесса в исключение во всех поддерживаемых версиях PowerShell. После Git, Python и Codex проверяйте `$LASTEXITCODE`.

### Разделяйте Windows и WSL

Одинаковый проект может иметь пути `C:\...` в Windows и `/mnt/c/...` в WSL. Windows-процесс использует Windows Python/Node/Git и Windows `.codex`; WSL по умолчанию использует домашнюю папку Linux. Наличие авторизации или пакета в одной среде не доказывает его наличие в другой. В этом учебнике общий каталог настроек между средами не настраивается.

Официальный источник: [приложение на Windows](https://learn.chatgpt.com/docs/app/windows).

[← Оглавление](../README.md)
