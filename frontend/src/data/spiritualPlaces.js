// Reuses the same 4-season model as seasonalDestinations.js so the section
// can share the same season-tab UI pattern.
export const YATRA_SEASONS = [
  { id: "winter", label: "Winter", months: [12, 1, 2] },
  { id: "summer", label: "Summer", months: [3, 4, 5, 6] },
  { id: "monsoon", label: "Monsoon", months: [7, 8, 9] },
  { id: "autumn", label: "Autumn", months: [10, 11] },
];

export function getCurrentYatraSeasonId(date = new Date()) {
  const month = date.getMonth() + 1;
  const season = YATRA_SEASONS.find((s) => s.months.includes(month));
  return season ? season.id : YATRA_SEASONS[0].id;
}

// Char Dham + major Himalayan shrines: these physically close for winter
// snow, so "open" depends on which month is currently selected.
export const HIMALAYAN_YATRA = [
  {
    name: "Yamunotri",
    state: "Uttarakhand",
    tag: "Char Dham",
    openMonths: [5, 6, 7, 8, 9, 10],
    windowLabel: "Akshaya Tritiya (late Apr/May) – Diwali (Oct/Nov)",
    blurb: "Source of the Yamuna, the westernmost of the Char Dham, reached via a steep Himalayan trek.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Yamuna_at_Yamunotri.JPG/960px-Yamuna_at_Yamunotri.JPG",
  },
  {
    name: "Gangotri",
    state: "Uttarakhand",
    tag: "Char Dham",
    openMonths: [5, 6, 7, 8, 9, 10],
    windowLabel: "Akshaya Tritiya (late Apr/May) – Diwali (Oct/Nov)",
    blurb: "The Ganga's origin shrine, set against snow peaks — closes completely once winter snow arrives.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Gangotri_%28ganga_river%29.jpg/960px-Gangotri_%28ganga_river%29.jpg",
  },
  {
    name: "Kedarnath",
    state: "Uttarakhand",
    tag: "Char Dham · Jyotirlinga",
    openMonths: [5, 6, 7, 8, 9, 10],
    windowLabel: "Akshaya Tritiya (early May) – Bhai Dooj (Oct/Nov)",
    blurb: "Both a Char Dham shrine and one of the twelve Jyotirlingas, tucked high in the Garhwal Himalaya.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Kedarnath_View1.jpg",
  },
  {
    name: "Badrinath",
    state: "Uttarakhand",
    tag: "Char Dham",
    openMonths: [5, 6, 7, 8, 9, 10, 11],
    windowLabel: "Akshaya Tritiya (early May) – mid-November",
    blurb: "Dedicated to Vishnu, the last of the Char Dham to close each year as winter sets in.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Badrinath_Temple-_Uttarakhand.jpg/960px-Badrinath_Temple-_Uttarakhand.jpg",
  },
  {
    name: "Amarnath Cave",
    state: "Jammu & Kashmir",
    tag: "Himalayan Yatra",
    openMonths: [7, 8],
    windowLabel: "Shravan month only — roughly late June to late August",
    blurb: "The naturally-forming ice lingam is visible only for a few short monsoon weeks each year.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Cave_Temple_of_Lord_Amarnath.jpg/960px-Cave_Temple_of_Lord_Amarnath.jpg",
  },
  {
    name: "Vaishno Devi",
    state: "Jammu & Kashmir",
    tag: "Himalayan Shrine",
    yearRound: true,
    windowLabel: "Open all year — best March to October",
    blurb: "Unlike the Char Dham, the Trikuta hill shrine stays open year-round for pilgrims.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Snowfall_in_Vaishno_Devi.jpg",
  },
];

// The twelve Jyotirlingas — ancient Shiva temples spread across India.
// Unlike the Himalayan shrines above, these stay open all year.
export const JYOTIRLINGAS = [
  {
    name: "Somnath",
    state: "Gujarat",
    windowLabel: "Year-round — best Nov to Feb",
    blurb: "The first among the twelve Jyotirlingas, rebuilt on the Arabian Sea coast.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Shree_Somnath_Temple.jpg/960px-Shree_Somnath_Temple.jpg",
  },
  {
    name: "Mallikarjuna",
    state: "Srisailam, Andhra Pradesh",
    windowLabel: "Year-round — best Oct to Mar",
    blurb: "Perched on the Nallamala hills above the Krishna river gorge.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Srisailam-temple-entrance.jpg/960px-Srisailam-temple-entrance.jpg",
  },
  {
    name: "Mahakaleshwar",
    state: "Ujjain, Madhya Pradesh",
    windowLabel: "Year-round — famous for the pre-dawn Bhasma Aarti",
    blurb: "One of the few Jyotirlingas facing south, at the heart of Ujjain's temple city.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/71/Shri_mahakaleshwar_jyotirlinga_temple_Ujjain_02.jpg",
  },
  {
    name: "Omkareshwar",
    state: "Madhya Pradesh",
    windowLabel: "Year-round — best Oct to Mar",
    blurb: "Built on an island in the Narmada river shaped like the Om symbol.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Omkareswar_Jyotirlinga.jpg/960px-Omkareswar_Jyotirlinga.jpg",
  },
  {
    name: "Bhimashankar",
    state: "Maharashtra",
    windowLabel: "Year-round — lush in the Jun–Sep monsoon",
    blurb: "Deep in the Sahyadri hills, surrounded by a dense wildlife sanctuary.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Bhimashankar.jpg",
  },
  {
    name: "Kashi Vishwanath",
    state: "Varanasi, Uttar Pradesh",
    windowLabel: "Year-round — best Oct to Mar",
    blurb: "On the banks of the Ganga in India's oldest living city, beside the ghats.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Kashi_Vishwanath.jpg",
  },
  {
    name: "Trimbakeshwar",
    state: "Nashik, Maharashtra",
    windowLabel: "Year-round — best Sep to Feb",
    blurb: "Near the source of the Godavari river, with a uniquely triple-faced lingam.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Trimbakeshwar_Shiva_Temple_2005.jpg/960px-Trimbakeshwar_Shiva_Temple_2005.jpg",
  },
  {
    name: "Vaidyanath",
    state: "Deoghar, Jharkhand",
    windowLabel: "Year-round — huge crowds during Shravan (Jul–Aug)",
    blurb: "Also called Baidyanath Dham, the endpoint of the famous Kanwar pilgrimage.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Baidyanath_temple_and_temple_complex%2C_Deoghar_11.jpg/960px-Baidyanath_temple_and_temple_complex%2C_Deoghar_11.jpg",
  },
  {
    name: "Nageshwar",
    state: "Dwarka, Gujarat",
    windowLabel: "Year-round — best Oct to Mar",
    blurb: "Close to the Dwarkadhish temple, marked by a giant Shiva statue.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Shree_Nageshwar_Jyotirling_temple%2C_Dwarka%2C_Gujarat.jpg/960px-Shree_Nageshwar_Jyotirling_temple%2C_Dwarka%2C_Gujarat.jpg",
  },
  {
    name: "Rameshwaram",
    state: "Tamil Nadu",
    windowLabel: "Year-round — best Oct to Apr",
    blurb: "Where Rama is said to have worshipped Shiva, on an island linked to Sri Lanka by legend.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Ramanathaswamy_temple7.JPG/960px-Ramanathaswamy_temple7.JPG",
  },
  {
    name: "Grishneshwar",
    state: "Aurangabad, Maharashtra",
    windowLabel: "Year-round — best Oct to Mar",
    blurb: "The last of the twelve, right next to the Ellora Caves.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Grishneshwar_Temple_Ellora.jpg/960px-Grishneshwar_Temple_Ellora.jpg",
  },
];

// Sacred Ganga towns — always open, best visited outside the monsoon.
export const GANGA_TOWNS = [
  {
    name: "Rishikesh",
    state: "Uttarakhand",
    windowLabel: "Year-round — best Sep to Apr",
    blurb: "The gateway to the Char Dham, known for its Ganga aarti, ashrams, and yoga retreats.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Trayambakeshwar_Temple_VK.jpg/960px-Trayambakeshwar_Temple_VK.jpg",
  },
  {
    name: "Haridwar",
    state: "Uttarakhand",
    windowLabel: "Year-round — best Oct to Mar",
    blurb: "Where the Ganga leaves the Himalayas for the plains — home to the nightly Har Ki Pauri aarti.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Ganga_aarti_haridwar_01.jpg/960px-Ganga_aarti_haridwar_01.jpg",
  },
];
