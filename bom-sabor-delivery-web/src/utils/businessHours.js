export const businessHours = {
  // 3 = Quarta-feira, 4 = Quinta-feira, 5 = Sexta-feira, 6 = Sábado, 0 = Domingo
  3: { open: "06:00", close: "22:00" },
  4: { open: "18:00", close: "22:00" },
  5: { open: "18:00", close: "22:00" }, 
  6: { open: "18:00", close: "22:00" }, 
  0: { open: "18:00", close: "22:00" }, 
};

export const isStoreOpen = () => {
  const now = new Date();
  const day = now.getDay(); // Pega o dia da semana (0-6)
  
  // Se o dia atual não estiver no nosso objeto businessHours, está fechado
  const schedule = businessHours[day];
  if (!schedule) return false;

  const currentH = now.getHours();
  const currentM = now.getMinutes();
  const currentTimeInMinutes = currentH * 60 + currentM;

  const [openH, openM] = schedule.open.split(":").map(Number);
  const [closeH, closeM] = schedule.close.split(":").map(Number);

  const openTimeInMinutes = openH * 60 + openM;
  const closeTimeInMinutes = closeH * 60 + closeM;

  return currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes <= closeTimeInMinutes;
};