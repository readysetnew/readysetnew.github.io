# Ready Set New theme: Midnight

One look for the OS, the demo app and every attached project. Built from two references William picked:
the dark side panel of Claude's dark mode, and the dark grey and deep red alert banner.

| Role | Colour |
|---|---|
| Page and side panel | `#09090b` |
| Cards and code blocks | `#0b0c0e` |
| Raised strips, alert strip | `#1a1c1e` |
| Borders | `#222224` |
| Selected row | `#1e1917` |
| Text, strong text, muted | `#dedede`, `#e8e6e3`, `#9e9e9e` |
| Accent (warm tan) | `#d4a27f` |
| Alert red, alert edge | `#790a02`, `#d71204` |
| Signal green, edge, terminal | `#90ee90`, `#5fbf6a`, `#00ff00` |

## Files
- `rsn-theme.css` - the variables and ready-made parts (sidebar, cards, buttons, inputs, alert bar). Link it from any web page or web-based app.
- `tokens.json` - the same colours as data, for the game, native apps or any tool that reads tokens.
- `terminal-palette.txt` - colours for terminals on the OS.
- `preview.html` - one page showing everything together.

## Rules
- Use the variables (`var(--rsn-bg)`), never raw hex values, so the whole system can change in one place.
- Red is only for alerts and errors. Green is for the main action and success. Tan marks what is selected.
- The 3D dollar sign and text-art stay terminal green on `--rsn-bg`.
