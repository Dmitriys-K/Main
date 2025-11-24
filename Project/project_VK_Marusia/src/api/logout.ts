export const logoutUser = async (): Promise<void> => {
  const res = await fetch('/api/auth/logout', {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error('Ошибка выхода');
  }
};