// import { User } from "../schemas/user";

// export const getUserProfile = async (): Promise<User> => {
//    const res = await fetch(`/api/profile`, {
//     credentials: 'include', 
//   });
//   if (!res.ok) {
//     throw new Error('Ошибка получения профиля');
//   }
//   const data = await res.json();
// //   console.log(data);
//   return data as User;
// };


import { User } from "../schemas/user";

const rawBase = import.meta.env.VITE_API_BASE as string | undefined;
const API_BASE = rawBase ? rawBase.replace(/\/+$/,'') : '/api';

export const getUserProfile = async (): Promise<User> => {
  const res = await fetch(`${API_BASE}/profile`, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Ошибка получения профиля');
  }
  const data = await res.json();
  return data as User;
};
