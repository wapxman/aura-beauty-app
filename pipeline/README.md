# UZ App Factory — Pipeline

Конвейер для автоматической генерации PWA-приложений на узбекском языке.

## Как работает

```
specs.json → Claude Code (headless) → HTML/CSS/JS → AdSense → Deploy
```

## Быстрый старт

```bash
# 1. Установите Claude Code
curl -fsSL https://code.claude.com/install | sh

# 2. Авторизуйтесь
claude

# 3. Тест на 10 приложениях
python3 pipeline.py --test 10

# 4. Проверьте результат
cd generated_apps/valyuta-kursi
npx serve .

# 5. Если всё ОК — запуск на все 50
python3 pipeline.py
```

## Команды

```bash
python3 pipeline.py                     # Все приложения
python3 pipeline.py --test 10           # Первые 10
python3 pipeline.py --category islamic  # Только исламские
python3 pipeline.py --id app_001        # Одно конкретное
python3 pipeline.py --dry-run           # Показать план
python3 pipeline.py --skip-ads          # Без рекламы
```

## Структура

```
specs/
  specs.json        — 50 спецификаций приложений
pipeline.py         — Основной скрипт генерации
generated_apps/     — Сгенерированные приложения (после запуска)
  valyuta-kursi/
    index.html
    manifest.json
    sw.js
    README.md
  namoz-vaqtlari/
    ...
```

## Настройка

В `pipeline.py` измените:
- `ADSENSE_ID` — ваш Google AdSense ID
- `DOMAIN` — ваш домен
- `MAX_PARALLEL` — кол-во параллельных агентов
