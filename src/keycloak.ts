import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOACK_URL,
  realm: import.meta.env.VITE_KEYCLOACK_REALM,
  clientId: import.meta.env.VITE_KEYCLOACK_CLIENT_ID,
});
