const fs = require('fs');

// Remaining living scholars to add
const remainingLivingScholars = [
    "Shaykh ʿAbd al-Ghanī 'Awsāt",
    "Shaykh ʿAbdullāh al-Bukhārī", 
    "Shaykh ʿAbdullāh ad-Dhafīrī",
    "Shaykh Aḥmad az-zahrānī",
    "Shaykh ʿArafāt al-Muḥammadī",
    "Shaykh ʿUbayd ibn ʿAbdullāh al-Jābirī",
    "Shaykh Munīr ibn Saʿīd as-Saʿdī",
    "Shaykh Muṣṭafá Mubram",
    "Shaykh Nizār Hāshim",
    "Shaykh Ṣalāḥ Kantūsh",
    "Shaykh Sālim Bāmiḥriz",
    "Shaykh Ṣāliḥ ibn Fawzān al-Fawzān",
    "Shaykh Ṣāliḥ Āl ash-Shaykh",
    "Shaykh Yaḥyá an-Nahārī",
    // English-speaking scholars
    "ʿAbd al-Ḥakīm Mitchell",
    "ʿAbdulilāh Lahmāmī",
    "Abū Idrīs Muḥammad Khān",
    "Abū Isḥāq Nadīm",
    "Abū Khadījah ʿAbd al-Wāḥīd",
    "Abū al-Ḥasan Mālik Ādam",
    "Abū ʿIyāḍ Amjad Rafīq",
    "Abū Ḥafsa Kāshiff Khān",
    "Abū Ḥakīm Bilāl Davis",
    "Anwar Wright",
    "Ḥasan al-Ṣumālī",
    "Uwais aṭ-Ṭawīl"
];

function generateScholarCard(scholarName) {
    return `                    <!-- ${scholarName} -->
                    <article class="biography-card" role="listitem">
                        <details class="biography-details">
                            <summary class="biography-summary" role="button" aria-expanded="false">
                                <h3 class="biography-name">${scholarName}</h3>
                                <p class="biography-short">Islamic Scholar</p>
                                <span class="biography-year living-indicator" aria-label="Living scholar">Living</span>
                            </summary>
                            <div class="biography-content">
                                <p class="biography-full">
                                    Biography details to be added later.
                                </p>
                                <div class="biography-tags">
                                    <span class="biography-tag">Islamic Studies</span>
                                    <span class="biography-tag">Scholar</span>
                                </div>
                            </div>
                        </details>
                    </article>
                    `;
}

// Read the current index.html
let content = fs.readFileSync('./index.html', 'utf8');

// Generate all remaining scholar cards
const remainingCards = remainingLivingScholars.map(generateScholarCard).join('\n');

// Replace the placeholder comment with the actual scholar cards
content = content.replace(
    /<!-- Continue with remaining living scholars\.\.\. -->\s*<!-- I'll add the rest in subsequent updates for better readability -->/,
    remainingCards
);

// Write the updated content
fs.writeFileSync('./index.html', content);

console.log(`Added ${remainingLivingScholars.length} remaining living scholars to index.html`);
