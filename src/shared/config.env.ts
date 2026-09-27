export const cockpitApiBaseUrl = import.meta.env.PROD
  ? '/.netlify/functions/cockpit-proxy?path='
  : import.meta.env.VITE_COCKPIT_API_BASE_URL

export const cockpitToken = import.meta.env.VITE_COCKPIT_TOKEN
