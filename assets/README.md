# Saved assets

- `empty-wallet-dollar-3d.html` - the slowly spinning 3D text-art dollar sign with falling dots.
  Intended for bankruptcy / empty-wallet / insufficient-funds screens. Self-contained, no dependencies.
  Open it with `?angle=40` to freeze it at a fixed angle for testing.
- `empty-wallet-dollar-3d.template.html` - same page with a `/*ART*/` placeholder where the original text art goes.
- `original-ascii-dollar.html` - the original flat text-art page the model was built from.
- `welcome-dollar-3d.html` - the true 3D text-art dollar sign (round tubes, shaded with characters, spinning, bobbing, with falling dots).
  Used as the website welcome sign, the wallet graphic and a game asset. Options: `embed=1` transparent background, `loop=1` stay on screen,
  `hold=8`, `fadein=1.8`, `fadeout=1.4`, `angle=40` to freeze. It fires `rsn-welcome-done` when the fade out ends.
- Project login: protected projects are locked on the server (Caddy asks a small password service before serving them), not in these public files.
