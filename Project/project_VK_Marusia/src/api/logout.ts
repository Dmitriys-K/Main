// export const logoutUser = async (): Promise<void> => {
//   const res = await fetch('/api/auth/logout', {
//     method: 'GET',
//   });
//   if (!res.ok) {
//     throw new Error('Ошибка выхода');
//   }
// };


const rawBase = import.meta.env.VITE_API_BASE as string | undefined;
const API_BASE = rawBase ? rawBase.replace(/\/+$/,'') : '/api';

export const logoutUser = async (): Promise<void> => {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Ошибка выхода');
  }
};
