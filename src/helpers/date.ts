export const formatDate = (createdAt: string) => {
  let date = new Date(createdAt!);
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear();

  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}hs`;
};

export const isCardExpired = (expirationDate: string) => {
  const parts = expirationDate.split("/");
  const month = parseInt(parts[0], 10);
  const year = parseInt(`20${parts[1]}`, 10);

  const dateOfExpiration = new Date(year, month, 0);

  const currentDate = new Date();

  return currentDate > dateOfExpiration;
};
