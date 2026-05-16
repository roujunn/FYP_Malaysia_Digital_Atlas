export const mapTypeDefinitions = {
  administrative: {
    label: "Administrative Map",
    simpleName: "Administrative Map",
    short: "Boundaries & Areas",
    description:
      "Shows the administrative hierarchy and boundaries of Malaysia, including states, districts, mukim, towns, kampung and taman. It helps users understand which area a place belongs to.",
    examples: ["State", "District", "Mukim", "Kampung", "Taman"],
  },
  political: {
    label: "Political Map",
    simpleName: "Political Map",
    short: "Governance & Rep",
    description:
      "Shows governance-related areas such as parliament seats, state constituencies, local authority areas and representatives. It can support questions about who represents an area or how political boundaries change over time.",
    examples: ["Parliament", "DUN", "Representative", "Local Authority"],
  },
  transport: {
    label: "Transportation Map",
    simpleName: "Transportation Map",
    short: "Routes & Networks",
    description:
      "Shows transport networks such as roads, highways, railways,ferry terminals and boat routes. It helps users understand movement and connectivity.",
    examples: ["Road", "Rail", "Boat route"],
  },
  physical: {
    label: "Physical Map",
    simpleName: "Physical Map",
    short: "Terrain & Nature",
    description:
      "Shows natural features such as rivers, mountains, terrain, forests, coastal areas, water bodies and environmental risk zones.",
    examples: ["River", "Mountain", "Forest", "Terrain", "Coast"],
  },
  tourism: {
    label: "Tourism Map",
    simpleName: "Tourism Map",
    short: "Attractions & POIs",
    description:
      "Shows attractions, landmarks, heritage areas, food streets, hotels, museums and other points of interest for visitors.",
    examples: ["Attraction", "Landmark", "Food", "Hotel", "Museum"],
  },
  socioeconomic: {
    label: "Socio-Economic Map",
    simpleName: "Socio-Economic Map",
    short: "Amenities & Services",
    description:
      "Shows amenities and social facilities such as schools, hospitals, religious places, markets, community facilities and economic activity areas.",
    examples: ["School", "Hospital", "Church", "Market", "Amenity"],
  },
};

export const Scenarios = {
  melakaTourism: {
    query: "Show heritage tourism places in Melaka",
    title: "Heritage tourism places in Melaka",
    recommendedMapType: "tourism",
    focus: "Melaka Tengah",
    summary:
      "The system selected the tourism map because the query asks about heritage attractions.",
    userFriendlyAnswer:
      "In Melaka, major heritage tourism places include A Famosa, Stadthuys, Jonker Street, and Christ Church Melaka. The map highlights these attractions within the Melaka Tengah heritage area.",
    relatedPlaces: [
      {
        name: "Melaka Tengah",
        type: "District",
        note: "Main heritage tourism district.",
      },
      {
        name: "A Famosa",
        type: "PlaceOfInterest",
        note: "Historical landmark.",
      },
      {
        name: "Stadthuys",
        type: "PlaceOfInterest",
        note: "Heritage building.",
      },
      {
        name: "Jonker Street",
        type: "Street",
        note: "Popular heritage and food street.",
      },
    ],
    mapMarkers: [
      {
        label: "Melaka Tengah",
        x: 48,
        y: 44,
        type: "District",
        distance: "Selected area",
        description: "Main heritage district.",
      },
      {
        label: "A Famosa",
        x: 43,
        y: 50,
        type: "PlaceOfInterest",
        distance: "Nearby",
        description: "Historical tourism landmark.",
      },
      {
        label: "Stadthuys",
        x: 52,
        y: 46,
        type: "PlaceOfInterest",
        distance: "Nearby",
        description: "Heritage building in Melaka.",
      },
      {
        label: "Jonker Street",
        x: 60,
        y: 54,
        type: "Street",
        distance: "Nearby",
        description: "Heritage and food street.",
      },
    ],
    spatialAnalysis: {
      queryType: "Tourism heritage filter",
      center: "Melaka Tengah",
      radius: "Heritage area",
      explanation:
        "The system filters heritage-related tourism places within Melaka Tengah.",
      results: [
        {
          name: "A Famosa",
          type: "PlaceOfInterest",
          distance: "Nearby",
          note: "Historical landmark.",
        },
        {
          name: "Stadthuys",
          type: "PlaceOfInterest",
          distance: "Nearby",
          note: "Heritage attraction.",
        },
        {
          name: "Jonker Street",
          type: "Street",
          distance: "Nearby",
          note: "Tourism street.",
        },
      ],
    },
    steps: [
      "Detected a heritage tourism query.",
      "Identified Melaka Tengah as the focus area.",
      "Selected the tourism map layer.",
      "Highlighted heritage attractions and tourism streets.",
    ],
    graph: [
      ["Melaka Tengah", "IN_STATE", "Melaka"],
      ["A Famosa", "IN_DISTRICT", "Melaka Tengah"],
      ["Stadthuys", "IN_DISTRICT", "Melaka Tengah"],
      ["Jonker Street", "IN_OR_CROSSES_AREA", "Melaka Tengah"],
      ["A Famosa", "NEAR_STREET", "Jalan Kota"],
      ["Stadthuys", "NEAR_STREET", "Jalan Gereja"],
    ],
  },
  penangTransport: {
    query: "Show transport routes near George Town, Penang",
    title: "Transport routes near George Town",
    recommendedMapType: "transport",
    focus: "George Town, Penang",
    summary:
      "The system selected the transportation map because the query asks about movement and route connectivity.",
    userFriendlyAnswer:
      "Near George Town, Penang, the map shows key transport features such as main roads, ferry access, and nearby bus routes. This helps users understand how George Town connects to surrounding areas.",
    relatedPlaces: [
      { name: "George Town", type: "CityTown", note: "Main selected area." },
      {
        name: "Pengkalan Weld",
        type: "Street",
        note: "Main road near ferry access.",
      },
      {
        name: "Penang Ferry Terminal",
        type: "Transport Node",
        note: "Water transport access.",
      },
      {
        name: "Bus Route",
        type: "Transport",
        note: "Supports local movement.",
      },
    ],
    mapMarkers: [
      {
        label: "George Town",
        x: 45,
        y: 45,
        type: "CityTown",
        distance: "Selected area",
        description: "Main transport search area.",
      },
      {
        label: "Pengkalan Weld",
        x: 55,
        y: 50,
        type: "Street",
        distance: "Nearby",
        description: "Main road near waterfront area.",
      },
      {
        label: "Ferry Terminal",
        x: 66,
        y: 44,
        type: "Transport Node",
        distance: "Nearby",
        description: "Ferry access point.",
      },
      {
        label: "Bus Route",
        x: 39,
        y: 58,
        type: "Transport",
        distance: "Nearby",
        description: "Local public transport route.",
      },
    ],
    spatialAnalysis: {
      queryType: "Transport connectivity lookup",
      center: "George Town",
      radius: "Nearby route network",
      explanation:
        "The system checks roads, ferry access, and public transport routes near George Town.",
      results: [
        {
          name: "Pengkalan Weld",
          type: "Street",
          distance: "Nearby",
          note: "Main road near waterfront.",
        },
        {
          name: "Penang Ferry Terminal",
          type: "Transport Node",
          distance: "Nearby",
          note: "Supports ferry movement.",
        },
        {
          name: "Bus Route",
          type: "Transport",
          distance: "Nearby",
          note: "Supports local access.",
        },
      ],
    },
    steps: [
      "Detected a transport query.",
      "Identified George Town as the target area.",
      "Selected the transportation map layer.",
      "Highlighted roads, ferry access and transport routes.",
    ],
    graph: [
      ["George Town", "IN_STATE", "Penang"],
      ["Pengkalan Weld", "IN_OR_CROSSES_AREA", "George Town"],
      ["Penang Ferry Terminal", "NEAR_STREET", "Pengkalan Weld"],
      ["Bus Route", "CONNECTS_TO", "George Town"],
      ["Pengkalan Weld", "CONNECTS_TO", "Penang Ferry Terminal"],
    ],
  },
  physical: {
    query: "What are the major rivers in Pahang?",
    title: "Major Rivers in Pahang",
    recommendedMapType: "physical",
    focus: "Pahang",

    summary:
      "The system selected the physical map because river-related queries require geographical and environmental visualization.",

    userFriendlyAnswer:
      "The map highlights several major rivers in Pahang, including Sungai Pahang, Sungai Jelai, and Sungai Tembeling. These rivers play an important role in the state's geography and environmental landscape.",
    relatedPlaces: [
      {
        name: "Pahang",
        type: "State",
        note: "Main selected area.",
      },
      {
        name: "Sungai Pahang",
        type: "River",
        note: "The longest river in Peninsular Malaysia.",
      },
      {
        name: "Sungai Jelai",
        type: "River",
        note: "Major tributary connected to Sungai Pahang.",
      },
      {
        name: "Sungai Tembeling",
        type: "River",
        note: "Important river flowing through central Pahang.",
      },
    ],

    mapMarkers: [
      {
        label: "Pahang",
        x: 54,
        y: 28,
        type: "State",
        distance: "Selected area",
        description: "The selected state for the physical geography query.",
      },

      {
        label: "Sungai Pahang",
        x: 48,
        y: 35,
        type: "River",
        distance: "Main river",
        description: "The major river flowing across Pahang.",
      },

      {
        label: "Sungai Jelai",
        x: 58,
        y: 42,
        type: "River",
        distance: "Tributary",
        description: "A tributary connected to the Pahang River system.",
      },

      {
        label: "Sungai Tembeling",
        x: 62,
        y: 30,
        type: "River",
        distance: "Upper river region",
        description: "A major river contributing to the Pahang river basin.",
      },
    ],

    spatialAnalysis: {
      queryType: "Physical river visualization",

      center: "Pahang river network",

      radius: "River basin coverage",

      explanation:
        "The major rivers and their geographical relationships within Pahang using a simplified physical map representation.",

      results: [
        {
          name: "Sungai Pahang",
          type: "River",
          distance: "Main river",
          note: "Primary river across the state.",
        },

        {
          name: "Sungai Jelai",
          type: "River",
          distance: "Connected tributary",
          note: "Contributes to the river network.",
        },

        {
          name: "Sungai Tembeling",
          type: "River",
          distance: "Northern region",
          note: "Part of the upper river basin.",
        },

        {
          name: "Pahang",
          type: "State",
          distance: "Contains rivers",
          note: "Parent geographical area.",
        },
      ],
    },

    steps: [
      "Detected a physical geography query.",
      "Identified Pahang as the target state.",
      "Selected the physical map because rivers are environmental features.",
      "Highlighted major rivers and their geographical relationships.",
    ],

    graph: [
      ["Kuantan District", "IN_STATE", "Pahang"],
      ["Jerantut District", "IN_STATE", "Pahang"],
      ["Lipis District", "IN_STATE", "Pahang"],

      ["Kuantan District", "PASSES_THROUGH", "Sungai Pahang"],
      ["Jerantut District", "PASSES_THROUGH", "Sungai Tembeling"],
      ["Lipis District", "PASSES_THROUGH", "Sungai Jelai"],

      ["Kuantan District", "ADJACENT_TO", "Pekan District"],
    ],
  },
  klPolitical: {
    query: "Which parliament and DUN areas cover Kuala Lumpur?",
    title: "Political boundaries in Kuala Lumpur",
    recommendedMapType: "political",
    focus: "Kuala Lumpur",
    summary:
      "The system selected the political map because the query asks about parliament and constituency boundaries.",
    userFriendlyAnswer:
      "For Kuala Lumpur, the political map can show parliament areas, DUN or constituency boundaries, and related governance areas. In this demo, Kuala Lumpur is linked with a parliament area, a DUN area, and a local authority boundary.",
    relatedPlaces: [
      {
        name: "Kuala Lumpur",
        type: "Federal Territory",
        note: "Main selected area.",
      },
      {
        name: "Bukit Bintang Parliament Area",
        type: "Parliament Area",
        note: "Example parliament boundary.",
      },
      {
        name: "DUN Area",
        type: "State Constituency",
        note: "Example constituency area.",
      },
      {
        name: "DBKL Area",
        type: "Local Authority",
        note: "Governance boundary.",
      },
    ],
    mapMarkers: [
      {
        label: "Kuala Lumpur",
        x: 45,
        y: 44,
        type: "Federal Territory",
        distance: "Selected area",
        description: "Main political search area.",
      },
      {
        label: "Parliament Area",
        x: 54,
        y: 46,
        type: "Parliament Area",
        distance: "Covers selected area",
        description: "Example parliamentary boundary.",
      },
      {
        label: "DUN Area",
        x: 60,
        y: 56,
        type: "State Constituency",
        distance: "Inside parliament area",
        description: "Example constituency boundary.",
      },
      {
        label: "DBKL Area",
        x: 42,
        y: 60,
        type: "Local Authority",
        distance: "Overlaps area",
        description: "Local governance boundary.",
      },
    ],
    spatialAnalysis: {
      queryType: "Political boundary overlap",
      center: "Kuala Lumpur",
      radius: "Constituency boundary",
      explanation:
        "The system checks how parliament, constituency, and local authority areas overlap within Kuala Lumpur.",
      results: [
        {
          name: "Bukit Bintang Parliament Area",
          type: "Parliament Area",
          distance: "Selected",
          note: "Main representative boundary.",
        },
        {
          name: "DUN Area",
          type: "State Constituency",
          distance: "Inside",
          note: "Smaller political boundary.",
        },
        {
          name: "DBKL Area",
          type: "Local Authority",
          distance: "Overlaps",
          note: "Governance boundary.",
        },
      ],
    },
    steps: [
      "Detected a political boundary query.",
      "Identified Kuala Lumpur as the target area.",
      "Selected the political map layer.",
      "Displayed parliament, constituency and local authority relationships.",
    ],
    graph: [
      ["Bukit Bintang Parliament Area", "IN_OR_CROSSES_AREA", "Kuala Lumpur"],
      ["DUN Area", "IN_OR_CROSSES_AREA", "Bukit Bintang Parliament Area"],
      ["DBKL Area", "IN_OR_CROSSES_AREA", "Kuala Lumpur"],
      [
        "Bukit Bintang Parliament Area",
        "ADJACENT_TO",
        "Neighbour Parliament Area",
      ],
    ],
  },
};

export const popularQueries = [
  "What places can I visit in Kuala Lumpur?",
  "Show heritage tourism places in Melaka",
  "How can I travel around Penang using roads and ferry routes?",
  "Which parliament area represents Kuala Lumpur?",
  "What is the major river in Pahang",
];
