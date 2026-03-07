function updateTime() {
    const now = new Date();
    const days = ['日', '月', '火', '水', '木', '金', '土'];

    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = days[now.getDay()];

    document.getElementById('clock-time').textContent = `${h}:${m}`;
    document.getElementById('clock-date').textContent = `${month}月${date}日 (${day})`;

    // Update calendar and weather on a regular basis (e.g., every midnight or hour)
    if (h === '00' && m === '00' && now.getSeconds() === 0) {
        updateCalendar();
        // updateWeatherReal(); // Real API if needed
    }
}

function updateCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDaysInMonth = new Date(year, month, 0).getDate();

    const calGrid = document.getElementById('cal-grid');
    if (!calGrid) return;

    // Keep the headers
    const headers = calGrid.querySelectorAll('.cal-head');
    calGrid.innerHTML = '';
    headers.forEach(h => calGrid.appendChild(h));

    // Previous month cells
    for (let i = firstDay - 1; i >= 0; i--) {
        const cell = document.createElement('div');
        cell.className = 'cal-cell cal-other';
        cell.textContent = prevDaysInMonth - i;
        calGrid.appendChild(cell);
    }

    // Current month cells
    for (let i = 1; i <= daysInMonth; i++) {
        const cell = document.createElement('div');
        cell.className = 'cal-cell';
        if (i === now.getDate()) cell.classList.add('cal-today');
        cell.textContent = i;
        calGrid.appendChild(cell);
    }

    // Next month cells to fill 6 rows (42 cells)
    const filled = calGrid.children.length - 7; // excluding headers
    const needed = 42 - filled;
    for (let i = 1; i <= needed; i++) {
        const cell = document.createElement('div');
        cell.className = 'cal-cell cal-other';
        cell.textContent = i;
        calGrid.appendChild(cell);
    }
}

// --- Weather implementation (Shinjuku) ---
async function updateWeather() {
    const lat = 35.6895;
    const lon = 139.6917;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&timezone=Asia%2FTokyo&forecast_days=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Mapping weather codes to emojis
        const getWeatherIcon = (code) => {
            if (code === 0) return '☀️'; // Clear sky
            if ([1, 2, 3].includes(code)) return '🌤️'; // Partly cloudy
            if ([45, 48].includes(code)) return '🌫️'; // Fog
            if ([51, 53, 55].includes(code)) return '🌦️'; // Drizzle
            if ([61, 63, 65].includes(code)) return '🌧️'; // Rain
            if ([71, 73, 75, 77].includes(code)) return '❄️'; // Snow
            if ([80, 81, 82].includes(code)) return '⛈️'; // Showers
            if ([95, 96, 99].includes(code)) return '🌩️'; // Thunderstorm
            return '❓';
        };

        // Current weather
        document.getElementById('weather-main-icon').textContent = getWeatherIcon(data.current.weather_code);
        document.getElementById('weather-main-temp').textContent = `${Math.round(data.current.temperature_2m)}°`;

        // Hourly forecast (next 4 intervals, 3 hours apart)
        const forecastList = document.getElementById('weather-forecast-list');
        forecastList.innerHTML = '';

        const now = new Date();
        const currentHour = now.getHours();

        // Find next 4 intervals (3 hours each)
        for (let i = 1; i <= 4; i++) {
            const targetHour = (currentHour + i * 3) % 24;
            // Find index in hourly data
            // Open-Meteo returns 24 hours starting from 0:00
            const index = targetHour;

            const timeStr = `${targetHour}:00`;
            const temp = Math.round(data.hourly.temperature_2m[index]);
            const icon = getWeatherIcon(data.hourly.weather_code[index]);

            const item = document.createElement('div');
            item.className = 'forecast-hour';
            item.innerHTML = `
                <div class="forecast-time">${timeStr}</div>
                <div class="forecast-icon">${icon}</div>
                <div class="forecast-temp">${temp}°</div>
            `;
            forecastList.appendChild(item);
        }

        console.log('Weather updated for Shinjuku');
    } catch (err) {
        console.error('Failed to fetch weather:', err);
    }
}

// --- Screen Wake Lock implementation ---
let wakeLock = null;

const requestWakeLock = async () => {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock is active');

            wakeLock.addEventListener('release', () => {
                console.log('Wake Lock was released');
            });
        }
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
};

// Re-request wake lock when page becomes visible again
document.addEventListener('visibilitychange', async () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
        await requestWakeLock();
    }
});

// --- Burn-in Prevention (Pixel Shift) ---
function startPixelShift() {
    const dashboard = document.querySelector('.dashboard');
    if (!dashboard) return;

    const shift = () => {
        // -3px 〜 3px の間でランダムに移動
        const x = (Math.random() - 0.5) * 6;
        const y = (Math.random() - 0.5) * 6;
        dashboard.style.transform = `translate(${x}px, ${y}px)`;
        console.log(`Pixel shift applied: ${x.toFixed(2)}px, ${y.toFixed(2)}px`);
    };

    // 1分ごとに移動
    setInterval(shift, 60000);
    shift(); // 初回実行
}

// Initialize
function init() {
    setInterval(updateTime, 1000);
    updateTime();
    updateCalendar();
    updateWeather(); // Fetch weather
    setInterval(updateWeather, 3600000); // Refresh hourly
    requestWakeLock();
    startPixelShift();

    // Browser support for Border Animation (Chrome/Edge)
    if (window.CSS && CSS.registerProperty) {
        CSS.registerProperty({
            name: '--angle',
            syntax: '<angle>',
            initialValue: '0deg',
            inherits: false
        });
    } else {
        // Fallback for Firefox/Safari
        const clockCard = document.querySelector('.clock-card');
        if (clockCard) {
            clockCard.style.animation = 'rotate-fallback 4s linear infinite';
        }
    }
}

document.addEventListener('DOMContentLoaded', init);
