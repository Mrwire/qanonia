# GeniusAD - Agence de Communication & Production

GeniusAD est une agence de communication et production spécialisée dans l'événementiel corporate et grand public, le marketing alternatif, les roadshows et activations. Ce dépôt regroupe l'API NestJS, l'interface Next.js, les packages partagés ainsi que les artefacts d'infrastructure et de CI/CD.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js ≥ 18
- pnpm ≥ 8

### Installation
```bash
git clone https://github.com/Mrwire/qanonia.git
cd qanonia
pnpm install
pnpm --filter frontend dev
```

Le frontend sera accessible sur `http://localhost:3000`

## 🏗️ Architecture

### Monorepo Structure
```
├── apps/
│   ├── frontend/          # Application Next.js
│   └── backend/           # API NestJS
├── packages/
│   ├── ui/               # Composants UI partagés
│   ├── utils/            # Utilitaires partagés
│   └── config/           # Configuration partagée
└── docs/                 # Documentation
```

### Technologies

#### Frontend
- **Framework**: Next.js 14 avec App Router
- **UI**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **i18n**: next-intl (FR/AR/EN)

#### Backend
- **Framework**: NestJS
- **Database**: Prisma ORM
- **Auth**: JWT + Passport
- **Queue**: BullMQ + Redis

#### DevOps
- **Monorepo**: pnpm workspaces + Turbo
- **Containerization**: Docker
- **Deployment**: Netlify + Railway

## 📚 Scripts Disponibles

```bash
# Développement
pnpm dev                    # Tous les services
pnpm --filter frontend dev  # Frontend seulement
pnpm --filter backend dev   # Backend seulement

# Build
pnpm build                  # Build complet
pnpm --filter frontend build

# Tests
pnpm test                   # Tous les tests
pnpm test:e2e              # Tests end-to-end

# Linting & Formatting
pnpm lint                   # ESLint
pnpm typecheck             # TypeScript
```

## 🌍 Internationalisation

Support multilingue avec next-intl:
- 🇫🇷 Français (par défaut)
- 🇸🇦 العربية
- 🇬🇧 English

## 📱 Features

### Frontend
- ✅ Design responsive et moderne
- ✅ Support RTL pour l'arabe
- ✅ Système de thèmes
- ✅ Optimisation SEO
- ✅ PWA ready

### Backend
- ✅ API RESTful + GraphQL
- ✅ Authentification sécurisée
- ✅ Upload de fichiers
- ✅ Cache Redis
- ✅ Rate limiting

## 🚀 Déploiement

### Environnements
- **Development**: Local avec Next.js dev server
- **Staging**: Netlify Preview
- **Production**: Netlify + Railway

### Variables d'environnement
```bash
# Frontend
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_URL=

# Backend  
DATABASE_URL=
JWT_SECRET=
REDIS_URL=
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence propriétaire GeniusAD.

## 📞 Contact

- **Email**: contact@geniusad.com
- **Website**: https://geniusad.com
- **LinkedIn**: [GeniusAD](https://linkedin.com/company/geniusad)

---

<div align="center">
  <strong>Made with ❤️ by GeniusAD Team</strong>
</div>