// Инициализация даты при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const currentDate = new Date();
    document.getElementById('currentDate').value = currentDate.toISOString().split('T')[0];
});

// Функция для генерации случайного числа
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция для расчета коэффициента
const calculateCoefficient = (done, plan, coefficient) => {
    if (!done || !plan || coefficient === 'x' || coefficient === '×') return '×';
    const value = (done / plan) * coefficient;
    return value.toFixed(2);
};

// Функция распределения для пункта 16
const distribute16 = (total) => {
    return {
        afterIllness: Math.round(total * (100/815)), // на посещение ДДУ после болезни
        kindergarten: Math.round(total * (25/815)), // поступающему в детский сад
        hospitalization: Math.round(total * (25/815)), // на госпитализацию/консультацию
        spaRequest: Math.round(total * (25/815)), // справка для получения путевки
        spaCard: Math.round(total * (15/815)), // санаторно-курортная карта
        outpatientCard: Math.round(total * (595/815)), // талон амбулаторного пациента
        emergencyNotice: Math.round(total * (30/815)) // экстренное извещение
    };
};

// Функция генерации случайных значений для всех полей
const generateRandomValues = () => {
    // Генерируем основные значения
    const clinicTotal = getRandomNumber(15, 18);
    const homeTotal = getRandomNumber(5, 9);
    const docsTotal = getRandomNumber(25, 30); // для пункта 16

    // Объект с минимальными и максимальными значениями для каждого поля
    const fieldsRanges = {
        // Поликлиника
        '1': [clinicTotal, clinicTotal],
        '1A': [Math.floor(clinicTotal * 0.6), Math.ceil(clinicTotal * 0.7)],
        '1A1': [Math.floor(clinicTotal * 0.2), Math.ceil(clinicTotal * 0.3)],
        '1A2': [Math.floor(clinicTotal * 0.2), Math.ceil(clinicTotal * 0.3)],
        '1B': [Math.floor(clinicTotal * 0.3), Math.ceil(clinicTotal * 0.4)],
        '1B1': [Math.floor(clinicTotal * 0.15), Math.ceil(clinicTotal * 0.2)],
        '1B2': [Math.floor(clinicTotal * 0.15), Math.ceil(clinicTotal * 0.2)],
        
        // Дом
        '2': [homeTotal, homeTotal],
        '2A': [Math.floor(homeTotal * 0.2), Math.ceil(homeTotal * 0.3)],
        '2B': [Math.floor(homeTotal * 0.2), Math.ceil(homeTotal * 0.3)],
        '2C': [Math.floor(homeTotal * 0.2), Math.ceil(homeTotal * 0.3)],
        '2D': [Math.floor(homeTotal * 0.2), Math.ceil(homeTotal * 0.3)],
        
        // Документы (пункт 16)
        '16': [docsTotal, docsTotal],

        // Остальные поля с реалистичными диапазонами
        '3': [Math.floor(clinicTotal * 0.8), clinicTotal],
        '4': [Math.floor(clinicTotal * 0.2), Math.ceil(clinicTotal * 0.3)],
        '5': [Math.floor(clinicTotal * 0.3), Math.ceil(clinicTotal * 0.4)],
        '6': [Math.floor(clinicTotal * 0.3), Math.ceil(clinicTotal * 0.4)],
        '7': [Math.floor(clinicTotal * 0.2), Math.ceil(clinicTotal * 0.3)],
        '8': [Math.floor(clinicTotal * 0.2), Math.ceil(clinicTotal * 0.3)],
        '9': [Math.floor(clinicTotal * 0.2), Math.ceil(clinicTotal * 0.3)],
        '10': [Math.floor(clinicTotal * 0.2), Math.ceil(clinicTotal * 0.3)],
        '11': [Math.floor(clinicTotal * 0.1), Math.ceil(clinicTotal * 0.2)],
        '12': [Math.floor(clinicTotal * 0.6), Math.ceil(clinicTotal * 0.7)],
        '13': [Math.floor(clinicTotal * 0.1), Math.ceil(clinicTotal * 0.2)],
        '14': [Math.floor(clinicTotal * 0.8), clinicTotal],
        '15': [Math.floor(clinicTotal * 0.2), Math.ceil(clinicTotal * 0.3)],
        '17': [Math.floor(homeTotal * 0.2), Math.ceil(homeTotal * 0.3)],
        '18': [Math.floor(homeTotal * 0.2), Math.ceil(homeTotal * 0.3)],
        '19': [Math.floor(homeTotal * 0.1), Math.ceil(homeTotal * 0.2)],
        '20': [Math.floor(clinicTotal * 0.3), Math.ceil(clinicTotal * 0.4)]
    };

    // Заполняем все поля случайными значениями из диапазонов
    Object.entries(fieldsRanges).forEach(([id, [min, max]]) => {
        const input = document.querySelector(`input[data-id="${id}"]`);
        if (input) {
            input.value = getRandomNumber(min, max);
        }
    });

    // Распределяем значения для пункта 16
    const docs16 = distribute16(parseInt(document.querySelector('input[data-id="16"]').value));
    document.querySelector('input[data-id="16A"]').value = docs16.afterIllness;
    document.querySelector('input[data-id="16B"]').value = docs16.kindergarten;
    document.querySelector('input[data-id="16C"]').value = docs16.hospitalization;
    document.querySelector('input[data-id="16D"]').value = docs16.spaRequest;
    document.querySelector('input[data-id="16E"]').value = docs16.spaCard;
    document.querySelector('input[data-id="16F"]').value = docs16.outpatientCard;
    document.querySelector('input[data-id="16G"]').value = docs16.emergencyNotice;

    // Рассчитываем коэффициенты после заполнения
    calculateAllCoefficients();
};

// Функция распределения значений при изменении пункта 16
const handle16Change = (value) => {
    const docs16 = distribute16(parseInt(value));
    document.querySelector('input[data-id="16A"]').value = docs16.afterIllness;
    document.querySelector('input[data-id="16B"]').value = docs16.kindergarten;
    document.querySelector('input[data-id="16C"]').value = docs16.hospitalization;
    document.querySelector('input[data-id="16D"]').value = docs16.spaRequest;
    document.querySelector('input[data-id="16E"]').value = docs16.spaCard;
    document.querySelector('input[data-id="16F"]').value = docs16.outpatientCard;
    document.querySelector('input[data-id="16G"]').value = docs16.emergencyNotice;
};

// Функция расчета всех коэффициентов
const calculateAllCoefficients = () => {
    const rows = document.querySelectorAll('tr');
    let totalSum = 0;
    let count = 0;

    rows.forEach(row => {
        const input = row.querySelector('input');
        if (!input) return;

        const done = parseFloat(input.value) || 0;
        const planCell = row.querySelector('td:nth-child(3)');
        const coeffCell = row.querySelector('td:nth-child(5)');
        const resultCell = row.querySelector('td:nth-child(6)');

        if (!planCell || !coeffCell || !resultCell) return;

        const plan = parseFloat(planCell.textContent) || 0;
        const coeff = coeffCell.textContent.trim();

        if (coeff !== '×' && coeff !== 'x') {
            const result = calculateCoefficient(done, plan, parseFloat(coeff));
            if (result !== '×') {
                resultCell.textContent = result;
                totalSum += parseFloat(result);
                count++;
            }
        }
    });

    // Просто сумма всех коэффициентов выполнения
    if (totalSum > 0) {
        document.getElementById('totalCoefficient').textContent = totalSum.toFixed(2);
    }
};

// Обработчики событий
document.getElementById('calculateBtn').addEventListener('click', calculateAllCoefficients);

document.getElementById('clearBtn').addEventListener('click', () => {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.value = '';
    });
    document.querySelectorAll('td:last-child').forEach(td => {
        td.textContent = td.textContent === '×' ? '×' : '';
    });
    document.getElementById('totalCoefficient').textContent = '';
});

document.getElementById('randomBtn').addEventListener('click', generateRandomValues);

// Обработчик изменения значений в полях
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', (e) => {
        // Если изменилось значение пункта 16, пересчитываем его подпункты
        if (e.target.getAttribute('data-id') === '16') {
            handle16Change(e.target.value);
        }
        calculateAllCoefficients();
    });
});

document.getElementById('exportPdfBtn').addEventListener('click', () => {
    window.print();
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Удаляем атрибут readonly у всех полей ввода
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.removeAttribute('readonly');
    });
});