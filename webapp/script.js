const horses = [
    { id: 1, name: "Быстрая Молния", color: "#FF5733" },
    { id: 2, name: "Чёрный Вихрь", color: "#000000" },
    { id: 3, name: "Золотой Гром", color: "#FFD700" },
    { id: 4, name: "Серебряный Ветер", color: "#C0C0C0" },
    { id: 5, name: "Лунный Рысак", color: "#4682B4" },
    { id: 6, name: "Грозовой Скакун", color: "#800080" },
    { id: 7, name: "Белая Комета", color: "#FFFFFF" },
    { id: 8, name: "Кровавый Алмаз", color: "#DC143C" }
];

// Отрисовка лошадей
const horsesDiv = document.getElementById("horses");
horses.forEach(horse => {
    const horseEl = document.createElement("div");
    horseEl.className = "horse";
    horseEl.innerHTML = `
        <div class="horse-name" style="color: ${horse.color}">${horse.name}</div>
        <div class="horse-track">
            <div class="horse-icon" style="background: ${horse.color}">🐎</div>
        </div>
    `;
    horseEl.onclick = () => selectHorse(horse.id);
    horsesDiv.appendChild(horseEl);
});

let selectedHorse = null;

function selectHorse(horseId) {
    selectedHorse = horseId;
    document.querySelectorAll(".horse").forEach(el => el.classList.remove("selected"));
    event.currentTarget.classList.add("selected");
}

// Старт гонки
document.getElementById("startRace").onclick = () => {
    if (!selectedHorse) {
        alert("Выбери лошадь!");
        return;
    }
    
    // Отправляем ставку в бота
    Telegram.WebApp.sendData(JSON.stringify({ horse_id: selectedHorse }));
    
    // Анимация гонки
    const horses = document.querySelectorAll(".horse-icon");
    horses.forEach((horse, index) => {
        let position = 0;
        const speed = 1 + Math.random() * 3;
        const raceInterval = setInterval(() => {
            position += speed;
            horse.style.transform = `translateX(${position}px)`;
            
            if (position >= 300) {
                clearInterval(raceInterval);
            }
        }, 50);
    });
};