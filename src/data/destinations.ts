import type { Destination } from "../types/destination";

export const destinations: Destination[] = [
  {
    id: "intramuros",
    name: "Intramuros",
    category: "heritage",
    tags: ["walled city", "spanish colonial", "unesco", "walking", "must visit"],
    coordinates: [14.5896, 120.9747],
    imageQuery: "Intramuros Manila Philippines",
    wikiTitle: "Intramuros",
    shortDescription:
      "Manila's historic walled city — churches, plazas, museums, and colonial stories in one walkable district.",
    summary:
      "Intramuros is Manila's historic walled city, a walkable heritage district filled with old churches, plazas, museums, ruins, and stories from the Spanish colonial period.",
    whyItMatters:
      "Intramuros helps visitors understand how Manila became a colonial capital and how Filipino identity was shaped by religion, trade, war, resistance, and reconstruction.",
    story:
      "Built by the Spanish in the late 16th century, Intramuros was the seat of government and political power when the Philippines was part of the Spanish Empire. War damaged much of the district, but surviving walls, gates, and churches still reveal how Manila became a crossroads of local, Asian, Spanish, and American histories.",
    culturalMeaning:
      "Often called the cultural heart of old Manila, Intramuros represents Filipino resilience — a place where faith, politics, and everyday life overlapped inside stone walls for centuries.",
    whatToDo: [
      "Walk from Fort Santiago to Plaza Roma and read the city like an open-air museum.",
      "Visit San Agustin Church, Casa Manila, and Baluarte de San Diego in one slow loop.",
      "Use the walls as a viewpoint to see how the Pasig River and Manila Bay shaped the city.",
    ],
    localTips: [
      "Best time: early morning or late afternoon (around 3–5 PM) to avoid heat and catch sunset.",
      "Getting around: rent a Bambike (bamboo bicycle) for an eco-friendly heritage loop.",
      "Bring water — the stone streets get hot at midday.",
    ],
    nearbyKnowledge: [
      "fort-santiago",
      "manila-cathedral",
      "san-agustin-church",
      "casa-manila",
    ],
    foodSpots: [
      "Barbara's Heritage Restaurant (heritage dining inside the walls)",
      "Small cafes near General Luna Street for tablea chocolate and merienda",
      "Carinderia-style stops near the gates for budget-friendly Filipino meals",
    ],
    guideScript:
      "Okay, tara. Intramuros is one of the best places to start if you want to understand old Manila. This was the walled city during the Spanish colonial period, where government offices, churches, schools, and military spaces were concentrated. Today, walking here feels like moving through layers of Philippine history — from colonial architecture to stories of war, faith, and resilience. Tip lang: go early morning or late afternoon, kasi mas enjoyable siya lakarin kapag hindi masyadong mainit.",
    routes: {
      quick: {
        title: "Intramuros quick loop",
        duration: "About 1 hour",
        walkingNote:
          "Stay inside the walls. Wear comfortable shoes — cobblestones are uneven.",
        stops: [
          {
            destinationId: "fort-santiago",
            label: "Fort Santiago",
            duration: "20 min",
            reason: "Start at the gate where Manila's defenses and Rizal's story meet.",
          },
          {
            destinationId: "manila-cathedral",
            label: "Plaza Roma & Manila Cathedral",
            duration: "20 min",
            reason: "See how faith and civic power shared the same plaza.",
          },
          {
            destinationId: "san-agustin-church",
            label: "San Agustin Church",
            duration: "20 min",
            reason: "End with one of the oldest stone churches still standing.",
          },
        ],
      },
      halfDay: {
        title: "Classic Intramuros half-day",
        duration: "3–4 hours",
        walkingNote:
          "Clockwise loop keeps the story clear: defense → power → faith → daily life.",
        stops: [
          {
            destinationId: "fort-santiago",
            label: "Fort Santiago",
            duration: "45 min",
            reason: "Military history and Rizal's final imprisonment.",
          },
          {
            destinationId: "manila-cathedral",
            label: "Manila Cathedral & Plaza Roma",
            duration: "30 min",
            reason: "The religious and civic center of the walled city.",
          },
          {
            destinationId: "san-agustin-church",
            label: "San Agustin Church",
            duration: "40 min",
            reason: "UNESCO-listed Baroque church and museum.",
          },
          {
            destinationId: "casa-manila",
            label: "Casa Manila",
            duration: "45 min",
            reason: "Colonial domestic life inside a recreated bahay na bato.",
          },
        ],
      },
      fullDay: {
        title: "Manila heritage full day",
        duration: "6–8 hours",
        walkingNote:
          "Take a lunch break outside the walls. Museums close earlier on some weekdays — check hours.",
        stops: [
          {
            destinationId: "intramuros",
            label: "Intramuros core loop",
            duration: "3 hrs",
            reason: "Morning inside the walls while it's cooler.",
          },
          {
            destinationId: "rizal-park",
            label: "Rizal Park",
            duration: "1 hr",
            reason: "Bridge from colonial walls to national public memory.",
          },
          {
            destinationId: "national-museum-fine-arts",
            label: "National Museum of Fine Arts",
            duration: "2 hrs",
            reason: "Afternoon indoors with Philippine art and identity.",
          },
        ],
      },
    },
    captions: {
      tourist:
        "Inside the walls of Intramuros, Manila turns into a living history walk. Come for the stone gates and churches, stay for the stories that explain why this city still matters. #AnoTara #Intramuros #ManilaHeritage #VisitPhilippines",
      localTourism:
        "Discover Intramuros — where every gate, plaza, and church tells a chapter of Manila's story. Plan your heritage walk with AnoTara? and explore the Walled City like a local. #LoveThePhilippines #Intramuros",
      social:
        "Walled city vibes in Manila. Intramuros = history you can actually walk through. Tara? #AnoTara #Intramuros",
    },
    recommendedTime: "3–4 hours",
    entranceFee: "Free (individual sites vary)",
    locationLabel: "Manila, Metro Manila",
    badges: ["Historical Landmark", "Must Visit"],
    walkingRoute: true,
    initials: "IN",
  },
  {
    id: "fort-santiago",
    name: "Fort Santiago",
    category: "heritage",
    tags: ["rizal", "citadel", "intramuros", "national hero"],
    coordinates: [14.5941, 120.9708],
    imageQuery: "Fort Santiago Intramuros Manila",
    wikiTitle: "Fort Santiago",
    shortDescription:
      "Historic citadel at the Pasig River mouth, tied to Jose Rizal and Manila's colonial defenses.",
    summary:
      "Fort Santiago is a defensive fortress at the mouth of the Pasig River and one of Intramuros' most important landmarks, closely associated with Jose Rizal's final imprisonment before his execution in 1896.",
    whyItMatters:
      "It gives visitors a dramatic entry point into Manila's colonial defenses and the national memory connected to Rizal.",
    story:
      "The fort guarded river and bay access to old Manila. Its stone gate, chambers, and grounds carry both military history and the quieter, heavier story of prisoners held there across different periods.",
    culturalMeaning:
      "Fort Santiago is where military architecture meets national remembrance — a place Filipinos associate with resistance, sacrifice, and the birth of modern nationhood.",
    whatToDo: [
      "Trace the route from the gate toward the Rizal Shrine.",
      "Look across the Pasig River and imagine why this location mattered militarily.",
      "Pair it with Plaza Roma to understand defense and civic power together.",
    ],
    localTips: [
      "Visit before noon if you want cooler weather and fewer crowds.",
      "Combine with Rizal Park later for a full Rizal narrative.",
      "Small entrance fee applies — bring cash.",
    ],
    nearbyKnowledge: ["intramuros", "manila-cathedral", "rizal-park"],
    foodSpots: [
      "Light merienda near Intramuros gates before a longer walk",
      "Cold drinks from vendors near the fort entrance",
    ],
    guideScript:
      "Start with the gate, then slow down. Fort Santiago is where Manila shifts from postcard to history. The view is pretty, yes, pero the deeper point is that this was a place of control, resistance, and remembrance. Dito mo makikita kung bakit sobrang importante si Rizal sa atin — hindi lang textbook story, kundi totoong lugar.",
    routes: {
      quick: {
        title: "Fort & cathedral sprint",
        duration: "About 1 hour",
        walkingNote: "Short walk between Fort Santiago and Plaza Roma.",
        stops: [
          {
            destinationId: "fort-santiago",
            label: "Fort Santiago",
            duration: "35 min",
            reason: "Gate, grounds, and Rizal Shrine.",
          },
          {
            destinationId: "manila-cathedral",
            label: "Manila Cathedral",
            duration: "25 min",
            reason: "Contrast military defense with religious center.",
          },
        ],
      },
      halfDay: {
        title: "Intramuros north loop",
        duration: "3 hours",
        walkingNote: "Start north and work south through the walled city.",
        stops: [
          {
            destinationId: "fort-santiago",
            label: "Fort Santiago",
            duration: "50 min",
            reason: "Begin with defense and Rizal's story.",
          },
          {
            destinationId: "manila-cathedral",
            label: "Manila Cathedral",
            duration: "40 min",
            reason: "Plaza Roma as the civic-religious heart.",
          },
          {
            destinationId: "san-agustin-church",
            label: "San Agustin Church",
            duration: "50 min",
            reason: "End with faith and survival in stone.",
          },
        ],
      },
      fullDay: {
        title: "Walls to Luneta",
        duration: "6 hours",
        walkingNote: "Exit Intramuros toward Rizal Park after lunch.",
        stops: [
          {
            destinationId: "fort-santiago",
            label: "Fort Santiago",
            duration: "1 hr",
            reason: "Morning start at the river gate.",
          },
          {
            destinationId: "intramuros",
            label: "Intramuros churches & museums",
            duration: "3 hrs",
            reason: "Continue the walled-city story.",
          },
          {
            destinationId: "rizal-park",
            label: "Rizal Park",
            duration: "1.5 hrs",
            reason: "Connect imprisonment to national monument.",
          },
        ],
      },
    },
    captions: {
      tourist:
        "Fort Santiago is where Manila's walls meet national memory. Walk the old gate, pause by the river, and feel how history still sits inside Intramuros. #AnoTara #FortSantiago #Rizal",
      localTourism:
        "Walk through Fort Santiago and discover the citadel that guarded old Manila — and the prison that held our national hero. A must for heritage travelers. #FortSantiago #Manila",
      social:
        "Stone gates + Rizal's story = chills. Fort Santiago hits different. #AnoTara",
    },
    recommendedTime: "45–60 minutes",
    entranceFee: "Paid (museum rates apply)",
    locationLabel: "Intramuros, Manila",
    walkingRoute: true,
    initials: "FS",
  },
  {
    id: "rizal-park",
    name: "Rizal Park",
    category: "parks",
    tags: ["luneta", "rizal monument", "public space", "national park"],
    coordinates: [14.5826, 120.9787],
    imageQuery: "Rizal Park Manila monument",
    wikiTitle: "Rizal Park",
    shortDescription:
      "Manila's grand civic park and home of the Rizal Monument — where national memory meets everyday city life.",
    summary:
      "Rizal Park, also known as Luneta, is a major public park in Manila and the site of the Rizal Monument, one of the most recognizable symbols of Philippine nationhood.",
    whyItMatters:
      "It connects Intramuros to the broader national story of Jose Rizal, public memory, and civic gathering.",
    story:
      "The park's monument and open grounds make it a place where national history is staged in public space. It is both a leisure park and a symbolic landscape where rallies, celebrations, and quiet walks coexist.",
    culturalMeaning:
      "Luneta is where Filipinos meet history without entering a museum — a democratic space for memory, protest, recreation, and reflection.",
    whatToDo: [
      "Visit after Fort Santiago to connect Rizal's imprisonment with national commemoration.",
      "Walk the open grounds near late afternoon for golden light.",
      "Use it as a bridge toward the National Museum complex.",
    ],
    localTips: [
      "Late afternoon is best for photos and cooler air.",
      "Keep valuables secure in crowded areas.",
      "Street snacks are part of the experience — try isaw or mais if you're adventurous.",
    ],
    nearbyKnowledge: [
      "fort-santiago",
      "national-museum-fine-arts",
      "national-museum-natural-history",
      "intramuros",
    ],
    foodSpots: [
      "Street food vendors along Roxas Boulevard side",
      "Jollibee and cafes along Kalaw for a proper meal break",
      "Ice cream carts — classic Luneta merienda",
    ],
    guideScript:
      "Rizal Park works best after Intramuros. You move from walls and prisons to an open civic space where memory becomes public. Worth puntahan ito kasi dito mo mararamdaman na hindi lang tourist spot ang Manila — living city pa rin siya. Tip lang: sunset dito is chef's kiss.",
    routes: {
      quick: {
        title: "Luneta quick visit",
        duration: "About 1 hour",
        walkingNote: "Flat, open paths — good for all ages.",
        stops: [
          {
            destinationId: "rizal-park",
            label: "Rizal Monument",
            duration: "30 min",
            reason: "The symbolic center of the park.",
          },
          {
            destinationId: "national-museum-fine-arts",
            label: "National Museum area",
            duration: "30 min",
            reason: "Walk past the museum buildings toward Ermita.",
          },
        ],
      },
      halfDay: {
        title: "Luneta & museums",
        duration: "4 hours",
        walkingNote: "Museums are free but can be busy on weekends.",
        stops: [
          {
            destinationId: "rizal-park",
            label: "Rizal Park",
            duration: "1 hr",
            reason: "Open-air history before going indoors.",
          },
          {
            destinationId: "national-museum-fine-arts",
            label: "National Museum of Fine Arts",
            duration: "1.5 hrs",
            reason: "Philippine art in the old Legislative Building.",
          },
          {
            destinationId: "national-museum-natural-history",
            label: "National Museum of Natural History",
            duration: "1.5 hrs",
            reason: "The tree-of-life atrium and biodiversity galleries.",
          },
        ],
      },
      fullDay: {
        title: "South Manila culture day",
        duration: "7 hours",
        walkingNote: "Start early at Intramuros, end at museums.",
        stops: [
          {
            destinationId: "intramuros",
            label: "Intramuros morning",
            duration: "3 hrs",
            reason: "Heritage walk inside the walls.",
          },
          {
            destinationId: "rizal-park",
            label: "Rizal Park",
            duration: "1 hr",
            reason: "Midday break and monument visit.",
          },
          {
            destinationId: "national-museum-fine-arts",
            label: "Museum afternoon",
            duration: "2 hrs",
            reason: "Cool indoor galleries.",
          },
        ],
      },
    },
    captions: {
      tourist:
        "Rizal Park is where Manila opens up: history, public space, and national memory in one walkable stop. Perfect after Intramuros. #AnoTara #RizalPark #Luneta",
      localTourism:
        "Experience Luneta — Manila's front yard. From the Rizal Monument to museum row, discover why this park anchors the capital's story. #RizalPark",
      social:
        "Luneta at golden hour hits different. National hero vibes. #AnoTara #RizalPark",
    },
    recommendedTime: "1–2 hours",
    entranceFee: "Free",
    locationLabel: "Ermita, Manila",
    walkingRoute: true,
    initials: "RP",
  },
  {
    id: "national-museum-fine-arts",
    name: "National Museum of Fine Arts",
    category: "museums",
    tags: ["art", "spoliarium", "luna", "national museum", "ermita"],
    coordinates: [14.5868, 120.9812],
    imageQuery: "National Museum of Fine Arts Manila",
    wikiTitle: "National Museum of Fine Arts (Manila)",
    shortDescription:
      "Philippine art and national masterpieces inside the historic Legislative Building near Rizal Park.",
    summary:
      "The National Museum of Fine Arts houses major works of Philippine art, including Juan Luna's Spoliarium, inside the neoclassical Old Legislative Building along Padre Burgos Avenue.",
    whyItMatters:
      "It expands the heritage route from city history to national art, identity, and the stories Filipinos choose to celebrate on canvas.",
    story:
      "The building itself is a landmark — once the seat of the Philippine Legislature, now a temple to Filipino creativity from the Spanish era through contemporary movements.",
    culturalMeaning:
      "Seeing the Spoliarium in person is a rite of passage for many Filipinos; for visitors, it explains how art became a language of nationhood.",
    whatToDo: [
      "Find the Spoliarium first, then explore the galleries floor by floor.",
      "Look for works by Luna, Hidalgo, and contemporary Filipino artists.",
      "Pair with the Natural History museum across the park for a full museum day.",
    ],
    localTips: [
      "Free admission — bring a valid ID.",
      "No flash photography in some galleries; check signs.",
      "Weekday mornings are least crowded.",
    ],
    nearbyKnowledge: [
      "rizal-park",
      "national-museum-natural-history",
      "intramuros",
    ],
    foodSpots: [
      "Cafe inside the museum grounds when open",
      "Kalaw Street eateries for Filipino lunch",
      "Robinsons Place Manila food court nearby",
    ],
    guideScript:
      "Pagod ka na sa init? Pasok dito. The Fine Arts museum is where you see how Filipinos told their own story through paint and sculpture. Huwag mo laktawan ang Spoliarium — worth it talaga makita in person, iba ang feeling kaysa sa textbook.",
    routes: {
      quick: {
        title: "Spoliarium express",
        duration: "About 1 hour",
        walkingNote: "Focus on the highlight galleries on the main floor.",
        stops: [
          {
            destinationId: "national-museum-fine-arts",
            label: "Spoliarium & main galleries",
            duration: "60 min",
            reason: "See the masterpiece and key national works.",
          },
        ],
      },
      halfDay: {
        title: "Twin museums",
        duration: "4 hours",
        walkingNote: "Short walk between Fine Arts and Natural History buildings.",
        stops: [
          {
            destinationId: "national-museum-fine-arts",
            label: "Fine Arts",
            duration: "2 hrs",
            reason: "Art and nationhood.",
          },
          {
            destinationId: "national-museum-natural-history",
            label: "Natural History",
            duration: "2 hrs",
            reason: "Biodiversity and the famous tree-of-life dome.",
          },
        ],
      },
      fullDay: {
        title: "Museum row day",
        duration: "6 hours",
        walkingNote: "Add Rizal Park breaks between buildings.",
        stops: [
          {
            destinationId: "rizal-park",
            label: "Rizal Park",
            duration: "1 hr",
            reason: "Morning monument visit.",
          },
          {
            destinationId: "national-museum-fine-arts",
            label: "Fine Arts",
            duration: "2.5 hrs",
            reason: "Art galleries.",
          },
          {
            destinationId: "national-museum-natural-history",
            label: "Natural History",
            duration: "2.5 hrs",
            reason: "Science and nature galleries.",
          },
        ],
      },
    },
    captions: {
      tourist:
        "Stand before the Spoliarium at the National Museum of Fine Arts — Philippine art history in one breathtaking room. Free entry, world-class collection. #AnoTara #NationalMuseum",
      localTourism:
        "The National Museum of Fine Arts showcases the soul of the Philippines through art. From Luna to contemporary masters, plan your visit with AnoTara? #LoveThePhilippines",
      social:
        "Spoliarium in real life >>> photos. National Museum is free. Tara na. #AnoTara",
    },
    recommendedTime: "2–3 hours",
    entranceFee: "Free (ID required)",
    locationLabel: "Ermita, Manila",
    initials: "FA",
  },
  {
    id: "national-museum-natural-history",
    name: "National Museum of Natural History",
    category: "museums",
    tags: ["biodiversity", "tree of life", "national museum", "family friendly"],
    coordinates: [14.5833, 120.9822],
    imageQuery: "National Museum of Natural History Manila",
    wikiTitle: "National Museum of Natural History (Manila)",
    shortDescription:
      "Stunning atrium and galleries on Philippine flora, fauna, and geology — great after a hot heritage walk.",
    summary:
      "The National Museum of Natural History occupies the former Department of Tourism building and features a dramatic tree-of-life atrium, plus galleries on Philippine biodiversity and ecosystems.",
    whyItMatters:
      "It balances history-heavy itineraries with science and nature, showing the archipelago's ecological richness beyond colonial architecture.",
    story:
      "Opened to the public in 2018, the museum transformed a heritage government building into an accessible showcase of Lolong the crocodile, marine life, forests, and geology.",
    culturalMeaning:
      "Filipinos share these islands with extraordinary biodiversity; this museum makes that identity tangible for families and first-time visitors.",
    whatToDo: [
      "Start at the tree-of-life atrium and work upward through the galleries.",
      "See the Lolong replica and marine biodiversity exhibits.",
      "Combine with Fine Arts for a full National Museum complex day.",
    ],
    localTips: [
      "Free admission with valid ID.",
      "Great rainy-day or midday-heat escape.",
      "Elevators can be slow on weekends — plan extra time.",
    ],
    nearbyKnowledge: [
      "national-museum-fine-arts",
      "rizal-park",
      "intramuros",
    ],
    foodSpots: [
      "Museum cafe when available",
      "Padre Burgos and Kalaw Street restaurants",
    ],
    guideScript:
      "If may kasama kang bata, or gusto mo ng aircon break, dito tayo. The tree-of-life lobby alone is worth the visit — parang nasa forest ka pero may elevator. Tip lang: weekdays mas chill, weekend medyo pila sa elevator.",
    routes: {
      quick: {
        title: "Atrium & highlights",
        duration: "About 1 hour",
        walkingNote: "Hit the atrium and top-floor highlights if short on time.",
        stops: [
          {
            destinationId: "national-museum-natural-history",
            label: "Tree of life & key galleries",
            duration: "60 min",
            reason: "Best of the museum in one pass.",
          },
        ],
      },
      halfDay: {
        title: "Both National Museums",
        duration: "4 hours",
        walkingNote: "Walk between buildings via Rizal Park paths.",
        stops: [
          {
            destinationId: "national-museum-natural-history",
            label: "Natural History",
            duration: "2 hrs",
            reason: "Nature and science galleries.",
          },
          {
            destinationId: "national-museum-fine-arts",
            label: "Fine Arts",
            duration: "2 hrs",
            reason: "Art and Spoliarium.",
          },
        ],
      },
      fullDay: {
        title: "Ermita museum & park",
        duration: "6 hours",
        walkingNote: "Lunch along Kalaw between stops.",
        stops: [
          {
            destinationId: "rizal-park",
            label: "Rizal Park",
            duration: "1 hr",
            reason: "Morning outdoors.",
          },
          {
            destinationId: "national-museum-natural-history",
            label: "Natural History",
            duration: "2.5 hrs",
            reason: "Midday indoors.",
          },
          {
            destinationId: "national-museum-fine-arts",
            label: "Fine Arts",
            duration: "2.5 hrs",
            reason: "Afternoon art.",
          },
        ],
      },
    },
    captions: {
      tourist:
        "The National Museum of Natural History is Manila's most photogenic museum — tree-of-life atrium, Philippine wildlife, and free admission. #AnoTara #NationalMuseum",
      localTourism:
        "Explore Philippine biodiversity at the National Museum of Natural History. Perfect for families after a heritage walk in Intramuros. #VisitManila",
      social:
        "That atrium though. Natural History Museum = free + stunning. #AnoTara",
    },
    recommendedTime: "2–3 hours",
    entranceFee: "Free (ID required)",
    locationLabel: "Ermita, Manila",
    initials: "NH",
  },
  {
    id: "binondo",
    name: "Binondo",
    category: "food",
    tags: ["chinatown", "food crawl", "lumpia", "heritage", "shopping"],
    coordinates: [14.5995, 120.9742],
    imageQuery: "Binondo Chinatown Manila",
    wikiTitle: "Binondo",
    shortDescription:
      "The world's oldest Chinatown — narrow streets, heritage temples, and some of Manila's best food.",
    summary:
      "Binondo is Manila's historic Chinatown district, founded in 1594, where Chinese-Filipino trade, temples, and legendary eateries define one of the city's most flavorful walks.",
    whyItMatters:
      "Binondo shows how trade and migration shaped Manila as much as Spanish colonial rule — a living food and commerce culture, not a museum piece.",
    story:
      "For centuries, Binondo was the center of Chinese commerce in the Philippines. Today, Ongpin Street and side alleys still buzz with gold shops, bakeries, and restaurants passed down through generations.",
    culturalMeaning:
      "Binondo is where Filipino and Chinese heritage blend in daily life — in language, religion, business, and especially food.",
    whatToDo: [
      "Do a morning food crawl: dumplings, lumpia, hopia, and fresh soy milk.",
      "Visit Binondo Church (Minor Basilica of San Lorenzo Ruiz).",
      "Walk Ongpin from Carvajal market to Escolta's edge.",
    ],
    localTips: [
      "Go hungry and go early — popular spots sell out.",
      "Cash is king in many eateries.",
      "Wear comfortable shoes; streets are busy and uneven.",
    ],
    nearbyKnowledge: ["escolta", "quiapo-church", "intramuros"],
    foodSpots: [
      "Dong Bei Dumplings — pan-fried kuchay dumplings",
      "New Po-Eng Lumpia House — fresh spring rolls",
      "Eng Bee Tin — hopia and ube pastries",
      "Cafe Mezzanine / 168 Cafe — charity-supported meals above a fire station",
    ],
    guideScript:
      "Okay, tara sa Binondo — pero magdala ka ng empty stomach. This is not a 'look and leave' place; this is eat-walk-eat-walk territory. Worth puntahan kasi dito mo talaga mararamdaman na international ang history ng Manila, pero sobrang Pinoy pa rin ang lasa.",
    routes: {
      quick: {
        title: "Binondo food sprint",
        duration: "About 1 hour",
        walkingNote: "Stay on Ongpin and one side street — don't over-plan.",
        stops: [
          {
            destinationId: "binondo",
            label: "Ongpin food stops",
            duration: "45 min",
            reason: "Dumplings, hopia, and quick bites.",
          },
          {
            destinationId: "escolta",
            label: "Escolta edge",
            duration: "15 min",
            reason: "Peek at heritage street architecture.",
          },
        ],
      },
      halfDay: {
        title: "Chinatown & Escolta",
        duration: "4 hours",
        walkingNote: "Eat first, then walk off the calories toward Escolta.",
        stops: [
          {
            destinationId: "binondo",
            label: "Binondo food crawl",
            duration: "2 hrs",
            reason: "Temple, market, and legendary eateries.",
          },
          {
            destinationId: "escolta",
            label: "Escolta Street",
            duration: "1.5 hrs",
            reason: "Art deco and pre-war Manila facades.",
          },
        ],
      },
      fullDay: {
        title: "Old Manila trade route",
        duration: "7 hours",
        walkingNote: "Jeepney or grab between distant stops if tired.",
        stops: [
          {
            destinationId: "intramuros",
            label: "Intramuros morning",
            duration: "3 hrs",
            reason: "Spanish colonial center.",
          },
          {
            destinationId: "binondo",
            label: "Binondo lunch crawl",
            duration: "2 hrs",
            reason: "Chinatown flavors.",
          },
          {
            destinationId: "quiapo-church",
            label: "Quiapo afternoon",
            duration: "1.5 hrs",
            reason: "Faith and market energy.",
          },
        ],
      },
    },
    captions: {
      tourist:
        "Binondo is Manila's oldest Chinatown — come for the history, stay for the dumplings. A food crawl here is a masterclass in Filipino-Chinese culture. #AnoTara #Binondo #ManilaFood",
      localTourism:
        "Taste your way through Binondo, the world's oldest Chinatown. From Ongpin to hidden alley eats, discover Manila's flavorful heritage. #Binondo #FoodTrip",
      social:
        "Binondo food crawl = no regrets. Dumplings > everything. #AnoTara #Binondo",
    },
    recommendedTime: "2–4 hours",
    entranceFee: "Free (food costs vary)",
    locationLabel: "Binondo, Manila",
    walkingRoute: true,
    initials: "BN",
  },
  {
    id: "escolta",
    name: "Escolta Street",
    category: "hidden-gems",
    tags: ["art deco", "pre-war", "heritage street", "first avenue"],
    coordinates: [14.5978, 120.9789],
    imageQuery: "Escolta Street Manila heritage",
    wikiTitle: "Escolta Street",
    shortDescription:
      "Manila's former 'Wall Street' — art deco facades, hidden courtyards, and pre-war glamour waiting to be rediscovered.",
    summary:
      "Escolta Street was once Manila's premier commercial avenue, lined with art deco buildings, banks, and department stores. Today it is a heritage corridor popular with urban explorers and creative revivals.",
    whyItMatters:
      "Escolta proves Manila's golden age wasn't only inside Intramuros — the early 20th-century city built a modern commercial identity here.",
    story:
      "From the late 1800s through the American colonial period, Escolta hosted the city's first elevator buildings, cinemas, and luxury shops. War and mid-century decline changed its fortunes, but facades like the Calvo and Regina Buildings remain.",
    culturalMeaning:
      "Escolta is a favorite of heritage advocates and weekend markets — a symbol of what old Manila could become again through careful revival.",
    whatToDo: [
      "Walk the street and look up at art deco details on Calvo and Regina Buildings.",
      "Check for weekend fairs or exhibits at the First United Building.",
      "Connect to Jones Bridge and Binondo for a longer old-Manila loop.",
    ],
    localTips: [
      "Best on weekends when pop-up markets sometimes activate the street.",
      "Go with a friend — some side alleys are quiet.",
      "Combine with Binondo for lunch after the walk.",
    ],
    nearbyKnowledge: ["binondo", "intramuros", "quiapo-church"],
    foodSpots: [
      "Tiong Pinoy or nearby Binondo eateries after the walk",
      "Coffee pop-ups during Escolta weekend events",
    ],
    guideScript:
      "Escolta is for people who like looking up. Dito mo makikita ang old Manila na parang movie set — art deco, weathered paint, pero may dating pa rin. Tip lang: weekend punta ka kung may fair, mas buhay ang kalye.",
    routes: {
      quick: {
        title: "Escolta facade walk",
        duration: "About 1 hour",
        walkingNote: "One straight street — easy navigation.",
        stops: [
          {
            destinationId: "escolta",
            label: "Escolta facades",
            duration: "60 min",
            reason: "Art deco and pre-war commercial architecture.",
          },
        ],
      },
      halfDay: {
        title: "Escolta & Binondo",
        duration: "4 hours",
        walkingNote: "Walk or short jeepney between Escolta and Ongpin.",
        stops: [
          {
            destinationId: "escolta",
            label: "Escolta heritage walk",
            duration: "1.5 hrs",
            reason: "Architecture and street history.",
          },
          {
            destinationId: "binondo",
            label: "Binondo food",
            duration: "2 hrs",
            reason: "Reward yourself with a Chinatown crawl.",
          },
        ],
      },
      fullDay: {
        title: "Commerce & culture",
        duration: "7 hours",
        walkingNote: "North-to-south old Manila arc.",
        stops: [
          {
            destinationId: "binondo",
            label: "Binondo morning",
            duration: "2.5 hrs",
            reason: "Food and temple.",
          },
          {
            destinationId: "escolta",
            label: "Escolta midday",
            duration: "1.5 hrs",
            reason: "Architecture walk.",
          },
          {
            destinationId: "intramuros",
            label: "Intramuros afternoon",
            duration: "3 hrs",
            reason: "Colonial counterpoint.",
          },
        ],
      },
    },
    captions: {
      tourist:
        "Walk Escolta Street and discover Manila's art deco past — the avenue that was once the city's grandest shopping strip. #AnoTara #Escolta #HeritageManila",
      localTourism:
        "Rediscover Escolta — pre-war facades, creative revivals, and the stories of old Manila's commercial heart. #EscoltaStreet #ManilaHeritage",
      social:
        "Escolta = art deco heaven. Look up, thank me later. #AnoTara #Escolta",
    },
    recommendedTime: "1–2 hours",
    entranceFee: "Free",
    locationLabel: "Binondo / Santa Cruz, Manila",
    walkingRoute: true,
    initials: "ES",
  },
  {
    id: "manila-cathedral",
    name: "Manila Cathedral",
    category: "churches",
    tags: ["basilica", "plaza roma", "intramuros", "catholic"],
    coordinates: [14.5913, 120.9736],
    imageQuery: "Manila Cathedral facade Intramuros",
    wikiTitle: "Manila Cathedral",
    shortDescription:
      "The cathedral of the Archdiocese of Manila, facing Plaza Roma at the heart of Intramuros.",
    summary:
      "The Manila Cathedral is the cathedral of the Archdiocese of Manila and a major landmark facing Plaza Roma in Intramuros, rebuilt multiple times after earthquakes and war.",
    whyItMatters:
      "It anchors the civic and religious center of Intramuros, making the surrounding plaza feel like an open-air diagram of colonial power.",
    story:
      "The cathedral has been rebuilt multiple times after disasters and war. Its present form represents continuity as much as architecture: Manila keeps rebuilding its spiritual center.",
    culturalMeaning:
      "For many Filipinos, the cathedral is both a place of worship and a symbol of faith surviving destruction — a recurring theme in Manila's history.",
    whatToDo: [
      "Stand in Plaza Roma and view the cathedral with Palacio del Gobernador ruins nearby.",
      "Step inside quietly when open to visitors.",
      "Use this as the midpoint between Fort Santiago and San Agustin.",
    ],
    localTips: [
      "Dress modestly if entering for prayer or tours.",
      "Good pause point before a longer lunch outside the walls.",
      "Check for special masses — access may be limited.",
    ],
    nearbyKnowledge: [
      "fort-santiago",
      "san-agustin-church",
      "intramuros",
      "casa-manila",
    ],
    foodSpots: [
      "Cafes inside Intramuros walls for merienda",
      "Restaurants along General Luna Street",
    ],
    guideScript:
      "Dito mo makikita ang old Manila power map. The cathedral is not alone — it faces the plaza, government buildings, and the streets that organized the walled city. Worth puntahan kasi one photo dito captures faith + politics + history in one frame.",
    routes: {
      quick: {
        title: "Plaza Roma pause",
        duration: "About 1 hour",
        walkingNote: "Flat plaza — easy stop between fort and churches.",
        stops: [
          {
            destinationId: "manila-cathedral",
            label: "Manila Cathedral",
            duration: "30 min",
            reason: "Exterior and interior visit.",
          },
          {
            destinationId: "fort-santiago",
            label: "Fort Santiago",
            duration: "30 min",
            reason: "Short walk to the river gate.",
          },
        ],
      },
      halfDay: {
        title: "Faith in the walled city",
        duration: "3 hours",
        walkingNote: "South Intramuros church loop.",
        stops: [
          {
            destinationId: "manila-cathedral",
            label: "Manila Cathedral",
            duration: "40 min",
            reason: "Plaza Roma center.",
          },
          {
            destinationId: "san-agustin-church",
            label: "San Agustin Church",
            duration: "50 min",
            reason: "UNESCO Baroque church.",
          },
          {
            destinationId: "casa-manila",
            label: "Casa Manila",
            duration: "50 min",
            reason: "Domestic colonial life.",
          },
        ],
      },
      fullDay: {
        title: "Intramuros complete",
        duration: "6 hours",
        walkingNote: "See intramuros full-day route.",
        stops: [
          {
            destinationId: "fort-santiago",
            label: "Fort Santiago",
            duration: "1 hr",
            reason: "Start north.",
          },
          {
            destinationId: "manila-cathedral",
            label: "Manila Cathedral",
            duration: "45 min",
            reason: "Civic-religious heart.",
          },
          {
            destinationId: "san-agustin-church",
            label: "San Agustin",
            duration: "1 hr",
            reason: "Faith and museum.",
          },
        ],
      },
    },
    captions: {
      tourist:
        "At Manila Cathedral, Intramuros opens into a plaza of faith, power, and rebuilding. A must-stop for anyone learning Manila through its landmarks. #AnoTara #ManilaCathedral",
      localTourism:
        "Visit the Manila Cathedral in Plaza Roma — the spiritual anchor of the Walled City and a landmark of Filipino faith. #Intramuros",
      social:
        "Plaza Roma + Manila Cathedral = old Manila in one shot. #AnoTara",
    },
    recommendedTime: "30–45 minutes",
    entranceFee: "Free (donations welcome)",
    locationLabel: "Plaza Roma, Intramuros",
    initials: "MC",
  },
  {
    id: "san-agustin-church",
    name: "San Agustin Church",
    category: "churches",
    tags: ["unesco", "baroque", "intramuros", "museum"],
    coordinates: [14.5881, 120.9742],
    imageQuery: "San Agustin Church Manila UNESCO",
    wikiTitle: "San Agustin Church (Manila)",
    shortDescription:
      "UNESCO-listed Baroque church and museum — one of the oldest stone churches in the Philippines.",
    summary:
      "San Agustin Church is a stone church in Intramuros and part of the UNESCO World Heritage listing for Baroque Churches of the Philippines.",
    whyItMatters:
      "It is one of Manila's most important surviving religious structures and a compact way to understand faith, craft, and colonial urban life.",
    story:
      "The church survived fires, earthquakes, and war better than much of old Manila. Its architecture, interiors, and adjoining museum show how religion, art, and power shaped the walled city.",
    culturalMeaning:
      "San Agustin is a quiet survivor — where visitors often feel the weight of centuries in carved wood, painted ceilings, and cloister gardens.",
    whatToDo: [
      "Look closely at the ceiling and interior details before moving on.",
      "Visit the museum for deeper object-based stories.",
      "Walk outside to compare the church with nearby Casa Manila.",
    ],
    localTips: [
      "Museum has a separate fee — bring cash.",
      "Lower your voice inside — active parish and tourist site.",
      "Plan before merienda so you can cool down afterward.",
    ],
    nearbyKnowledge: ["casa-manila", "intramuros", "manila-cathedral"],
    foodSpots: [
      "Nearby Intramuros cafes for tablea chocolate",
      "General Luna restaurants for full meals",
    ],
    guideScript:
      "This is the stop where you lower your voice a bit. San Agustin is not only beautiful; it is one of the rare places where old Manila did not completely disappear. Look up, then look around, and you will see survival in stone. Tip lang: museum + church together para sulit.",
    routes: {
      quick: {
        title: "San Agustin & Casa Manila",
        duration: "About 1 hour",
        walkingNote: "Adjacent sites — minimal walking.",
        stops: [
          {
            destinationId: "san-agustin-church",
            label: "San Agustin Church",
            duration: "35 min",
            reason: "Interior and cloister.",
          },
          {
            destinationId: "casa-manila",
            label: "Casa Manila",
            duration: "25 min",
            reason: "Colonial home next door.",
          },
        ],
      },
      halfDay: {
        title: "South Intramuros loop",
        duration: "3 hours",
        walkingNote: "Church, home, and garden bastion.",
        stops: [
          {
            destinationId: "san-agustin-church",
            label: "San Agustin",
            duration: "50 min",
            reason: "UNESCO church and museum.",
          },
          {
            destinationId: "casa-manila",
            label: "Casa Manila",
            duration: "45 min",
            reason: "Domestic heritage.",
          },
          {
            destinationId: "intramuros",
            label: "Wall walk",
            duration: "45 min",
            reason: "Connect to broader walled city.",
          },
        ],
      },
      fullDay: {
        title: "Intramuros heritage day",
        duration: "6 hours",
        walkingNote: "See intramuros full-day route.",
        stops: [
          {
            destinationId: "fort-santiago",
            label: "Fort Santiago",
            duration: "1 hr",
            reason: "Morning start.",
          },
          {
            destinationId: "san-agustin-church",
            label: "San Agustin",
            duration: "1 hr",
            reason: "Midday faith stop.",
          },
          {
            destinationId: "rizal-park",
            label: "Rizal Park",
            duration: "1.5 hrs",
            reason: "Afternoon open space.",
          },
        ],
      },
    },
    captions: {
      tourist:
        "San Agustin Church is a quiet survivor inside Intramuros: stone, art, faith, and Manila history in one stop. UNESCO heritage you can actually walk into. #AnoTara #SanAgustin",
      localTourism:
        "Experience San Agustin Church — a UNESCO Baroque treasure and museum that reveals the spiritual art of colonial Manila. #SanAgustinChurch",
      social:
        "Ceiling details at San Agustin = jaw drop. UNESCO worth it. #AnoTara",
    },
    recommendedTime: "45–60 minutes",
    entranceFee: "Church free; museum paid",
    locationLabel: "Intramuros, Manila",
    initials: "SA",
  },
  {
    id: "casa-manila",
    name: "Casa Manila",
    category: "museums",
    tags: ["colonial house", "bahay na bato", "intramuros", "museum"],
    coordinates: [14.5889, 120.9754],
    imageQuery: "Casa Manila Intramuros museum",
    wikiTitle: "Casa Manila",
    shortDescription:
      "Museum of Spanish-colonial domestic life in a recreated bahay na bato house in Intramuros.",
    summary:
      "Casa Manila is a museum complex in Intramuros that presents domestic life during the Spanish colonial period through architecture, furniture, and interior spaces.",
    whyItMatters:
      "It helps visitors imagine daily life, not just monuments — making the larger Intramuros story more human and relatable.",
    story:
      "The museum recreates the atmosphere of an affluent colonial-era house, showing how design, social status, religion, and trade entered private rooms and courtyards.",
    culturalMeaning:
      "Casa Manila answers the question 'how did people actually live inside the walls?' — complementing churches and forts with home life.",
    whatToDo: [
      "Compare the courtyard layout with the street outside.",
      "Notice furniture, ventilation, and how rooms signal social hierarchy.",
      "Visit after San Agustin Church for a strong church-and-home contrast.",
    ],
    localTips: [
      "Photography rules vary — check at the entrance.",
      "Good air-conditioned break from outdoor wall walks.",
      "Pair with a cafe stop nearby after.",
    ],
    nearbyKnowledge: [
      "san-agustin-church",
      "intramuros",
      "manila-cathedral",
    ],
    foodSpots: [
      "Intramuros cafes along General Luna",
      "Tablea chocolate drinks nearby",
    ],
    guideScript:
      "Casa Manila is where history becomes domestic. Instead of battles and big names, you get rooms, windows, furniture, and the feeling of how people wanted to be seen. Parang house tour pero 1800s edition — ang ganda ng courtyard, dun ka mag-picture muna.",
    routes: {
      quick: {
        title: "Home & church",
        duration: "About 1 hour",
        walkingNote: "Adjacent to San Agustin.",
        stops: [
          {
            destinationId: "casa-manila",
            label: "Casa Manila",
            duration: "35 min",
            reason: "Colonial interiors.",
          },
          {
            destinationId: "san-agustin-church",
            label: "San Agustin",
            duration: "25 min",
            reason: "Faith next door.",
          },
        ],
      },
      halfDay: {
        title: "Domestic Intramuros",
        duration: "3 hours",
        walkingNote: "Slow, indoor-friendly loop.",
        stops: [
          {
            destinationId: "casa-manila",
            label: "Casa Manila",
            duration: "50 min",
            reason: "Home life.",
          },
          {
            destinationId: "san-agustin-church",
            label: "San Agustin",
            duration: "50 min",
            reason: "Faith and art.",
          },
          {
            destinationId: "manila-cathedral",
            label: "Manila Cathedral",
            duration: "40 min",
            reason: "Plaza Roma.",
          },
        ],
      },
      fullDay: {
        title: "Full walled city",
        duration: "6 hours",
        walkingNote: "See intramuros routes.",
        stops: [
          {
            destinationId: "casa-manila",
            label: "Casa Manila",
            duration: "45 min",
            reason: "Mid-loop domestic stop.",
          },
          {
            destinationId: "intramuros",
            label: "Broader Intramuros",
            duration: "4 hrs",
            reason: "Complete the district.",
          },
        ],
      },
    },
    captions: {
      tourist:
        "Casa Manila turns Intramuros into a house tour through history: courtyards, capiz windows, and the social life of old Manila. #AnoTara #CasaManila",
      localTourism:
        "Step inside Casa Manila and experience colonial domestic heritage — furnished rooms, courtyards, and stories of life within the Walled City. #Intramuros",
      social:
        "Capiz windows + colonial rooms = aesthetic goals. Casa Manila. #AnoTara",
    },
    recommendedTime: "45–60 minutes",
    entranceFee: "Paid",
    locationLabel: "General Luna, Intramuros",
    initials: "CM",
  },
  {
    id: "quiapo-church",
    name: "Quiapo Church",
    category: "churches",
    tags: ["black nazarene", "quiapo", "market", "devotion"],
    coordinates: [14.5987, 120.9831],
    imageQuery: "Quiapo Church Manila Black Nazarene",
    wikiTitle: "Quiapo Church",
    shortDescription:
      "Minor Basilica of the Black Nazarene — one of the most important devotional sites in the Philippines, beside a legendary street market.",
    summary:
      "Quiapo Church, officially the Minor Basilica of the Black Nazarene, is a major Catholic shrine in Manila famous for the January Traslación and its vibrant surrounding market district.",
    whyItMatters:
      "Quiapo shows how faith, street commerce, and popular devotion intersect in everyday Manila — intense, colorful, and deeply Filipino.",
    story:
      "The Black Nazarene draws millions of devotees each year. Around the church, Quiapo's markets sell everything from herbs and cameras to religious images, creating a sensory contrast to quiet heritage sites.",
    culturalMeaning:
      "Quiapo is not only a church — it is a cultural event space where faith, folk practice, and urban street life meet without filters.",
    whatToDo: [
      "Visit the church respectfully; observe active devotion.",
      "Walk the surrounding market for herbalists, religious goods, and street food.",
      "Connect to Binondo or Escolta for a north-Manila day.",
    ],
    localTips: [
      "Secure phones and wallets — crowded area.",
      "Friday is traditionally busier for novena devotees.",
      "Ask before photographing people at prayer.",
    ],
    nearbyKnowledge: ["binondo", "escolta", "arroceros-forest-park"],
    foodSpots: [
      "Turon and banana cue from street vendors",
      "Carinderia rows along Hidalgo and Quezon Blvd",
      "Dampa-style seafood nearby if venturing further",
    ],
    guideScript:
      "Quiapo is loud, busy, and real — hindi siya curated museum. Pero worth puntahan kasi dito mo makikita ang Filipino faith na buhay na buhay, hindi display lang. Tip lang: hold your bag close, and be respectful sa mga nagdadasal.",
    routes: {
      quick: {
        title: "Quiapo snapshot",
        duration: "About 1 hour",
        walkingNote: "Stay near the church and main plaza.",
        stops: [
          {
            destinationId: "quiapo-church",
            label: "Quiapo Church",
            duration: "30 min",
            reason: "Shrine and plaza.",
          },
          {
            destinationId: "quiapo-church",
            label: "Market edge",
            duration: "30 min",
            reason: "Street market atmosphere.",
          },
        ],
      },
      halfDay: {
        title: "Quiapo & Chinatown",
        duration: "4 hours",
        walkingNote: "Jeepney or walk to Binondo — about 15 minutes.",
        stops: [
          {
            destinationId: "quiapo-church",
            label: "Quiapo",
            duration: "1.5 hrs",
            reason: "Faith and market.",
          },
          {
            destinationId: "binondo",
            label: "Binondo",
            duration: "2 hrs",
            reason: "Food and Chinatown.",
          },
        ],
      },
      fullDay: {
        title: "Old Manila north arc",
        duration: "7 hours",
        walkingNote: "Busy streets — pace yourself.",
        stops: [
          {
            destinationId: "quiapo-church",
            label: "Quiapo morning",
            duration: "1.5 hrs",
            reason: "Devotion and market.",
          },
          {
            destinationId: "binondo",
            label: "Binondo lunch",
            duration: "2 hrs",
            reason: "Food crawl.",
          },
          {
            destinationId: "intramuros",
            label: "Intramuros afternoon",
            duration: "3 hrs",
            reason: "Heritage contrast.",
          },
        ],
      },
    },
    captions: {
      tourist:
        "Quiapo Church and its surrounding market show Manila at its most devotional and vibrant — faith, street life, and color in one place. #AnoTara #Quiapo",
      localTourism:
        "Visit Quiapo — home of the Black Nazarene and one of Manila's most dynamic cultural districts. Experience faith and street heritage together. #QuiapoChurch",
      social:
        "Quiapo energy is unmatched. Faith + market chaos = Manila.real #AnoTara",
    },
    recommendedTime: "1–2 hours",
    entranceFee: "Free",
    locationLabel: "Quiapo, Manila",
    initials: "QU",
  },
  {
    id: "arroceros-forest-park",
    name: "Arroceros Forest Park",
    category: "hidden-gems",
    tags: ["urban forest", "hidden gem", "nature", "quiet escape"],
    coordinates: [14.5945, 120.9825],
    imageQuery: "Arroceros Forest Park Manila",
    wikiTitle: "Arroceros Forest Park",
    shortDescription:
      "A small urban forest park beside the Pasig — a green hidden gem between heritage sites and busy streets.",
    summary:
      "Arroceros Forest Park is a compact urban forest in Manila, often called the 'last lung' of the city center, with native trees and quiet paths amid downtown density.",
    whyItMatters:
      "It offers a rare pause from stone heritage and crowded markets — showing that Manila's story also includes environmental advocacy and community stewardship.",
    story:
      "Saved from development by civic groups, the park sits near the Pasig River and Manila City Hall. Its trees and shaded paths feel worlds away from Quiapo and Escolta just minutes away.",
    culturalMeaning:
      "Arroceros represents grassroots efforts to keep green space in a dense capital — a different kind of heritage, rooted in community care.",
    whatToDo: [
      "Walk the shaded paths for 20–30 minutes between heavier heritage stops.",
      "Listen for birds and notice native tree labels if posted.",
      "Pair with City Hall or river walks for a 'green Manila' angle.",
    ],
    localTips: [
      "Check opening hours — access can vary.",
      "Best as a breather, not a full-day destination.",
      "Mosquito repellent helps in humid months.",
    ],
    nearbyKnowledge: ["quiapo-church", "escolta", "binondo", "intramuros"],
    foodSpots: [
      "Grab snacks before entering — limited vendors inside",
      "Quiapo or Binondo for proper meals nearby",
    ],
    guideScript:
      "Kailangan mo ng break from crowds? Ito ang secret spot. Arroceros is small, pero surprisingly peaceful — parang mini forest sa gitna ng siyudad. Tip lang: huwag expect na malaki siya; it's a breather, hindi theme park.",
    routes: {
      quick: {
        title: "Green pause",
        duration: "About 1 hour",
        walkingNote: "Short loop inside the park.",
        stops: [
          {
            destinationId: "arroceros-forest-park",
            label: "Arroceros Forest Park",
            duration: "45 min",
            reason: "Shade and quiet paths.",
          },
        ],
      },
      halfDay: {
        title: "Quiapo & green break",
        duration: "4 hours",
        walkingNote: "Walk between Quiapo and Arroceros.",
        stops: [
          {
            destinationId: "quiapo-church",
            label: "Quiapo",
            duration: "1.5 hrs",
            reason: "Busy devotional center.",
          },
          {
            destinationId: "arroceros-forest-park",
            label: "Arroceros",
            duration: "45 min",
            reason: "Cool-down in greenery.",
          },
          {
            destinationId: "escolta",
            label: "Escolta",
            duration: "1 hr",
            reason: "Heritage street finish.",
          },
        ],
      },
      fullDay: {
        title: "Contrasts of old Manila",
        duration: "7 hours",
        walkingNote: "Mix intense and calm stops.",
        stops: [
          {
            destinationId: "binondo",
            label: "Binondo morning",
            duration: "2 hrs",
            reason: "Food energy.",
          },
          {
            destinationId: "arroceros-forest-park",
            label: "Arroceros",
            duration: "45 min",
            reason: "Green reset.",
          },
          {
            destinationId: "intramuros",
            label: "Intramuros afternoon",
            duration: "3 hrs",
            reason: "Stone heritage.",
          },
        ],
      },
    },
    captions: {
      tourist:
        "Find a quiet green escape at Arroceros Forest Park — Manila's hidden urban forest between the busy streets of Quiapo and the Pasig River. #AnoTara #HiddenManila",
      localTourism:
        "Discover Arroceros Forest Park — a community-loved green space proving Manila's heritage includes nature too. #Arroceros #SustainableTourism",
      social:
        "Didn't expect a forest in downtown Manila. Arroceros = hidden gem. #AnoTara",
    },
    recommendedTime: "30–45 minutes",
    entranceFee: "Free (donations welcome)",
    locationLabel: "Ermita / Quiapo area, Manila",
    initials: "AF",
  },
];

export const destinationById = new Map(
  destinations.map((d) => [d.id, d]),
);

export function getNearbyDestinations(id: string): Destination[] {
  const place = destinationById.get(id);
  if (!place) return [];
  return place.nearbyKnowledge
    .map((nearId) => destinationById.get(nearId))
    .filter((d): d is Destination => Boolean(d));
}

export function getDestinationInitials(category: Destination["category"]): string {
  const map: Record<Destination["category"], string> = {
    heritage: "HE",
    food: "FD",
    museums: "MU",
    churches: "CH",
    parks: "PK",
    "hidden-gems": "HG",
  };
  return map[category];
}
