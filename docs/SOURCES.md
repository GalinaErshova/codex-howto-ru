---
layout: "default"
title: "Проверка актуальности и отличия от исходника"
nav_order: 6
parent: "Приложения"
---

## Проверка актуальности и отличия от исходника

Сверка выполнена **24 октября 2026 года** по официальным страницам OpenAI. Ссылки ведут на текущую документацию, которая может измениться после выпуска руководства. Для воспроизводимости в комплект включён [`sources-manifest.json`](../sources-manifest.json): URL загрузки, имя сохранённого снимка, размер и SHA-256. Полные тексты сторонних официальных страниц в комплект не включены.

### Что изменено при адаптации

| Тема | Как изложено в этой редакции | Основание |
|---|---|---|
| Windows и WSL | Нативная Windows с PowerShell — самостоятельный поддерживаемый путь; WSL2 — выбор под проект, а не обязательное условие | [Windows app](https://learn.chatgpt.com/docs/app/windows) |
| Реализация песочницы | MXC рекомендована на совместимых устройствах; legacy elevated/unelevated не описаны как единственный вариант | [Windows sandbox](https://learn.chatgpt.com/docs/windows/windows-sandbox) |
| Режим разрешений | Не рекомендуется устаревшее `approval_policy = "untrusted"`, даже если оно осталось в help установленной версии | [Approvals](https://learn.chatgpt.com/docs/agent-approvals-security#migrate-from-the-retired-untrusted-approval-policy) |
| Профили | `--profile name` использует отдельный `name.config.toml` в действующем Codex home (по умолчанию `~/.codex`, может быть изменён `CODEX_HOME`); старые `[profiles.name]` не предлагаются | [Profiles](https://learn.chatgpt.com/docs/config-file/config-advanced#profiles) |
| Пакетный режим | Используется `codex exec`; флаг `--full-auto` исключён из рекомендуемых команд | [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode) |
| Skills | Проектное расположение `.agents/skills`; skills не объявлены обязательными для каждой задачи | [Build skills](https://learn.chatgpt.com/docs/build-skills) |
| Повторяемые prompts | Для новых повторяемых процессов рекомендованы skills; старые custom prompts помечены как deprecated | [Custom prompts](https://learn.chatgpt.com/docs/custom-prompts) |
| Настройка субагентов | TOML-файлы в `.codex/agents`; субагенты наследуют sandbox/approvals. Фраза «только чтение» сама по себе не создаёт техническую изоляцию | [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents) |
| Hooks | Реальная поддерживаемая функция; обработчики из нескольких слоёв складываются, для неменеджерских hooks требуется доверие к текущему определению | [Hooks](https://learn.chatgpt.com/docs/hooks) |
| Плагины | Возможности разделены по клиентам; IDE не приписывается поддержка плагинов. Для нового переносимого пакета используется актуальная спецификация, не только legacy `.codex-plugin/plugin.json` | [Plugins](https://learn.chatgpt.com/docs/plugins), [упаковка](https://developers.openai.com/plugins/build/plugins) |
| Локальная и облачная работа | Не обещается перенос Windows-путей, runtime и настроек в облако без отдельной проверки | [Cloud](https://learn.chatgpt.com/docs/cloud), [Advanced configuration](https://learn.chatgpt.com/docs/config-file/config-advanced) |
| Эффективность | Учебные измерения upstream не выдаются за универсальную экономию токенов или времени | [Upstream protocol](https://github.com/Phelan164/codex-howto/blob/65e9712af333bea85f20030ed2b33b51308a228e/resources/engineering-loop-measurement.md) |

Список объединяет исправления отдельных устаревших upstream-примеров и дополнительные уточнения текущей документации. Он не означает, что каждая старая рекомендация встречалась во всех файлах upstream.

### Карта официальных источников

| Модули | Проверенные страницы |
|---|---|
| 00–02 | [CLI](https://learn.chatgpt.com/docs/codex/cli), [команды](https://learn.chatgpt.com/docs/developer-commands?surface=cli), [Windows](https://learn.chatgpt.com/docs/app/windows), [Windows sandbox](https://learn.chatgpt.com/docs/windows/windows-sandbox), [permissions](https://learn.chatgpt.com/docs/agent-approvals-security) |
| 03–04 | [Prompting](https://learn.chatgpt.com/docs/prompting), [Best practices](https://learn.chatgpt.com/guides/best-practices), [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md), [базовая конфигурация](https://learn.chatgpt.com/docs/config-file/config-basic), [справочник](https://learn.chatgpt.com/docs/config-file/config-reference) |
| 05–06 | [Skills](https://learn.chatgpt.com/docs/build-skills), [MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli) |
| 07 | [Code review](https://learn.chatgpt.com/docs/code-review), [CLI commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) |
| 08–10 | [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents), [расширенная конфигурация](https://learn.chatgpt.com/docs/config-file/config-advanced) |
| 11 | [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode), [Hooks](https://learn.chatgpt.com/docs/hooks), [Plugins](https://learn.chatgpt.com/docs/plugins), [Scheduled tasks](https://learn.chatgpt.com/docs/automations), [Codex SDK](https://learn.chatgpt.com/docs/codex-sdk) |
| 12–13 | [Windows sandbox](https://learn.chatgpt.com/docs/windows/windows-sandbox), [конфигурация](https://learn.chatgpt.com/docs/config-file/config-reference), [контекст между чатами](https://learn.chatgpt.com/docs/customization/memories) |

### Границы проверки

Проверены установленные на ноутбуке **Codex CLI 0.144.5**, **PowerShell 7.6.5**, **Python 3.11.9** и **Git 2.52.0.windows.1**. Запускались только справочные команды Codex; они не обращались к модели. Справка — дополнительная проверка синтаксиса, но при расхождении с текущей документацией устаревшие рекомендации в учебник не переносятся.

В исходном учебном backend на зафиксированном коммите выполнен `unittest`: **2 теста прошли**. Отдельно воспроизведено поведение `reserve(5, -1) = 6`. Это подтверждает пригодность исходника для упражнения, а не исправность исходного модуля. Исправление оставлено читателю.

Финальные результаты технических проверок PowerShell-блоков, ссылок и HTML находятся в соседнем файле [`VERIFICATION.md`](VERIFICATION.md).

Не выполнялись установка или обновление Codex, изменение пользовательского config.toml, авторизация, подключение MCP, вызовы модели из примеров, запуск hooks, расписаний, облачных заданий или публикация. Для таких примеров проверены документация и, где возможно, локальный синтаксис. Совместимость с политиками конкретной организации и доступность функций конкретному аккаунту требуют отдельной проверки.

## Авторство и лицензия

Учебная структура и адаптированные материалы основаны на [Phelan164/codex-howto](https://github.com/Phelan164/codex-howto), коммит `65e9712af333bea85f20030ed2b33b51308a228e`. Оригинальная лицензия MIT сохранена в [LICENSE](../LICENSE) без изменения copyright notice.

Эта редакция добавляет русские объяснения, примеры PowerShell, Windows-практикум и сверку текущей документации. Материалы официальной документации пересказаны со ссылками; лицензия upstream не распространяется автоматически на страницы OpenAI. Руководство не является официальным изданием OpenAI и не обещает универсальной совместимости с будущими версиями.


## Дополнение от 26 октября 2026 года

В сравнение добавлена GPT-6 Luna по текущим [Models](https://learn.chatgpt.com/docs/models) и [Model selection](https://learn.chatgpt.com/docs/model-selection): ограниченные повторяемые задачи, идентификатор `gpt-6-luna`, усилие до Max без Ultra. Models предлагает начать с High, а Model selection приводит Luna Low для простого извлечения и точечных правок; эти ориентиры не сведены к одному обязательному уровню. Переходы между моделями и четвёртый разбор — учебные рекомендации с проверяемыми условиями, не сравнительный эксперимент.

Для [сравнения Terra, Sol и Astra](../updates/MODELS.md) дополнительно прочитан [официальный Model selection](https://learn.chatgpt.com/docs/model-selection). Назначение, имена и настройка моделей проверены по [Models](https://learn.chatgpt.com/docs/models), доступ Terra — по обзору недели. Примеры с данными, ответами и проверками — учебная адаптация, а не результат сравнительного запуска. Относительная рекомендация по затратам Sol/Astra не переносится на точные тарифы или преимущество Terra по цене.

Появление GPT-6.1 Terra, планы доступа и ограничения подтверждены [официальным обновлением недели](https://learn.chatgpt.com/docs/whats-new/october-26-30-2026). Минимальная версия CLI 0.159.0, идентификатор `gpt-6.1-terra` и выбор модели через Advanced сверены со [справочником моделей](https://learn.chatgpt.com/docs/models). Отсутствие доступа к инструменту не компенсируется выбором модели. Снимки двух страниц загружены 26 октября и зарегистрированы в `daily_update_sources` [реестра](../sources-manifest.json).

Вечерняя проверка AI-радара не нашла новых находок по сравнению с дневной: 160 результатов. Личные мнения о моделях и подписках, неподтверждённые заявления о блокировках и случайные упоминания не использованы как основания для публикации.

<a id="radar-practice"></a>
## Практическое использование по материалам AI-радара

На 24 октября 2026 года поиск `codex` в AI-радаре вернул 155 находок. Это размер поисковой выдачи, а не число уникальных статей о Codex: в ней есть дубли и случайные упоминания. Просмотрены заголовки и доступные описания, затем прочитаны первоисточники выбранных сценариев. Личные заметки и весь исходный экспорт не включены в публичный репозиторий.

| Сценарий | Источник идеи | Проверка и границы |
|---|---|---|
| Визуальный цикл | [Статья Пименова](https://pimenov.ai/articles/codex-desktop-visual-design-loop/) | [OpenAI Browser](https://learn.chatgpt.com/docs/browser), [Image inputs](https://learn.chatgpt.com/docs/image-inputs); встроенный браузер не приписывается CLI, оценки качества автора не воспроизводились |
| Figma → код | [Пост Александра Полякова](https://t.me/countwithsasha/835) | [Официальная документация Figma MCP](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server); чтение и запись имеют разные условия доступа |
| Цветовые токены | [Colormason README](https://github.com/vladzima/colormason) | Сторонний проект; проверяет заданные пары контраста, не весь интерфейс |
| Презентация | [Codex Slides README](https://github.com/nexu-io/codex-slides) | Раздел Troubleshooting подтверждает экспорт PPTX как полноформатных изображений; редактируемые объекты пока в roadmap |
| Конкуренты | [Методика Пименова](https://pimenov.ai/knowledge/kak-sobrat-dannye-saytov-konkurentov-dlya-codex/) | Проверена страница автора; пример в руководстве уменьшен до пилота и не обещает готового конвейера сбора |
| Схема по коду | [Archify README](https://github.com/tt-a1i/archify) | Сторонний skill; ссылки на код помогают проверке, но не гарантируют истинность всех выводов |
| Деловая процедура | [Пост о рекламном skill](https://t.me/countwithsasha/837), [SKILL.md автора](https://github.com/artwist-polyakov/polyakov-claude-skills/blob/main/plugins/blogger-ads-skill/skills/blogger-ads-skill/SKILL.md) | [OpenAI Build skills](https://learn.chatgpt.com/docs/build-skills) подтверждает механизм; пример адаптирован к подготовке предложения, предметные юридические нормы не пересказываются |

Сверка README не является тестом совместимости с Windows или результатом установки. Новые снимки с хешами отмечены в [общем реестре](../sources-manifest.json); полные тексты источников не распространяются. Дата старой находки в радаре не считается датой нового релиза.

[← Оглавление](../README.md)
