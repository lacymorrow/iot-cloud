import { SessionContextValue } from 'next-auth/react';

export const generateRandom = (max: number) => Math.floor(Math.random() * max);

export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : undefined;
};

export const getUserFromSession = (session: SessionContextValue) => {
  const { data } = session;
  // data?.user?.username ||
  // data?.user?.name?.split(' ')[0]
  return data?.user?.name || data?.user?.email || 'User';
};

export const incrementNumber = (number: number, max: number) => {
  return (number + 1) % max;
};

export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  // Grab the prefers reduced media query.
  const mediaQuery = window?.matchMedia('(prefers-reduced-motion: reduce)');
  return !mediaQuery || mediaQuery.matches;
};

// Format strings with %s
export const strFormat = (str: string, ...args: any) =>
  args.reduce((s: string, v: string) => s.replace('%s', v), str);
