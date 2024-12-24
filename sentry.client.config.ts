import { useRuntimeConfig } from "#imports";
import * as Sentry from "@sentry/nuxt";

const config = useRuntimeConfig();

Sentry.init({
  enabled: !!config.public.sentryDsn,
  dsn: config.public.sentryDsn,
  environment: config.public.stage,
  tracesSampleRate: 0.5,
});
