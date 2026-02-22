FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN --mount=type=secret,id=API_URL \
    --mount=type=secret,id=NEXT_PUBLIC_GOOGLE_CLIENT_ID \
    --mount=type=secret,id=NEXT_PUBLIC_KAKAO_CLIENT_ID \
    --mount=type=secret,id=NEXT_PUBLIC_NAVER_CLIENT_ID \
    --mount=type=secret,id=NEXT_PUBLIC_REDIRECT_PATH \
    export API_URL=$(cat /run/secrets/API_URL) && \
    export NEXT_PUBLIC_GOOGLE_CLIENT_ID=$(cat /run/secrets/NEXT_PUBLIC_GOOGLE_CLIENT_ID) && \
    export NEXT_PUBLIC_KAKAO_CLIENT_ID=$(cat /run/secrets/NEXT_PUBLIC_KAKAO_CLIENT_ID) && \
    export NEXT_PUBLIC_NAVER_CLIENT_ID=$(cat /run/secrets/NEXT_PUBLIC_NAVER_CLIENT_ID) && \
    export NEXT_PUBLIC_REDIRECT_PATH=$(cat /run/secrets/NEXT_PUBLIC_REDIRECT_PATH) && \
    npm run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next/cache

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]