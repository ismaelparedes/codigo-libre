# Código Libre — Plataforma Web

Stack: React + Vite + TailwindCSS (frontend/admin) · Node.js Serverless (backend) · Vercel Postgres

## Estructura

```
codigolibre/
├── frontend/   → Sitio público
├── admin/      → Panel de administración
└── backend/    → API serverless (Vercel Functions)
```

---

## 1. Base de datos (Vercel Postgres)

1. Ve a tu dashboard de Vercel → Storage → Create Database → Postgres
2. Copia el `DATABASE_URL` que te da Vercel
3. Pégalo como variable de entorno en el proyecto `backend`

---

## 2. Deploy del Backend

```bash
cd backend
npm install
npx prisma generate
# Configura las env vars en Vercel antes de hacer push
```

Variables de entorno en Vercel (proyecto backend):
```
DATABASE_URL=...          # De Vercel Postgres
JWT_SECRET=...            # String largo y aleatorio
JWT_REFRESH_SECRET=...    # Otro string largo y aleatorio
ALLOWED_ORIGINS=https://codigolibre.org,https://admin-codigolibre.vercel.app
```

Después del primer deploy, corre el seed:
```bash
npx prisma db push
node prisma/seed.js
```

---

## 3. Deploy del Frontend

Variables de entorno en Vercel (proyecto frontend):
```
VITE_API_URL=https://tu-backend.vercel.app/api
```

---

## 4. Deploy del Admin

Variables de entorno en Vercel (proyecto admin):
```
VITE_API_URL=https://tu-backend.vercel.app/api
```

Credenciales iniciales del admin:
- Email: `admin@codigolibre.org`
- Password: `Admin123!`

**Cambia la contraseña después del primer login.**

---

## Desarrollo local

```bash
# Backend
cd backend && npm install
cp .env.example .env  # Llena las variables
npx prisma db push
node prisma/seed.js
vercel dev  # Corre en http://localhost:3001

# Frontend
cd frontend && npm install
cp .env.example .env
npm run dev  # http://localhost:5173

# Admin
cd admin && npm install
cp .env.example .env
npm run dev  # http://localhost:5174
```
