const fs = require('fs');
const path = require('path');

// All new scholars (both living and deceased)
const allNewScholars = [
    // Living scholars
    "Shaykh Bandar al-Khaybarī", 
    "Shaykh Fawāz al-Madkhalī",
    "Shaykh Khālid ad-Dhafīrī",
    "Shaykh Muḥammad Ghālib al-'Umarī",
    "Shaykh ʿAbd al-Muḥsin al-ʿAbbād",
    "Shaykh ʿAbd al-ʿAzīz ibn ʿAbdullāh Āl ash-Shaykh",
    "Shaykh ʿAbd al-Ghanī 'Awsāt",
    "Shaykh ʿAbdullāh al-Bukhārī",
    "Shaykh ʿAbdullāh ad-Dhafīrī",
    "Shaykh Aḥmad az-zahrānī",
    "Shaykh ʿArafāt al-Muḥammadī",
    "Shaykh ʿUbayd ibn ʿAbdullāh al-Jābirī",
    "Shaykh Munīr ibn Saʿīd as-Saʿdī",
    "Shaykh Muṣṭafá Mubram",
    "Shaykh Nizār Hāshim",
    "Shaykh Rāʾid al-Mahdāwī",
    "Shaykh Ṣalāḥ Kantūsh",
    "Shaykh Sālim Bāmiḥriz",
    "Shaykh Ṣāliḥ ibn Fawzān al-Fawzān",
    "Shaykh Ṣāliḥ Āl ash-Shaykh",
    "Shaykh Yaḥyá an-Nahārī",
    "Shaykh Zakariyyā ibn Shu'ayb al-'Adanī",
    // English-speaking scholars
    "ʿAbd al-Ḥakīm Mitchell",
    "ʿAbdulilāh Lahmāmī",
    "Abū Idrīs Muḥammad Khān",
    "Abū Isḥāq Nadīm",
    "Abū Khadījah ʿAbd al-Wāḥīd",
    "Abū Muḥammad al-Maghribī",
    "Abū al-Ḥasan Mālik Ādam",
    "Abū ʿIyāḍ Amjad Rafīq",
    "Abū Ḥafsa Kāshiff Khān",
    "Abū Ḥakīm Bilāl Davis",
    "Anwar Wright",
    "Ḥasan al-Ṣumālī",
    "Uwais aṭ-Ṭawīl",
    // Deceased scholars
    "Shaykh ʿAbdullāh bin Ḥumaid",
    "Shaykh ʿUmar bin Muḥammad al-Fallātah",
    "Shaykh ʿAbdullāh Bassām",
    "Abū ʿUways",
    "Shaykh ʿAbd as-Salām Burjiss",
    "Shaykh Ṣafī ar-Raḥmān al-Mubārakfurī",
    "Shaykh Aḥmad ibn Yaḥyá al-Najmī",
    "Dr. Ṣāliḥ aṣ-Ṣāliḥ",
    "Shaykh Muḥammad ibn ʿAbd al-Wahhāb al-Banná",
    "Shaykh ʿAbdullāh Al-Ghudayān",
    "Abū Ṭalḥah Dāwūd Burbank",
    "Shaykh ʿAbdullāh ʿAqīl",
    "Shaykh Muḥammad ibn ʿAbd al-Wahhāb al-Waṣṣābī",
    "Shaykh Zayd Al-Madkhalī",
    "Shaykh Yāsīn al-ʿAdanī",
    "Shaykh Ḥasan ibn ʿAbd al-Wahhāb al-Banná",
    "Shaykh Muḥammad bin ʿĀlī bin Ādam al-Ithyūbī",
    "Shaykh Ṣāliḥ al-Luḥaydān",
    "Shaykh ʿAlī al-Waṣīfī",
    "Shaykh ʿAlī Nāṣir al-Faqīhī"
];

// Function to create URL-friendly slug from scholar name
function createSlug(name) {
    return name
        .toLowerCase()
        .replace(/shaykh\s+/gi, '')  // Remove "Shaykh" prefix
        .replace(/dr\.\s+/gi, '')    // Remove "Dr." prefix
        .replace(/abū\s+/gi, 'abu-') // Replace "Abū" with "abu-"
        .replace(/ʿ/g, '')           // Remove Arabic ain
        .replace(/'/g, '')           // Remove apostrophes
        .replace(/ḥ/g, 'h')          // Replace ḥ with h
        .replace(/ṣ/g, 's')          // Replace ṣ with s
        .replace(/ṭ/g, 't')          // Replace ṭ with t
        .replace(/ḍ/g, 'd')          // Replace ḍ with d
        .replace(/ẓ/g, 'z')          // Replace ẓ with z
        .replace(/ā/g, 'a')          // Replace ā with a
        .replace(/ī/g, 'i')          // Replace ī with i
        .replace(/ū/g, 'u')          // Replace ū with u
        .replace(/ḥ/g, 'h')          // Replace ḥ with h
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')        // Replace spaces with hyphens
        .replace(/-+/g, '-')         // Replace multiple hyphens with single
        .replace(/^-|-$/g, '');      // Remove leading/trailing hyphens
}

// Read template
const template = fs.readFileSync('./biographies/template.html', 'utf8');

// Generate biography pages for all new scholars
let createdCount = 0;

allNewScholars.forEach(scholarName => {
    const slug = createSlug(scholarName);
    const filename = `${slug}.html`;
    const filepath = path.join('./biographies', filename);
    
    // Skip if file already exists
    if (fs.existsSync(filepath)) {
        console.log(`Skipped: ${filename} (already exists)`);
        return;
    }
    
    // Replace placeholders in template
    let content = template
        .replace(/\[SCHOLAR_NAME\]/g, scholarName)
        .replace(/\[BIOGRAPHY_CONTENT\]/g, `Detailed biography of ${scholarName} will be added here. This distinguished Islamic scholar made significant contributions to Islamic knowledge and education.`)
        .replace(/\[TEACHERS_CONTENT\]/g, 'Information about the teachers and mentors of this scholar will be added here.')
        .replace(/\[STUDENTS_CONTENT\]/g, 'Information about the notable students and disciples of this scholar will be added here.')
        .replace(/\[WRITTEN_WORKS_CONTENT\]/g, 'Details about the written works and publications of this scholar will be added here.')
        .replace(/\[TAZKIYAH_CONTENT\]/g, 'Testimonials and commendations from other scholars about this scholar will be added here.')
        .replace(/\[WORK_1\]/g, 'Notable work 1 - To be added')
        .replace(/\[WORK_2\]/g, 'Notable work 2 - To be added')
        .replace(/\[WORK_3\]/g, 'Notable work 3 - To be added')
        .replace(/\[DEATH_YEAR\]/g, '[Death Year - To be added]')
        .replace(/\[CENTURY_RANGE\]/g, '[Century Range - To be added]')
        .replace(/\[SCHOLAR_SUBTITLE\]/g, 'Islamic Scholar and Teacher')
        .replace(/\[FULL_NAME\]/g, scholarName)
        .replace(/\[KNOWN_FOR\]/g, 'Islamic Scholarship - To be specified')
        .replace(/\[FIELD_OF_STUDY\]/g, 'Islamic Studies - To be specified')
        .replace(/\[RELATED_SCHOLAR_1\]/g, '#')
        .replace(/\[RELATED_SCHOLAR_2\]/g, '#')
        .replace(/\[RELATED_SCHOLAR_3\]/g, '#')
        .replace(/\[RELATED_SCHOLAR_1_NAME\]/g, 'Related Scholar 1')
        .replace(/\[RELATED_SCHOLAR_2_NAME\]/g, 'Related Scholar 2')
        .replace(/\[RELATED_SCHOLAR_3_NAME\]/g, 'Related Scholar 3')
        .replace(/\[TAZKIYAH_IMAGE_URL\]/g, '')
        .replace(/Written Tazkiyah for \[SCHOLAR_NAME\]/g, `Written Tazkiyah for ${scholarName}`);
    
    // Write the file
    fs.writeFileSync(filepath, content);
    createdCount++;
    console.log(`✓ Created: ${filename}`);
});

console.log(`\nGenerated ${createdCount} new biography pages!`);
