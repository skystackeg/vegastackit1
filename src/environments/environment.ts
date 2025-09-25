export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  buildTimestamp: new Date().getTime(),
  version: '1.0.0-dev',
  cacheBuster: `dev-${Date.now()}`
};