import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import { keycloak } from '@src/keycloak';

export function useAuth() {
  if (import.meta.env.MODE !== 'cypress') {
    const {
      keycloak: { authenticated, login, logout, token },
    } = useKeycloak();

    return { authenticated, login, logout, token };
  }
  return { authenticated: true, login: () => {}, logout: () => {}, token: 'token' };
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const tokenLogger = (tokens: { token?: string }) => {
    if (tokens?.token) {
      localStorage.setItem('token', tokens.token);
    } else {
      localStorage.removeItem('token');
    }
  };

  if (import.meta.env.MODE === 'cypress') {
    return <>{children}</>;
  }

  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={{ responseMode: 'query' }} onTokens={tokenLogger}>
      {children}
    </ReactKeycloakProvider>
  );
};
