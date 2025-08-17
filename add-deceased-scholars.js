const fs = require('fs');

// Deceased scholars with their death years
const deceasedScholars = [
    { name: "Shaykh ʿAbdullāh bin Ḥumaid", year: "1402H" },
    { name: "Shaykh ʿUmar bin Muḥammad al-Fallātah", year: "1419H" },
    { name: "Shaykh ʿAbdullāh Bassām", year: "1423H" },
    { name: "Abū ʿUways", year: "1425H" },
    { name: "Shaykh ʿAbd as-Salām Burjiss", year: "1425H" },
    { name: "Shaykh Ṣafī ar-Raḥmān al-Mubārakfurī", year: "1427H" },
    { name: "Shaykh Aḥmad ibn Yaḥyá al-Najmī", year: "1429H" },
    { name: "Dr. Ṣāliḥ aṣ-Ṣāliḥ", year: "1429H" },
    { name: "Shaykh Muḥammad ibn ʿAbd al-Wahhāb al-Banná", year: "1430H" },
    { name: "Shaykh ʿAbdullāh Al-Ghudayān", year: "1431H" },
    { name: "Abū Ṭalḥah Dāwūd Burbank", year: "1432H" },
    { name: "Shaykh ʿAbdullāh ʿAqīl", year: "1433H" },
    { name: "Shaykh Muḥammad ibn ʿAbd al-Wahhāb al-Waṣṣābī", year: "1436H" },
    { name: "Shaykh Zayd Al-Madkhalī", year: "1436H" },
    { name: "Abū ʿUmar Farūq", year: "1438H" },
    { name: "Shaykh Yāsīn al-ʿAdanī", year: "1439H" },
    { name: "Shaykh Ḥasan ibn ʿAbd al-Wahhāb al-Banná", year: "1442H" },
    { name: "Shaykh Muḥammad bin ʿĀlī bin Ādam al-Ithyūbī", year: "1442H" },
    { name: "Shaykh Ṣāliḥ al-Luḥaydān", year: "1443H" },
    { name: "Shaykh ʿAlī al-Waṣīfī", year: "1444H" },
    { name: "Shaykh ʿAlī Nāṣir al-Faqīhī", year: "1446H" }
];

function generateScholarCard(scholar) {
    return `                    <!-- ${scholar.name} -->
                    <article class="biography-card" role="listitem">
                        <details class="biography-details">
                            <summary class="biography-summary" role="button" aria-expanded="false">
                                <h3 class="biography-name">${scholar.name}</h3>
                                <p class="biography-short">Islamic Scholar</p>
                                <span class="biography-year" aria-label="Year of death">${scholar.year}</span>
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

// Find the 1400-1500 AH section and add new scholars before the closing </div>
const section1400Pattern = /(<!-- 1400s AH Century -->[\s\S]*?<div class="biography-grid" role="list">[\s\S]*?)(\s*<\/div>\s*<\/section>)/;

// Generate scholar cards for the 1400-1500 AH period
const newScholars1400 = deceasedScholars.map(generateScholarCard).join('\n');

// Replace the section
content = content.replace(section1400Pattern, `$1
${newScholars1400}$2`);

// Write the updated content
fs.writeFileSync('./index.html', content);

console.log(`Added ${deceasedScholars.length} deceased scholars to the 1400-1500 AH section`);
