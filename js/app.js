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

// Initialize
function init() {
    setInterval(updateTime, 1000);
    updateTime();
    updateCalendar();
    requestWakeLock();

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
