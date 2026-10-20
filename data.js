// Everything the dice can land on. Add your own ideas here.
// Each idea: t = title, s = first step, cost, time

window.AFFIRM = [
  "You are allowed to be a beginner. Every expert started exactly where you are.",
  "New people are lucky to meet you. Walk in like you belong, because you do.",
  "Your curiosity is a good enough reason to go.",
  "You don't need to be good at it to enjoy it.",
  "Showing up is the hardest part, and you already rolled.",
  "Your city is bigger than your routine. Go claim a new corner of it.",
  "Joy counts as productive.",
  "You can leave early. You can also stay late. Both are fine.",
  "The version of you who tries things is already here.",
  "Awkward for five minutes is worth a story for five years.",
  "You deserve plans that are just for you.",
  "Friendships start with one shared interest. Bring yours.",
  "Rest is good. Adventure is good too. Today you pick adventure.",
  "You are building a life you actually want to live, one roll at a time.",
  "Being alone and being lonely are different things. Enjoy your own company.",
  "Someone there is hoping a friendly person shows up. That can be you."
];

window.SOLO = [
  { t: "Start a 10 minute sketch journal", s: "Grab any notebook and a pen. Draw one object on your table tonight. No erasing.", cost: "Free", time: "10 min" },
  { t: "Shoot a photo walk with one rule", s: "Pick a color and only photograph things in that color for 30 minutes.", cost: "Free", time: "30 min" },
  { t: "Bake your first loaf of no knead bread", s: "Mix flour, water, salt and yeast tonight, bake tomorrow. Four ingredients total.", cost: "Under $10", time: "Overnight" },
  { t: "Begin a beginner running plan", s: "Today is just 60 seconds jogging, 90 seconds walking, repeated eight times.", cost: "Free", time: "20 min" },
  { t: "Learn three chords on a ukulele", s: "C, G and A minor unlock hundreds of songs. Look up a free beginner lesson.", cost: "$40 to $60", time: "15 min a day" },
  { t: "Write morning pages for a week", s: "Three handwritten pages, first thing, about anything. Don't reread until day seven.", cost: "Free", time: "20 min" },
  { t: "Grow herbs on your windowsill", s: "Basil and mint are forgiving. Buy one plant, not seeds, and water when the soil is dry.", cost: "Under $10", time: "5 min a day" },
  { t: "Try a free language app streak", s: "Pick the language of a place you want to visit and do one lesson before bed.", cost: "Free", time: "10 min" },
  { t: "Make a zine about your neighborhood", s: "Fold one sheet of paper into an 8 page booklet. Fill it with things only locals know.", cost: "Free", time: "1 hour" },
  { t: "Start a book in a genre you never read", s: "Ask a librarian for their favorite in that genre. Read 20 pages tonight.", cost: "Free with library card", time: "30 min" }
];

window.PEOPLE = [
  { t: "Join a beginner friendly run club", s: "Search your city plus \"social run club\". Most meet weekly and wait for the slowest runner.", cost: "Free", time: "1 hour" },
  { t: "Go to a board game cafe night", s: "Many host open game nights where staff pair solo players into tables.", cost: "$5 to $15", time: "2 hours" },
  { t: "Take a one night pottery class", s: "Look for a drop in wheel session. Going solo is common.", cost: "$40 to $80", time: "2 hours" },
  { t: "Volunteer at a community garden", s: "Email a nearby garden and ask about their next workday. Bring gloves.", cost: "Free", time: "2 to 3 hours" },
  { t: "Sign up for an intro improv class", s: "Improv is built for strangers. The first exercise is literally saying yes.", cost: "$20 to $40 drop in", time: "2 hours" },
  { t: "Find a silent book club", s: "Everyone reads their own book together for an hour, then chats. Easy for introverts.", cost: "Free", time: "90 min" },
  { t: "Play pickup volleyball or pickleball", s: "Search for open play hours at a rec center. Players rotate in, so you just show up.", cost: "Free to $10", time: "1 to 2 hours" },
  { t: "Attend a trivia night alone", s: "Tell the host you're solo. Teams almost always need one more person.", cost: "Price of a drink", time: "2 hours" },
  { t: "Join a group bike ride", s: "Look for no drop rides labeled social or beginner. Nobody gets left behind.", cost: "Free", time: "90 min" },
  { t: "Try a dance class for total beginners", s: "Salsa and line dancing classes rotate partners, so you meet the whole room.", cost: "$15 to $25", time: "1 hour" }
];

window.CITIES = {
  "New York City": [
    { t: "Ride the Staten Island Ferry round trip", s: "It's free and passes the Statue of Liberty. Stand on the right side heading out.", cost: "Free", time: "1 hour" },
    { t: "Eat your way down Arthur Avenue", s: "Pick one bakery, one deli and one pastry shop in the Bronx's Little Italy.", cost: "$20 to $40", time: "2 hours" },
    { t: "Walk the High Line at golden hour", s: "Start at Gansevoort Street and walk north as the sun sets over the Hudson.", cost: "Free", time: "1 hour" },
    { t: "Bike the Hudson River Greenway", s: "Grab a Citi Bike and ride north along the water as far as you want.", cost: "Citi Bike fare", time: "1 to 2 hours" },
    { t: "Visit the New York Botanical Garden", s: "Check their site for free grounds admission days before you go.", cost: "Free to $35", time: "2 to 3 hours" },
    { t: "Ride the 7 train for a Queens food crawl", s: "Hop off in Jackson Heights and try three foods you've never had.", cost: "$15 to $30", time: "2 hours" }
  ],
  "Chicago": [
    { t: "Walk the Lakefront Trail at sunrise", s: "Start near North Avenue Beach for skyline views over the water.", cost: "Free", time: "1 hour" },
    { t: "Take the Riverwalk end to end", s: "Walk it slowly and read the bridge plaques as you go.", cost: "Free", time: "1 hour" },
    { t: "Find the best Italian beef near you", s: "Try one dipped and one dry, then pick a side.", cost: "Under $15", time: "45 min" }
  ],
  "Los Angeles": [
    { t: "Hike to Griffith Observatory", s: "Take the Fern Dell trail up and catch the city from the lawn.", cost: "Free", time: "2 hours" },
    { t: "Taco crawl one neighborhood", s: "Pick three stands within walking distance and order one taco at each.", cost: "Under $20", time: "90 min" }
  ],
  "Atlanta": [
    { t: "Walk a stretch of the BeltLine", s: "Start on the Eastside Trail and stop wherever the murals catch you.", cost: "Free", time: "1 to 2 hours" },
    { t: "Explore the Sweet Auburn neighborhood", s: "Walk the historic district and stop by the curb market for lunch.", cost: "Under $20", time: "2 hours" }
  ],
  "Houston": [
    { t: "Bike Buffalo Bayou Park", s: "Rent a bike and loop the trails with downtown in view.", cost: "Bike rental", time: "1 hour" },
    { t: "Eat along Bellaire Boulevard", s: "Pick one spot for pho and one for dessert in Chinatown.", cost: "$15 to $30", time: "2 hours" }
  ]
};

// Ideas that work in any city. {c} gets replaced with the person's city.
window.ANYCITY = [
  { t: "Find the oldest diner in {c}", s: "Search it, go, and ask your server what's changed since it opened.", cost: "Under $15", time: "1 hour" },
  { t: "Visit a {c} museum on its free day", s: "Most museums have a free or pay what you wish day. Look one up for this week.", cost: "Free", time: "2 hours" },
  { t: "Ride a bus line to the very end", s: "Pick a route you've never taken in {c} and explore wherever it drops you.", cost: "Bus fare", time: "2 hours" },
  { t: "Go to a farmers market in {c}", s: "Talk to one vendor about what's in season and cook it tonight.", cost: "$10 to $25", time: "1 hour" }
];

window.CITYLIST = ["New York City", "Chicago", "Los Angeles", "Atlanta", "Houston", "Philadelphia", "Washington, DC", "Boston", "Miami", "Other city"];

window.RESTAURANTS = {
  "New York City": [
    { name: "L'Artusi", location: "52 Irving Pl, New York, NY", reservation: "https://www.opentable.com/r/lartusi-new-york", rating: 4.8, cuisines: ["Italian", "Date Night"] },
    { name: "Katz's Delicatessen", location: "205 E Houston St, New York, NY", reservation: "", rating: 4.6, cuisines: ["Classic Deli", "Late Night"] },
    { name: "Via Carota", location: "51 Grove St, New York, NY", reservation: "https://www.opentable.com/r/via-carota-new-york", rating: 4.9, cuisines: ["Italian", "Neighborhood"] }
  ],
  Chicago: [
    { name: "Avec", location: "615 N Wabash Ave, Chicago, IL", reservation: "https://www.opentable.com/r/avec-chicago", rating: 4.7, cuisines: ["Mediterranean", "Cocktails"] },
    { name: "Lou Malnati's", location: "805 S State St, Chicago, IL", reservation: "", rating: 4.5, cuisines: ["Pizza", "Casual"] },
    { name: "Bari", location: "1139 W Fulton Market, Chicago, IL", reservation: "https://www.opentable.com/r/bari-chicago", rating: 4.8, cuisines: ["Italian", "Wine Bar"] }
  ],
  "Los Angeles": [
    { name: "Gjelina", location: "314 N. Highland Ave, Los Angeles, CA", reservation: "https://www.opentable.com/r/gjelina-los-angeles", rating: 4.8, cuisines: ["Californian", "Seasonal"] },
    { name: "Grand Central Market", location: "317 S Broadway, Los Angeles, CA", reservation: "", rating: 4.6, cuisines: ["Food Hall", "Street Food"] },
    { name: "Pasta e Basta", location: "1000 N. La Cienega Blvd, Los Angeles, CA", reservation: "https://www.opentable.com/r/pasta-e-basta-los-angeles", rating: 4.7, cuisines: ["Italian", "Cozy"] }
  ],
  Atlanta: [
    { name: "The Varsity", location: "61 North Ave NW, Atlanta, GA", reservation: "", rating: 4.4, cuisines: ["Classic Grill", "Local Favorite"] },
    { name: "Bacchanalia", location: "1198 Howell Mill Rd NW, Atlanta, GA", reservation: "https://www.opentable.com/r/bacchanalia-atlanta", rating: 4.9, cuisines: ["Contemporary", "Chef's Table"] },
    { name: "Sotto", location: "3131 Piedmont Rd NE, Atlanta, GA", reservation: "https://www.opentable.com/r/sotto-atlanta", rating: 4.8, cuisines: ["Italian", "Upscale"] }
  ],
  Houston: [
    { name: "Nami", location: "2310 W Alabama St, Houston, TX", reservation: "https://www.opentable.com/r/nami-houston", rating: 4.7, cuisines: ["Japanese", "Sushi"] },
    { name: "The Original Ninfa's on Navigation", location: "2704 Navigation Blvd, Houston, TX", reservation: "", rating: 4.5, cuisines: ["Tex-Mex", "Family Style"] },
    { name: "Pizaro's Pizza & Salad", location: "1150 N Loop W, Houston, TX", reservation: "", rating: 4.6, cuisines: ["Pizza", "Casual"] }
  ],
  "Philadelphia": [
    { name: "Vetri", location: "1312 Spruce St, Philadelphia, PA", reservation: "https://www.opentable.com/r/vetri-philadelphia", rating: 4.9, cuisines: ["Italian", "Fine Dining"] },
    { name: "Reading Terminal Market", location: "51 N 12th St, Philadelphia, PA", reservation: "", rating: 4.6, cuisines: ["Market", "Lunch"] },
    { name: "Jung Ho Lee", location: "1520 N 5th St, Philadelphia, PA", reservation: "https://resy.com/cities/us/philadelphia/jung-ho-lee", rating: 4.8, cuisines: ["Korean", "Chef's Counter"] }
  ],
  "Washington, DC": [
    { name: "The Dabney", location: "122 Blagden Alley NW, Washington, DC", reservation: "https://www.opentable.com/r/the-dabney-washington", rating: 4.7, cuisines: ["Seasonal", "Comfort"] },
    { name: "Ben's Chili Bowl", location: "1213 U St NW, Washington, DC", reservation: "", rating: 4.5, cuisines: ["Classic American", "Late Night"] },
    { name: "Pineapple and Pearls", location: "715 Florida Ave NW, Washington, DC", reservation: "https://www.opentable.com/r/pineapple-and-pearls-washington", rating: 4.9, cuisines: ["Modern", "Chef's Table"] }
  ],
  Boston: [
    { name: "Tatte Bakery & Cafe", location: "160 Newbury St, Boston, MA", reservation: "", rating: 4.5, cuisines: ["Bakery", "Brunch"] },
    { name: "Mamma Maria", location: "One Seaport Dr, Boston, MA", reservation: "https://www.opentable.com/r/mamma-maria-boston", rating: 4.8, cuisines: ["Italian", "Celebration"] },
    { name: "The Friendly Toast", location: "415 Stuart St, Boston, MA", reservation: "", rating: 4.4, cuisines: ["Breakfast", "Casual"] }
  ],
  Miami: [
    { name: "Luca Osteria", location: "1900 N Bay Rd, Miami Beach, FL", reservation: "https://www.opentable.com/r/luca-osteria-miami-beach", rating: 4.8, cuisines: ["Italian", "Beachside"] },
    { name: "Joe's Stone Crab", location: "11 Washington Ave, Miami Beach, FL", reservation: "https://www.opentable.com/r/joes-stone-crab-miami-beach", rating: 4.9, cuisines: ["Seafood", "Classic"] },
    { name: "Mignonette", location: "210 NE 18th St, Miami, FL", reservation: "https://www.opentable.com/r/mignonette-miami", rating: 4.7, cuisines: ["Seafood", "Modern"] }
  ],
  "Other city": [
    { name: "Local favorite cafe", location: "Downtown core", reservation: "", rating: 4.5, cuisines: ["Local Pick", "Coffee"] },
    { name: "Neighborhood bistro", location: "Main street district", reservation: "", rating: 4.6, cuisines: ["Bistro", "Casual"] },
    { name: "Market square spot", location: "City center", reservation: "", rating: 4.4, cuisines: ["Market", "Lunch"] }
  ]
};

window.ACTIVITY_PLACES = {
  city: [
    { name: "City museum", location: "Downtown arts district", rating: 4.7, tags: ["Culture", "Local"] },
    { name: "Local market", location: "Historic district", rating: 4.6, tags: ["Browse", "Food"] },
    { name: "Riverside walk", location: "Waterfront park", rating: 4.8, tags: ["Outdoors", "Scenic"] }
  ],
  solo: [
    { name: "Café & journal corner", location: "Neighborhood cafe", rating: 4.5, tags: ["Quiet", "Creative"] },
    { name: "Sunset lookout", location: "Scenic overlook", rating: 4.8, tags: ["Outdoors", "Reflective"] },
    { name: "Quiet library nook", location: "Downtown library", rating: 4.7, tags: ["Focus", "Study"] }
  ],
  people: [
    { name: "Community class", location: "Local community center", rating: 4.6, tags: ["Social", "Beginner"] },
    { name: "Open air social night", location: "City plaza", rating: 4.7, tags: ["Live", "Hangout"] },
    { name: "Volunteer meetup", location: "Community garden", rating: 4.8, tags: ["Service", "People"] }
  ]
};

function buildMapsUrl(query, type) {
  const encoded = encodeURIComponent(query);
  if (type === 'apple') {
    return `https://maps.apple.com/?q=${encoded}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encoded}`;
}

window.buildMapsUrl = buildMapsUrl;

// Which dots light up on the die for each number (grid spots 0 to 8)
window.PIPS = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
