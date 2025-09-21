FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat && corepack enable

FROM base AS deps
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY pnpm-lock.yaml ./pnpm-lock.yaml
COPY packages ./packages
COPY apps/backend/package.json ./apps/backend/package.json
RUN pnpm install --filter @qanounia/backend...

FROM base AS build
COPY --from=deps /app /app
COPY apps/backend ./apps/backend
RUN pnpm --filter @qanounia/backend build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=build /app/apps/backend/dist ./apps/backend/dist
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY packages ./packages
COPY apps/backend/package.json ./apps/backend/package.json
RUN pnpm install --filter @qanounia/backend --prod --no-optional
WORKDIR /app/apps/backend
CMD ["node", "dist/main.js"]
