export const SEASONS = [
  {
    id: "winter",
    label: "Winter",
    months: [12, 1, 2],
    tagline: "Cool, sunny days — perfect for beaches and the desert.",
    destinations: [
      {
        name: "Goa",
        state: "Goa",
        tag: "Beaches",
        bestMonths: "Nov – Feb",
        blurb: "Golden coastline, warm sea breeze, and lively beach shacks at their best once the humidity drops.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/BeachFun.jpg/960px-BeachFun.jpg",
      },
      {
        name: "Jaisalmer",
        state: "Rajasthan",
        tag: "Desert",
        bestMonths: "Dec – Feb",
        blurb: "The Golden City's dunes and sandstone fort are unbearable in summer — winter is the only way to see them.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Jaisalmer_Fort.jpg/960px-Jaisalmer_Fort.jpg",
      },
      {
        name: "Rann of Kutch",
        state: "Gujarat",
        tag: "White Desert",
        bestMonths: "Nov – Feb",
        blurb: "The Rann Utsav festival and moonlit salt flats make winter the one season this desert comes alive.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Rann_of_Kutch_-_White_Desert.jpg/960px-Rann_of_Kutch_-_White_Desert.jpg",
      },
    ],
  },
  {
    id: "summer",
    label: "Summer",
    months: [3, 4, 5, 6],
    tagline: "Plains heat up — head for the hills and the Himalayas.",
    destinations: [
      {
        name: "Manali",
        state: "Himachal Pradesh",
        tag: "Hill Station",
        bestMonths: "Mar – Jun",
        blurb: "Snow-capped peaks and pine valleys stay cool while the rest of India swelters.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Manali_City.jpg/960px-Manali_City.jpg",
      },
      {
        name: "Shimla",
        state: "Himachal Pradesh",
        tag: "Hill Station",
        bestMonths: "Mar – Jun",
        blurb: "The old colonial hill capital, with mist-covered ridges and toy-train views, at its most pleasant.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg/960px-Landscape_of_Shimla_%2C_Himachal_Pradesh.jpg",
      },
      {
        name: "Leh-Ladakh",
        state: "Ladakh",
        tag: "High Desert",
        bestMonths: "May – Jun",
        blurb: "Mountain passes finally open, unveiling turquoise lakes and monasteries under clear skies.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Leh_City_seen_from_Shanti_Stupa.JPG/960px-Leh_City_seen_from_Shanti_Stupa.JPG",
      },
    ],
  },
  {
    id: "monsoon",
    label: "Monsoon",
    months: [7, 8, 9],
    tagline: "The rains turn the Western Ghats and the Northeast lush green.",
    destinations: [
      {
        name: "Munnar",
        state: "Kerala",
        tag: "Tea Hills",
        bestMonths: "Jul – Sep",
        blurb: "Mist rolls over endless tea plantations, and waterfalls fill up across the Western Ghats.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/960px-Munnar_Overview.jpg",
      },
      {
        name: "Coorg",
        state: "Karnataka",
        tag: "Coffee Country",
        bestMonths: "Jul – Sep",
        blurb: "Coffee estates and rainforest turn a deep, glowing green — the Scotland of India in full bloom.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Raja%27s_Seat_View_Point.jpg/960px-Raja%27s_Seat_View_Point.jpg",
      },
      {
        name: "Cherrapunji",
        state: "Meghalaya",
        tag: "Waterfalls",
        bestMonths: "Jun – Sep",
        blurb: "One of the wettest places on Earth — living root bridges and cascades at their most dramatic.",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Cherrapunji.jpg",
      },
    ],
  },
  {
    id: "autumn",
    label: "Autumn",
    months: [10, 11],
    tagline: "Post-monsoon skies clear up — ideal for backwaters and lakes.",
    destinations: [
      {
        name: "Alleppey",
        state: "Kerala",
        tag: "Backwaters",
        bestMonths: "Oct – Nov",
        blurb: "Freshly rain-fed canals and paddy fields make houseboat cruises through the backwaters unmissable.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/960px-Alappuzha_Boat_Beauty_W.jpg",
      },
      {
        name: "Udaipur",
        state: "Rajasthan",
        tag: "Lake City",
        bestMonths: "Oct – Nov",
        blurb: "Lake Pichola is at its fullest after the rains, mirroring the City Palace at golden hour.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Evening_view%2C_City_Palace%2C_Udaipur.jpg/960px-Evening_view%2C_City_Palace%2C_Udaipur.jpg",
      },
      {
        name: "Rishikesh",
        state: "Uttarakhand",
        tag: "Riverside",
        bestMonths: "Oct – Nov",
        blurb: "The Ganges runs clear and full through the Himalayan foothills — prime time for rafting and yoga retreats.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Trayambakeshwar_Temple_VK.jpg/960px-Trayambakeshwar_Temple_VK.jpg",
      },
    ],
  },
];

export function getCurrentSeasonId(date = new Date()) {
  const month = date.getMonth() + 1;
  const season = SEASONS.find((s) => s.months.includes(month));
  return season ? season.id : SEASONS[0].id;
}
