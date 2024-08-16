// script.js

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Exemplo de feriados e anotações
const holidays = {
    '2024-01-01': 'Ano Novo',
    '2024-02-12': 'Carnaval',
    '2024-04-21': 'Tiradentes',
    // Adicione mais feriados conforme necessário
};

const notes = {
    // Formatado como 'YYYY-MM-DD'
};

function generateCalendar(month, year) {
    const calendarContent = document.getElementById('calendar-content');
    const calendarHeader = document.getElementById('calendar-header');
    
    // Limpa o conteúdo do calendário
    calendarContent.innerHTML = '';

    // Define o mês e o ano no cabeçalho
    calendarHeader.textContent = `${getMonthName(month)} ${year}`;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();

    // Adiciona os dias da semana no cabeçalho
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    weekDays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.style.fontWeight = 'bold';
        calendarContent.appendChild(dayElement);
    });

    // Preenche os dias em branco antes do início do mês
    for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement('div');
        calendarContent.appendChild(emptyDay);
    }

    // Preenche os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(year, month, day);
        const formattedDate = formatDate(dayDate);
        const dayElement = document.createElement('div');
        dayElement.textContent = day;

        // Adiciona tooltip para feriados e anotações
        if (holidays[formattedDate]) {
            const holidayTooltip = document.createElement('div');
            holidayTooltip.className = 'tooltip';
            holidayTooltip.textContent = `Feriado: ${holidays[formattedDate]}`;
            dayElement.appendChild(holidayTooltip);
            dayElement.classList.add('holiday');
        }

        if (notes[formattedDate]) {
            const noteTooltip = document.createElement('div');
            noteTooltip.className = 'tooltip';
            noteTooltip.textContent = `Anotação: ${notes[formattedDate]}`;
            dayElement.appendChild(noteTooltip);
            dayElement.classList.add('has-notes');
        }

        calendarContent.appendChild(dayElement);
    }
}

function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

function getMonthName(month) {
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return monthNames[month];
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function addNote() {
    const noteDate = document.getElementById('note-date').value;
    const noteText = document.getElementById('note-text').value;

    if (noteDate && noteText) {
        notes[noteDate] = noteText;
        generateCalendar(currentMonth, currentYear); // Atualiza o calendário para mostrar as novas anotações
        document.getElementById('note-date').value = '';
        document.getElementById('note-text').value = '';
    }
}

// Inicializa o calendário
generateCalendar(currentMonth, currentYear);
    