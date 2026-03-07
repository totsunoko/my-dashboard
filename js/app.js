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
    // Requesting 3 days of hourly and daily data
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&forecast_days=3`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Mapping weather codes to Lucide icons
        const getWeatherIcon = (code) => {
            if (code === 0) return 'sun'; // Clear sky
            if ([1, 2, 3].includes(code)) return 'cloud-sun'; // Partly cloudy
            if ([45, 48].includes(code)) return 'cloud-fog'; // Fog
            if ([51, 53, 55].includes(code)) return 'cloud-drizzle'; // Drizzle
            if ([61, 63, 65].includes(code)) return 'cloud-rain'; // Rain
            if ([71, 73, 75, 77].includes(code)) return 'cloud-snow'; // Snow
            if ([80, 81, 82].includes(code)) return 'cloud-lightning'; // Showers
            if ([95, 96, 99].includes(code)) return 'cloud-lightning'; // Thunderstorm
            return 'help-circle';
        };

        const renderIcon = (name) => `<i data-lucide="${name}"></i>`;

        // Current weather
        document.getElementById('weather-main-icon').innerHTML = renderIcon(getWeatherIcon(data.current.weather_code));
        document.getElementById('weather-main-temp').textContent = `${Math.round(data.current.temperature_2m)}°`;

        // Rain probability (using the current hour's probability)
        const currentRain = data.hourly.precipitation_probability[new Date().getHours()];
        const rainEl = document.getElementById('weather-rain');
        if (rainEl) {
            rainEl.textContent = `降水確率 ${currentRain}%`;
        }

        // Hourly forecast (next 4 intervals, 3 hours apart)
        const hourlyList = document.getElementById('weather-forecast-list');
        if (hourlyList) {
            hourlyList.innerHTML = '';
            const now = new Date();
            const startTimestamp = now.getTime();

            for (let i = 1; i <= 4; i++) {
                const targetTime = new Date(startTimestamp + (i * 3 * 60 * 60 * 1000));
                const targetHour = targetTime.getHours();

                // Adjust to local ISO format for matching Open-Meteo "YYYY-MM-DDTHH:00"
                const tzOffset = targetTime.getTimezoneOffset() * 60000;
                const localISO = new Date(targetTime.getTime() - tzOffset).toISOString().split(':')[0] + ':00';
                const index = data.hourly.time.indexOf(localISO);

                if (index !== -1) {
                    const timeStr = `${targetHour}:00`;
                    const temp = Math.round(data.hourly.temperature_2m[index]);
                    const prob = data.hourly.precipitation_probability[index];
                    const iconName = getWeatherIcon(data.hourly.weather_code[index]);

                    const item = document.createElement('div');
                    item.className = 'forecast-hour';
                    item.innerHTML = `
                        <div class="forecast-time">${timeStr}</div>
                        <div class="forecast-icon">${renderIcon(iconName)}</div>
                        <div class="forecast-temp">${temp}°</div>
                        <div style="font-size:0.6rem; color:var(--accent); margin-top:4px;">${prob}%</div>
                    `;
                    hourlyList.appendChild(item);
                }
            }
        }

        // 3-Day Daily Forecast
        const dailyList = document.getElementById('weather-daily-list');
        if (dailyList) {
            dailyList.innerHTML = '';
            const dayLabels = ['今日', '明日', '明後日'];

            for (let i = 0; i < 3; i++) {
                const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
                const minTemp = Math.round(data.daily.temperature_2m_min[i]);
                const iconName = getWeatherIcon(data.daily.weather_code[i]);

                const item = document.createElement('div');
                item.className = 'daily-item';
                item.style.display = 'flex';
                item.style.justifyContent = 'space-between';
                item.style.alignItems = 'center';
                item.style.padding = '8px 0';
                item.style.fontSize = '0.9rem';
                item.style.borderTop = i === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)';

                item.innerHTML = `
                    <div style="width: 50px; color: var(--text-sub);">${dayLabels[i]}</div>
                    <div class="daily-item-icon">${renderIcon(iconName)}</div>
                    <div style="display: flex; gap: 10px; width: 80px; justify-content: flex-end;">
                        <span style="color: #ff6b6b;">${maxTemp}°</span>
                        <span style="color: #4dabf7; opacity: 0.7;">${minTemp}°</span>
                    </div>
                `;
                dailyList.appendChild(item);
            }
        }

        // Initialize Lucide icons
        if (window.lucide) {
            lucide.createIcons();
        }

        console.log('Weather updated for Shinjuku (Real-time & 3-Day) with Lucide icons');
    } catch (err) {
        console.error('Failed to fetch weather:', err);
    }
}

// --- News implementation (Google News RSS) ---
async function updateNews() {
    const rssUrl = encodeURIComponent('https://news.google.com/rss?hl=ja&gl=JP&ceid=JP:ja');
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    try {
        const response = await fetch(proxyUrl);
        const data = await response.json();

        if (data.status === 'ok') {
            const newsList = document.getElementById('news-list');
            if (newsList) {
                newsList.innerHTML = '';
                // Display up to 8 news items
                data.items.slice(0, 8).forEach(item => {
                    const row = document.createElement('div');
                    row.className = 'news-row';
                    row.textContent = item.title;
                    newsList.appendChild(row);
                });
                console.log('News updated');
            }
        }
    } catch (err) {
        console.error('Failed to fetch news:', err);
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
    setInterval(updateWeather, 3600000); // Refresh weather hourly

    updateNews(); // Fetch news
    setInterval(updateNews, 1800000); // Refresh news every 30 mins

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
