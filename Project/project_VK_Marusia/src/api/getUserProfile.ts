import { User } from "../schemas/user";

export const getUserProfile = async (): Promise<User> => {
   const res = await fetch(`/api/profile`, {
    credentials: 'include', 
  });
  if (!res.ok) {
    throw new Error('Ошибка получения профиля');
  }
  const data = await res.json();
//   console.log(data);
  return data as User;
};
