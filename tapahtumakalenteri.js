// Musa-Vintti - Tapahtumien lataus Google Sheetsistä
const sheetId = '1Ewxa8dlcfUdJhx0UYCjDOtQqcDYIOaaM7bAaxpFI8aA';
const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

async function loadEvents() {
    try {
        const response = await fetch(csvUrl);
        const data = await response.text();
        
        const rows = data.split('\n').slice(1);
        const container = document.getElementById('events-loading-container');
        
        if (!container) return; // Varmistus, että elementti on olemassa
        container.innerHTML = '';

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let hasFutureEvents = false;

        rows.forEach(row => {
            const cols = row.split(',');
            if (cols.length < 3) return;

            const paivaTeksti = cols[0].trim();
            const aika = cols[1].trim();
            const nimi = cols[2].trim();
            const hinta = cols[3] ? cols[3].trim() : 'VAPAA PÄÄSY';

            const dateMatch = paivaTeksti.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
            
            if (dateMatch) {
                const day = parseInt(dateMatch[1]);
                const month = parseInt(dateMatch[2]) - 1;
                const year = parseInt(dateMatch[3]);
                
                const eventDate = new Date(year, month, day);

                if (eventDate < today) return; 
                
                hasFutureEvents = true;

                const eventHtml = `
                    <div class="event-item d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
                        <div class="mb-3 mb-md-0">
                            <span class="badge bg-danger mb-2 rounded-0">${paivaTeksti.toUpperCase()} | ${aika}</span>
                            <h5 class="mb-0">${nimi}</h5>
                        </div>
                        <div class="text-md-end">
                            <span class="text-gold fw-bold fs-5">${hinta}</span>
                        </div>
                    </div>
                `;
                container.innerHTML += eventHtml;
            }
        });

        if (!hasFutureEvents) {
            container.innerHTML = '<p class="text-center text-muted">Ei tulevia tapahtumia tällä hetkellä. Palaa pian takaisin!</p>';
        }

    } catch (error) {
        console.error('Virhe:', error);
        document.getElementById('events-loading-container').innerHTML = 
            '<p class="text-center text-danger">Tapahtumien lataus epäonnistui.</p>';
    }
}

// Käynnistetään lataus
window.onload = loadEvents;