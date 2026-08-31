# AGENTS.md — Portafolio (AstroPrueba) en el VPS de Axel

Estado de despliegue en el servidor Contabo (`80.190.73.7`, Coolify). Para el
procedimiento general (cómo desplegar, gotchas conocidos del servidor), usar
el skill `codetec-deploy`. Este archivo es el estado **específico** de este
proyecto — no repitas el descubrimiento, actualízalo si algo cambia.

## Recurso en Coolify

- **Proyecto**: `Portafolio Axel` — `project_uuid: cmfmbf1hmdwub3ibfdfib43g`
- **Environment**: `production` — `environment_uuid: inwgqumh1ehc0vs62hs6vorg`
- **Aplicación** (Dockerfile simple, sin compose): `portafolio` —
  `app_uuid: nyldvavwrubpdee4quvzsrtl`
- **Server**: `localhost` (único server del Coolify) — `server_uuid: w9xgpps0ojt7o7chlfqgxnca`
- **Destination** (red Docker): `coolify` — `destination_uuid: iczb37rlnvqej4aprs5yr1uc`
- **Deploy key** (SSH, solo lectura, generada con `ssh-keygen` en el propio
  servidor y registrada en Coolify): `astroprueba-deploy-key` —
  `private_key_uuid: drie2nba0gse9xoheic5ydgo`. Su pública está agregada como
  Deploy Key en GitHub → `AXSCQ/AstroPrueba` → Settings → Deploy keys
  (`coolify-astroprueba-deploy`, sin permiso de escritura).
- **Build pack**: `dockerfile` (no `dockercompose` — es un único servicio
  estático, no hace falta compose). `git_repository: git@github.com:AXSCQ/AstroPrueba.git`,
  `git_branch: main`.

## Dominio

| Dominio | Qué sirve |
|---|---|
| `https://axscq.codetec.app` | El portafolio completo (sitio estático, build de `astro build` servido por nginx) |

SSL: Let's Encrypt automático vía Coolify/Traefik, verificado (`issuer=Let's
Encrypt`, cert válido hasta nov-2026).

**Nota sobre el nombre del repo**: el repo en GitHub sigue llamándose
`AstroPrueba` (Axel pidió renombrarlo a `portafolio` pero el rename no llegó
a hacerse). El recurso de Coolify ya se llama `portafolio` internamente
(`name: "portafolio"` en la app), pero el `git_repository` sigue apuntando a
`AXSCQ/AstroPrueba.git`. Si en algún momento se renombra el repo en GitHub,
actualizar `git_repository` en Coolify (`PATCH /api/v1/applications/<uuid>`)
— GitHub redirige el nombre viejo por un tiempo, pero no depender de eso
indefinidamente.

## Cómo está construido

`Dockerfile` en la raíz: build multi-stage — `node:20-alpine` corre
`npm ci && npm run build` (genera `dist/`), y una segunda etapa
`nginx:1.27-alpine` sirve ese `dist/` con `nginx.conf` (config mínima,
`try_files` con fallback a `index.html`, gzip). Mismo patrón que el servicio
`marketing` de `agente-licitaciones-bolivia` (sitio estático propio, sin
compose por ser un repo standalone de un solo servicio).

Sin variables de entorno — es un sitio 100% estático, no hay backend ni base
de datos que configurar.

## Despliegue de un cambio nuevo

1. Commitear y pushear a `main` en GitHub (`AXSCQ/AstroPrueba`).
2. `POST /api/v1/deploy?uuid=nyldvavwrubpdee4quvzsrtl` (con el token de API
   de Coolify, ejecutado por SSH desde dentro del servidor — la API no está
   expuesta al público).
3. Sondear `GET /api/v1/deployments/<deployment_uuid>` hasta `status: finished`.
4. Verificar: `docker ps -a --filter "name=nyldvavwrubpdee4quvzsrtl"` (debe
   estar `Up ... (healthy)`) y `curl -s -o /dev/null -w "%{http_code}"
   https://axscq.codetec.app/` (debe dar `200`).

No hay webhook de auto-deploy configurado todavía (push a GitHub no dispara
deploy solo) — hay que disparar el deploy manualmente por API tras cada push.
