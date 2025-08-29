// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // SECTION 1: DATA SOURCE

    // =================================================================
    const services = [
        { id: 1, icon: 'assets/emergency.png', name: 'National Emergency Number', englishName: 'National Emergency', number: '999', category: 'All' },
        { id: 2, icon: 'assets/police.png', name: 'Police Helpline Number', englishName: 'Police', number: '999', category: 'Police' },
        { id: 3, icon: 'assets/fire-service.png', name: 'Fire Service Number', englishName: 'Fire Service', number: '999', category: 'Fire' },
        { id: 4, icon: 'assets/ambulance.png', name: 'Ambulance Service', englishName: 'Ambulance', number: '1994-999999', category: 'Health' },
        { id: 5, icon: 'assets/women.png', name: 'Women & Child Helpline', englishName: 'Women & Child Helpline', number: '109', category: 'Help' },
        { id: 6, icon: 'assets/stop-corruption.png', name: 'Anti-Corruption Helpline', englishName: 'Anti-Corruption', number: '106', category: 'Govt.' },
        { id: 7, icon: 'assets/eco-house.png', name: 'Electricity Helpline', englishName: 'Electricity Outage', number: '16216', category: 'Electricity' },
        { id: 8, icon: 'assets/brac.png', name: 'Brac Helpline', englishName: 'Brac', number: '16445', category: 'NGO' },
        { id: 9, icon: 'assets/Bangladesh-Railway.png', name: 'Bangladesh Railway Helpline', englishName: 'Bangladesh Railway', number: '163', category: 'Travel' }
    ];

    // =================================================================
    // SECTION 2: DOM ELEMENT SELECTION
    // =================================================================
    const cardContainer = document.getElementById('card-container');
    const heartCountEl = document.getElementById('heart-count');
    const coinCountEl = document.getElementById('coin-count');
    const copyCountEl = document.getElementById('copy-count');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    // =================================================================
    // SECTION 3: STATE VARIABLES
    // =================================================================
    let heartCount = 0;
    let coinCount = 100;
    let copyCount = 0;
    const likedServices = new Set(); 

    // =================================================================
    // SECTION 4: CORE FUNCTIONS
    // =================================================================

    /**
     * Renders all service cards to the DOM.
     * The 'whitespace-nowrap' class is added to the buttons to prevent text wrapping on deployment.
     */
    const displayServices = () => {
        cardContainer.innerHTML = ''; 
        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'card bg-white shadow-sm rounded-2xl p-5 border border-green-100';
            card.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="bg-red-50 p-3 rounded-lg"><img src="${service.icon}" alt="${service.name}" class="w-8 h-8"></div>
                    <svg data-service-id="${service.id}" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 heart-icon-card" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
                </div>
                <div class="mt-4">
                    <h3 class="font-bold text-lg service-name">${service.name}</h3>
                    <p class="text-gray-500 text-sm">${service.englishName}</p>
                    <p class="font-bold text-2xl my-2 service-number">${service.number}</p>
                    <div class="badge badge-ghost">${service.category}</div>
                </div>
                <div class="mt-5 flex gap-3">
                    <button class="btn btn-outline btn-success btn-sm flex-1 whitespace-nowrap copy-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        Copy
                    </button>
                    <button class="btn btn-success btn-sm flex-1 whitespace-nowrap text-white call-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        Call
                    </button>
                </div>
            `;
            cardContainer.appendChild(card);
        });
    };

    const updateCounters = () => {
        heartCountEl.textContent = heartCount;
        coinCountEl.textContent = coinCount;
        copyCountEl.textContent = copyCount;
    };

    const handleCallClick = (card) => {
        const CALL_COST = 20;
        if (coinCount < CALL_COST) {
            alert(`You don’t have enough coins to make a call. You need at least ${CALL_COST} coins.`);
            return;
        }
        coinCount -= CALL_COST;
        const serviceName = card.querySelector('.service-name').textContent;
        const serviceNumber = card.querySelector('.service-number').textContent;
        alert(`Calling ${serviceName} (${serviceNumber})`);
        const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        const historyItem = document.createElement('div');
        historyItem.className = 'bg-gray-50 p-3 rounded-lg flex justify-between items-center';
        historyItem.innerHTML = `<div><p class="font-semibold text-gray-700">${serviceName}</p><p class="text-sm text-gray-500">${serviceNumber}</p></div><span class="text-sm text-gray-500">${currentTime}</span>`;
        historyList.prepend(historyItem);
        updateCounters();
    };
    
    // =================================================================
    // SECTION 5: EVENT LISTENERS
    // =================================================================
    
    cardContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        if (!card) return;

        if (event.target.closest('.heart-icon-card')) {
            const heartIcon = event.target.closest('.heart-icon-card');
            const serviceId = heartIcon.dataset.serviceId;
            if (!likedServices.has(serviceId)) {
                heartCount++;
                likedServices.add(serviceId);
                heartIcon.classList.add('liked');
                updateCounters();
            }
        } else if (event.target.closest('.copy-btn')) {
            const number = card.querySelector('.service-number').textContent;
            navigator.clipboard.writeText(number).then(() => {
                alert(`"${number}" copied to clipboard.`);
                copyCount++;
                updateCounters();
            });
        } else if (event.target.closest('.call-btn')) {
            handleCallClick(card);
        }
    });

    clearHistoryBtn.addEventListener('click', () => {
        historyList.innerHTML = '';
        alert('Call history has been cleared.');
    });

    // =================================================================
    // SECTION 6: INITIALIZE APP
    // =================================================================
    displayServices();
    updateCounters();
});