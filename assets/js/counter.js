const formatTimeUnit = (unit) => {
  return unit < 10 ? `0${unit}` : unit;
};

const getTimeFromServer = () => {
  return fetch("https://worldtimeapi.org/api/timezone/Europe/Istanbul")
    .then((response) => response.json())
    .then((data) => new Date(data.datetime))
    .catch((error) => {
      console.error("Sunucudan zaman alınamadı:", error);
      return new Date(); // Hata olursa yerel zamanı kullan
    });
};

const calculateTimeLeft = (currentTime) => {
  const difference = +new Date("2025-06-21T20:00:00") - +currentTime;
  if (difference <= 0) return null;

  return {
    days: formatTimeUnit(Math.floor(difference / (1000 * 60 * 60 * 24))),
    hours: formatTimeUnit(Math.floor((difference / (1000 * 60 * 60)) % 24)),
    minutes: formatTimeUnit(Math.floor((difference / 1000 / 60) % 60)),
    seconds: formatTimeUnit(Math.floor((difference / 1000) % 60)),
  };
};

const updateCounter = async () => {
  const serverTime = await getTimeFromServer();
  const timeLeft = calculateTimeLeft(serverTime);

  const counterDiv = document.getElementById("counter");
  counterDiv.innerHTML = ""; // önceki içeriği temizle

  if (timeLeft) {
    counterDiv.innerHTML = `
      <span class="day">${timeLeft.days} gün</span>
      <span class="hour">${timeLeft.hours} saat</span>
      <span class="minute">${timeLeft.minutes} dakika</span>
      <span class="second">${timeLeft.seconds} saniye</span>
    `;
  } else {
    counterDiv.innerHTML = `<span class="day">Düğün zamanı geldi!</span>`;
  }
};

// İlk çalıştırma
updateCounter();
setInterval(updateCounter, 1000);
