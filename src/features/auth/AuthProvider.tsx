import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import { keycloak } from '@src/keycloak';
import { useEffect } from 'react';

export function useAuth() {
  if (import.meta.env.MODE !== 'cypress') {
    const {
      keycloak: { authenticated, login, logout, token },
    } = useKeycloak();

    return { authenticated, login, logout, token };
  }
  return { authenticated: true, login: () => {}, logout: () => {}, token: 'token' };
}

function TokenProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return <>{children}</>;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  if (import.meta.env.MODE === 'cypress') {
    return <TokenProvider>{children}</TokenProvider>;
  }

  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={{ responseMode: 'query' }}>
      <TokenProvider>{children}</TokenProvider>
    </ReactKeycloakProvider>
  );
};
