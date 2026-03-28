const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const USER_ID = process.env.AFDIAN_USER_ID;
const TOKEN = process.env.AFDIAN_TOKEN;

if (!USER_ID || !TOKEN) {
    console.error("Missing AFDIAN_USER_ID or AFDIAN_TOKEN environment variables.");
    process.exit(1);
}

const CONTRIBUTORS_FILE = path.join(__dirname, '../contributors.json');

async function getAllSponsors() {
    let allSponsors = [];
    let page = 1;
    let totalPage = 1;

    do {
        console.log(`Fetching page ${page}...`);
        const ts = Math.floor(Date.now() / 1000);
        const params = JSON.stringify({ page });

        // Afdian Sign algorithm
        const signStr = `${TOKEN}params${params}ts${ts}user_id${USER_ID}`;
        const sign = crypto.createHash('md5').update(signStr).digest('hex');

        const res = await fetch('https://ifdian.net/api/open/query-sponsor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: USER_ID,
                params,
                ts,
                sign
            })
        });

        const data = await res.json();

        if (data.ec !== 200) {
            throw new Error(`Afdian API Error: ${data.em}`);
        }

        const list = data.data.list;
        allSponsors = allSponsors.concat(list);

        totalPage = data.data.total_page;
        page++;
    } while (page <= totalPage);

    return allSponsors;
}

async function main() {
    try {
        console.log("Starting Afdian sponsor sync...");
        const sponsors = await getAllSponsors();
        console.log(`Fetched ${sponsors.length} sponsors from Afdian.`);

        // Read current contributors.json
        let contributorsData = { contributors: [] };
        if (fs.existsSync(CONTRIBUTORS_FILE)) {
            contributorsData = JSON.parse(fs.readFileSync(CONTRIBUTORS_FILE, 'utf-8'));
        }

        // Remove existing sponsor category
        contributorsData.contributors = contributorsData.contributors.filter(c => c.category !== 'sponsor');

        // Map Afdian data to our ContributorEntry schema
        // Sort by total sponsored amount (all_sum_amount) descending
        sponsors.sort((a, b) => parseFloat(b.all_sum_amount) - parseFloat(a.all_sum_amount));

        const sponsorEntries = sponsors.map(s => {
            return {
                name: s.sponsor.name,
                category: 'sponsor',
                avatarUrl: s.sponsor.avatar,
                description: `累计发电: ￥${s.all_sum_amount}`,
            };
        });

        // Add to the front of contributors
        contributorsData.contributors = [...sponsorEntries, ...contributorsData.contributors];

        // Save
        fs.writeFileSync(CONTRIBUTORS_FILE, JSON.stringify(contributorsData, null, 2), 'utf-8');
        console.log(`Successfully updated ${CONTRIBUTORS_FILE}`);

    } catch (e) {
        console.error("Failed to sync sponsors:", e);
        process.exit(1);
    }
}

main();
