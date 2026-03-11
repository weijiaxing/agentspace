# 3D model placeholder

Put your agent model here as:

`public/models/andy.glb`

Current behavior:
- If `andy.glb` exists and loads successfully, Agent Space will render it.
- If not, the app falls back to the built-in placeholder avatar.

Recommended model constraints for the first usable version:
- glTF/GLB format
- humanoid or assistant-like character
- modest polygon count for web delivery
- centered at origin if possible
