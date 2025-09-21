FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat && corepack enable

FROM base AS deps
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY pnpm-lock.yaml ./pnpm-lock.yaml
COPY packages ./packages
COPY apps/frontend/package.json ./apps/frontend/package.json
RUN pnpm install --filter @qanounia/frontend...

FROM base AS build
COPY --from=deps /app /app
COPY apps/frontend ./apps/frontend
RUN pnpm --filter @qanounia/frontend build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=build /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=build /app/apps/frontend/public ./apps/frontend/public
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY packages ./packages
COPY apps/frontend/package.json ./apps/frontend/package.json
RUN pnpm install --filter @qanounia/frontend --prod --no-optional
WORKDIR /app/apps/frontend
EXPOSE 3000
CMD ["pnpm", "start"]
