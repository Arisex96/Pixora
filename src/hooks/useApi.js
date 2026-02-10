// hooks/useApi.js
"use client";

import { useSession } from 'next-auth/react';
import { api } from '@/lib/api';
import { useEffect, useMemo } from 'react';

export const useApi = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Add request interceptor
    const requestInterceptor = api.interceptors.request.use((config) => {
      // Priority: NextAuth session token > localStorage fallback
      const token = session?.backendToken ||
        (typeof window !== 'undefined' && window.localStorage.getItem('auth_token'));
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      // Cleanup interceptor on unmount
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [session?.backendToken]); // Only depend on the token, not the entire session object

  // Return both the api and loading state so components can wait
  const result = useMemo(() => {
    // Attach isReady property to know when auth is loaded
    api.isReady = status !== 'loading' && (!!session?.backendToken || 
      (typeof window !== 'undefined' && !!window.localStorage.getItem('auth_token')));
    api.status = status;
    return api;
  }, [session?.backendToken, status]);

  return result;
};