import React from "react";
import * as Sentry from "@sentry/react";
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";

const SENTRY_DSN =
  "https://c360341a96e42c3a56e986418e58a92d@o183917.ingest.us.sentry.io/4511106138898432";

if (import.meta.env.PROD && SENTRY_DSN) {
  const appOrigin = typeof window !== "undefined" ? window.location.origin : "";
  // Propagate only to this SPA’s origin — not API Gateway (avoids CORS preflight failures).
  const escapedOrigin = appOrigin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tracePropagationTargets = appOrigin ? [new RegExp("^" + escapedOrigin)] : [];

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: import.meta.env.MODE,
    release: import.meta.env.VITE_SENTRY_RELEASE || undefined,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
    ],
    tracePropagationTargets,
    tracesSampleRate: 0.1,
  });
}
