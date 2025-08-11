// Данные о лошадях
const horses = [
    { id: 1, name: "Быстрая Молния", emoji: "⚡", winner: false },
    { id: 2, name: "Чёрный Вихрь", emoji: "🌪", winner: false },
    { id: 3, name: "Золотой Гром", emoji: "🌩", winner: false },
    { id: 4, name: "Серебряный Ветер", emoji: "💨", winner: false },
    { id: 5, name: "Лунный Рысак", emoji: "🌙", winner: false },
    { id: 6, name: "Грозовой Скакун", emoji: "🌧", winner: false },
    { id: 7, name: "Белая Комета", emoji: "☄", winner: false },
    { id: 8, name: "Кровавый Алмаз", emoji: "💎", winner: false }
];

// Параметры гонки
let raceDuration = 60000; // 1 минута в миллисекундах
let countdownTime = 10; // Обратный отсчет перед стартом
let winnerId = null;

// Инициализация гонки
function initRace() {
    const raceTrack = document.getElementById('race-track');
    raceTrack.innerHTML = '';
    
    // Определяем победителя (может приходить из параметров URL)
    const urlParams = new URLSearchParams(window.location.search);
    winnerId = parseInt(urlParams.get('winner')) || determineWinner();
    
    // Создаем элементы лошадей
    horses.forEach(horse => {
        if (horse.id === winnerId) horse.winner = true;
        
        const horseElement = document.createElement('div');
        horseElement.className = 'horse';
        horseElement.id = `horse-${horse.id}`;
        horseElement.innerHTML = `
            <div class="horse-number">${horse.id}</div>
            <div class="horse-icon">${horse.emoji}</div>
            <div class="horse-name">${horse.name}</div>
            <div class="track">
                <div class="progress" id="progress-${horse.id}"></div>
            </div>
        `;
        raceTrack.appendChild(horseElement);
    });
    
    // Запускаем обратный отсчет до гонки
    startPreRaceCountdown();
}

// Определяем победителя (может быть заменено на данные из бота)
function determineWinner() {
    // В реальной реализации это должно приходить из бота
    return horses[Math.floor(Math.random() * horses.length)].id;
}

// Обратный отсчет перед стартом
function startPreRaceCountdown() {
    const timerElement = document.getElementById('pre-race-timer');
    let timeLeft = countdownTime;
    
    const countdown = setInterval(() => {
        timerElement.textContent = timeLeft;
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(countdown);
            timerElement.style.display = 'none';
            startRace();
        }
    }, 1000);
}

// Запуск гонки
function startRace() {
    const startTime = Date.now();
    const endTime = startTime + raceDuration;
    
    // Анимация прогресса для каждой лошади
    horses.forEach(horse => {
        const progressElement = document.getElementById(`progress-${horse.id}`);
        const isWinner = horse.id === winnerId;
        
        // Параметры анимации
        const baseSpeed = 0.3 + Math.random() * 0.4;
        const finalSpeed = isWinner ? baseSpeed * 1.5 : baseSpeed;
        
        // Задержка для победителя (для драматизма)
        const initialDelay = isWinner ? Math.random() * 3000 : 0;
        
        setTimeout(() => {
            const raceInterval = setInterval(() => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const remaining = endTime - currentTime;
                
                if (currentTime >= endTime) {
                    clearInterval(raceInterval);
                    // В конце гарантируем, что победитель первым
                    if (isWinner) {
                        progressElement.style.width = '100%';
                    }
                    announceWinner(horse.id);
                    return;
                }
                
                // Прогресс с учетом времени
                let progress = elapsed / raceDuration;
                
                // Добавляем случайные колебания
                progress += (Math.random() - 0.5) * 0.02;
                
                // Ускоряем победителя на последнем отрезке
                if (isWinner && progress > 0.7) {
                    progress += 0.02;
                }
                
                progress = Math.min(progress, 0.99);
                progressElement.style.width = `${progress * 100}%`;
            }, 100);
        }, initialDelay);
    });
}

// Объявление победителя
function announceWinner(winnerId) {
    const winner = horses.find(h => h.id === winnerId);
    const winnerElement = document.getElementById('winner-name');
    const announcementElement = document.getElementById('winner-announcement');
    
    winnerElement.textContent = winner.name;
    announcementElement.style.display = 'block';
    
    // Пометка победителя на треке
    document.getElementById(`horse-${winnerId}`).style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initRace);
