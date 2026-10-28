const AGRI_DATA = {
  "crops": {
    "wheat": {
      "id": "wheat",
      "name": "Wheat (गेहूं)",
      "nameHi": "गेहूं",
      "category": "Cereal / Grain",
      "icon": "🌾",
      "idealSeason": [
        "rabi"
      ],
      "soilTypes": [
        "alluvial",
        "black",
        "clayey_loam"
      ],
      "phRange": [
        6.0,
        7.5
      ],
      "tempRange": [
        12,
        26
      ],
      "optTemp": 20,
      "rainfallRange": [
        350,
        650
      ],
      "waterRequirementMm": 450,
      "irrigationSensitive": true,
      "npkDemand": {
        "n": 120,
        "p": 60,
        "k": 40
      },
      "durationDays": "120-135 days",
      "baseYieldPerAcre": 18.5,
      "maxYieldPerAcre": 24.0,
      "minYieldPerAcre": 12.0,
      "costOfCultivationPerAcre": 14500,
      "currentPricePerQuintal": 2475,
      "msp": 2425,
      "historicalPrices": [
        2250,
        2275,
        2300,
        2350,
        2380,
        2400,
        2425,
        2450,
        2460,
        2475,
        2490,
        2510
      ],
      "priceForecast": {
        "trend": "Bullish",
        "changePercent": 3.2,
        "advice": "Prices firming up due to procurement targets; optimal window to sell in next 30-45 days."
      },
      "description": "Staple rabi cereal with assured MSP procurement in northern and central plains.",
      "risks": "Terminal heat stress in March and lodging if excess urea applied."
    },
    "paddy": {
      "id": "paddy",
      "name": "Paddy / Rice (धान)",
      "nameHi": "धान / चावल",
      "category": "Cereal / Grain",
      "icon": "🍚",
      "idealSeason": [
        "kharif",
        "rabi"
      ],
      "soilTypes": [
        "alluvial",
        "clayey_loam",
        "black"
      ],
      "phRange": [
        5.5,
        7.2
      ],
      "tempRange": [
        22,
        36
      ],
      "optTemp": 28,
      "rainfallRange": [
        900,
        1500
      ],
      "waterRequirementMm": 1200,
      "irrigationSensitive": true,
      "npkDemand": {
        "n": 100,
        "p": 50,
        "k": 50
      },
      "durationDays": "115-135 days",
      "baseYieldPerAcre": 22.0,
      "maxYieldPerAcre": 30.0,
      "minYieldPerAcre": 15.0,
      "costOfCultivationPerAcre": 18500,
      "currentPricePerQuintal": 2320,
      "msp": 2300,
      "historicalPrices": [
        2183,
        2200,
        2220,
        2250,
        2270,
        2290,
        2300,
        2315,
        2320,
        2330,
        2345,
        2350
      ],
      "priceForecast": {
        "trend": "Stable",
        "changePercent": 1.5,
        "advice": "Government central pool procurement maintains steady price floor."
      },
      "description": "Water-loving kharif grain ideal for clayey and flood-plain soils.",
      "risks": "Blast disease in high humidity; high water pumping cost if rainfall falters."
    },
    "cotton": {
      "id": "cotton",
      "name": "Cotton (कपास)",
      "nameHi": "कपास",
      "category": "Cash / Fiber",
      "icon": "☁️",
      "idealSeason": [
        "kharif"
      ],
      "soilTypes": [
        "black",
        "alluvial"
      ],
      "phRange": [
        6.0,
        8.0
      ],
      "tempRange": [
        21,
        35
      ],
      "optTemp": 28,
      "rainfallRange": [
        500,
        800
      ],
      "waterRequirementMm": 650,
      "irrigationSensitive": false,
      "npkDemand": {
        "n": 120,
        "p": 60,
        "k": 60
      },
      "durationDays": "150-180 days",
      "baseYieldPerAcre": 9.5,
      "maxYieldPerAcre": 14.5,
      "minYieldPerAcre": 5.5,
      "costOfCultivationPerAcre": 21000,
      "currentPricePerQuintal": 7420,
      "msp": 7121,
      "historicalPrices": [
        6850,
        6950,
        7100,
        7250,
        7300,
        7380,
        7420,
        7450,
        7390,
        7420,
        7500,
        7580
      ],
      "priceForecast": {
        "trend": "Bullish",
        "changePercent": 4.1,
        "advice": "Domestic arrivals tapering; mills replenishing stocks; hold for peak rate."
      },
      "description": "Commercial white-gold cash crop with deep root system thriving in deep Black Regur soil.",
      "risks": "Pink bollworm infestation risk; excessive rainfall during boll opening degrades lint."
    },
    "maize": {
      "id": "maize",
      "name": "Maize / Corn (मक्का)",
      "nameHi": "मक्का",
      "category": "Cereal / Feed",
      "icon": "🌽",
      "idealSeason": [
        "kharif",
        "rabi",
        "zaid"
      ],
      "soilTypes": [
        "alluvial",
        "red",
        "sandy_loam"
      ],
      "phRange": [
        5.8,
        7.5
      ],
      "tempRange": [
        18,
        32
      ],
      "optTemp": 25,
      "rainfallRange": [
        500,
        800
      ],
      "waterRequirementMm": 500,
      "irrigationSensitive": false,
      "npkDemand": {
        "n": 120,
        "p": 60,
        "k": 50
      },
      "durationDays": "95-110 days",
      "baseYieldPerAcre": 24.0,
      "maxYieldPerAcre": 34.0,
      "minYieldPerAcre": 16.0,
      "costOfCultivationPerAcre": 13500,
      "currentPricePerQuintal": 2240,
      "msp": 2090,
      "historicalPrices": [
        1980,
        2010,
        2050,
        2100,
        2120,
        2150,
        2180,
        2200,
        2220,
        2240,
        2260,
        2290
      ],
      "priceForecast": {
        "trend": "Bullish",
        "changePercent": 5.0,
        "advice": "Surging industrial demand from ethanol and feed producers."
      },
      "description": "Fast-growing high-yield cereal suited for well-drained loams and red soils.",
      "risks": "Fall Armyworm (FAW) threat; seedling waterlogging vulnerability."
    },
    "soybean": {
      "id": "soybean",
      "name": "Soybean (सोयाबीन)",
      "nameHi": "सोयाबीन",
      "category": "Oilseed / Legume",
      "icon": "🌱",
      "idealSeason": [
        "kharif"
      ],
      "soilTypes": [
        "black",
        "alluvial"
      ],
      "phRange": [
        6.0,
        7.5
      ],
      "tempRange": [
        20,
        32
      ],
      "optTemp": 26,
      "rainfallRange": [
        600,
        900
      ],
      "waterRequirementMm": 550,
      "irrigationSensitive": false,
      "npkDemand": {
        "n": 30,
        "p": 60,
        "k": 40
      },
      "durationDays": "90-105 days",
      "baseYieldPerAcre": 8.5,
      "maxYieldPerAcre": 13.0,
      "minYieldPerAcre": 5.0,
      "costOfCultivationPerAcre": 12000,
      "currentPricePerQuintal": 4680,
      "msp": 4892,
      "historicalPrices": [
        4450,
        4520,
        4580,
        4620,
        4650,
        4690,
        4710,
        4680,
        4660,
        4680,
        4730,
        4780
      ],
      "priceForecast": {
        "trend": "Recovering",
        "changePercent": 2.8,
        "advice": "Prices trading near MSP; state procurement supports floor rate."
      },
      "description": "Crucial kharif oilseed that fixes atmospheric nitrogen, enriching soil health.",
      "risks": "Yellow mosaic virus; rain dry-spells during pod filling reduces seed size."
    },
    "chickpea": {
      "id": "chickpea",
      "name": "Chickpea / Gram (चना)",
      "nameHi": "चना",
      "category": "Pulse / Legume",
      "icon": "🫘",
      "idealSeason": [
        "rabi"
      ],
      "soilTypes": [
        "black",
        "alluvial",
        "sandy_loam"
      ],
      "phRange": [
        6.0,
        7.5
      ],
      "tempRange": [
        14,
        26
      ],
      "optTemp": 20,
      "rainfallRange": [
        300,
        500
      ],
      "waterRequirementMm": 350,
      "irrigationSensitive": false,
      "npkDemand": {
        "n": 20,
        "p": 40,
        "k": 20
      },
      "durationDays": "100-115 days",
      "baseYieldPerAcre": 7.8,
      "maxYieldPerAcre": 12.0,
      "minYieldPerAcre": 4.8,
      "costOfCultivationPerAcre": 11000,
      "currentPricePerQuintal": 6150,
      "msp": 5440,
      "historicalPrices": [
        5400,
        5520,
        5680,
        5800,
        5950,
        6050,
        6100,
        6150,
        6200,
        6150,
        6280,
        6350
      ],
      "priceForecast": {
        "trend": "Very Bullish",
        "changePercent": 4.8,
        "advice": "Tight market supply keeping prices comfortably above MSP."
      },
      "description": "Drought-hardy pulse requiring minimal irrigation; excellent post-paddy rotation crop.",
      "risks": "Fusarium wilt; pod borer in humid conditions; waterlogging rot."
    },
    "mustard": {
      "id": "mustard",
      "name": "Mustard / Rapeseed (सरसों)",
      "nameHi": "सरसों",
      "category": "Oilseed",
      "icon": "🌼",
      "idealSeason": [
        "rabi"
      ],
      "soilTypes": [
        "sandy_loam",
        "alluvial"
      ],
      "phRange": [
        6.0,
        7.5
      ],
      "tempRange": [
        10,
        25
      ],
      "optTemp": 18,
      "rainfallRange": [
        250,
        450
      ],
      "waterRequirementMm": 300,
      "irrigationSensitive": false,
      "npkDemand": {
        "n": 80,
        "p": 40,
        "k": 40
      },
      "durationDays": "105-125 days",
      "baseYieldPerAcre": 7.5,
      "maxYieldPerAcre": 11.0,
      "minYieldPerAcre": 4.5,
      "costOfCultivationPerAcre": 9800,
      "currentPricePerQuintal": 5620,
      "msp": 5650,
      "historicalPrices": [
        5200,
        5300,
        5390,
        5450,
        5500,
        5560,
        5600,
        5620,
        5650,
        5680,
        5720,
        5750
      ],
      "priceForecast": {
        "trend": "Stable",
        "changePercent": 1.8,
        "advice": "Domestic edible oil duties provide steady support to seed rates."
      },
      "description": "Low-input rabi oilseed well suited for sandy loam and alluvial belts.",
      "risks": "Aphid infestation in cloudy weather; frost damage during flowering."
    },
    "sugarcane": {
      "id": "sugarcane",
      "name": "Sugarcane (गन्ना)",
      "nameHi": "गन्ना",
      "category": "Cash / Sugar",
      "icon": "🎋",
      "idealSeason": [
        "kharif",
        "rabi",
        "zaid"
      ],
      "soilTypes": [
        "alluvial",
        "black",
        "clayey_loam"
      ],
      "phRange": [
        6.2,
        8.0
      ],
      "tempRange": [
        22,
        36
      ],
      "optTemp": 30,
      "rainfallRange": [
        1100,
        1600
      ],
      "waterRequirementMm": 1500,
      "irrigationSensitive": true,
      "npkDemand": {
        "n": 250,
        "p": 100,
        "k": 120
      },
      "durationDays": "300-365 days",
      "baseYieldPerAcre": 350.0,
      "maxYieldPerAcre": 500.0,
      "minYieldPerAcre": 220.0,
      "costOfCultivationPerAcre": 48000,
      "currentPricePerQuintal": 340,
      "msp": 340,
      "historicalPrices": [
        315,
        315,
        320,
        325,
        325,
        330,
        335,
        340,
        340,
        340,
        345,
        350
      ],
      "priceForecast": {
        "trend": "Guaranteed FRP",
        "changePercent": 2.9,
        "advice": "Statutory Fair and Remunerative Price assures minimum revenue."
      },
      "description": "High-tonnage perennial cash crop providing high gross output under canal/borewell irrigation.",
      "risks": "Red rot disease; immense irrigation requirement; mill payment delay."
    },
    "groundnut": {
      "id": "groundnut",
      "name": "Groundnut (मूंगफली)",
      "nameHi": "मूंगफली",
      "category": "Oilseed / Cash",
      "icon": "🥜",
      "idealSeason": [
        "kharif",
        "zaid"
      ],
      "soilTypes": [
        "sandy_loam",
        "red",
        "alluvial"
      ],
      "phRange": [
        6.0,
        7.2
      ],
      "tempRange": [
        22,
        32
      ],
      "optTemp": 27,
      "rainfallRange": [
        450,
        700
      ],
      "waterRequirementMm": 500,
      "irrigationSensitive": false,
      "npkDemand": {
        "n": 25,
        "p": 50,
        "k": 40
      },
      "durationDays": "105-120 days",
      "baseYieldPerAcre": 8.5,
      "maxYieldPerAcre": 13.5,
      "minYieldPerAcre": 5.2,
      "costOfCultivationPerAcre": 15500,
      "currentPricePerQuintal": 6850,
      "msp": 6783,
      "historicalPrices": [
        6400,
        6500,
        6620,
        6700,
        6750,
        6800,
        6850,
        6870,
        6900,
        6950,
        7000,
        7050
      ],
      "priceForecast": {
        "trend": "Bullish",
        "changePercent": 3.5,
        "advice": "Robust peanut butter and oil processing demand."
      },
      "description": "High-value legume oilseed preferring friable loose soil for easy peg development.",
      "risks": "Tikka leaf spot; soil crusting preventing pod formation; storage aflatoxin."
    },
    "tomato": {
      "id": "tomato",
      "name": "Tomato (टमाटर)",
      "nameHi": "टमाटर",
      "category": "Horticulture / Veg",
      "icon": "🍅",
      "idealSeason": [
        "rabi",
        "kharif",
        "zaid"
      ],
      "soilTypes": [
        "sandy_loam",
        "red",
        "alluvial"
      ],
      "phRange": [
        6.0,
        7.0
      ],
      "tempRange": [
        18,
        30
      ],
      "optTemp": 24,
      "rainfallRange": [
        400,
        600
      ],
      "waterRequirementMm": 450,
      "irrigationSensitive": true,
      "npkDemand": {
        "n": 150,
        "p": 80,
        "k": 100
      },
      "durationDays": "90-120 days",
      "baseYieldPerAcre": 140.0,
      "maxYieldPerAcre": 220.0,
      "minYieldPerAcre": 75.0,
      "costOfCultivationPerAcre": 35000,
      "currentPricePerQuintal": 1950,
      "msp": 0,
      "historicalPrices": [
        1200,
        1400,
        2200,
        3100,
        2800,
        1600,
        1450,
        1950,
        2400,
        2100,
        1800,
        2200
      ],
      "priceForecast": {
        "trend": "High Volatility",
        "changePercent": 12.0,
        "advice": "High profit potential; use staggered picking to hedge price drops."
      },
      "description": "High-return horticultural crop with rapid harvest turnarounds and quick liquidity.",
      "risks": "Price volatility; bacterial wilt, blights, and high pest pressure."
    },
    "potato": {
      "id": "potato",
      "name": "Potato (आलू)",
      "nameHi": "आलू",
      "category": "Horticulture / Tuber",
      "icon": "🥔",
      "idealSeason": [
        "rabi"
      ],
      "soilTypes": [
        "sandy_loam",
        "alluvial"
      ],
      "phRange": [
        5.2,
        6.8
      ],
      "tempRange": [
        14,
        22
      ],
      "optTemp": 18,
      "rainfallRange": [
        350,
        500
      ],
      "waterRequirementMm": 400,
      "irrigationSensitive": true,
      "npkDemand": {
        "n": 150,
        "p": 100,
        "k": 120
      },
      "durationDays": "90-110 days",
      "baseYieldPerAcre": 110.0,
      "maxYieldPerAcre": 160.0,
      "minYieldPerAcre": 65.0,
      "costOfCultivationPerAcre": 32000,
      "currentPricePerQuintal": 1580,
      "msp": 0,
      "historicalPrices": [
        1100,
        1150,
        1250,
        1380,
        1450,
        1500,
        1580,
        1620,
        1650,
        1600,
        1550,
        1580
      ],
      "priceForecast": {
        "trend": "Steady",
        "changePercent": 2.1,
        "advice": "Cold storage stock movement active; processing grade commands premium."
      },
      "description": "Winter tuber crop delivering massive calorie and commercial yields in loam soils.",
      "risks": "Late blight epidemic in cloudy fog; high seed tuber input expenditure."
    },
    "onion": {
      "id": "onion",
      "name": "Onion (प्याज)",
      "nameHi": "प्याज",
      "category": "Horticulture / Bulb",
      "icon": "🧅",
      "idealSeason": [
        "rabi",
        "kharif"
      ],
      "soilTypes": [
        "sandy_loam",
        "alluvial",
        "red"
      ],
      "phRange": [
        6.0,
        7.5
      ],
      "tempRange": [
        16,
        30
      ],
      "optTemp": 22,
      "rainfallRange": [
        350,
        550
      ],
      "waterRequirementMm": 400,
      "irrigationSensitive": true,
      "npkDemand": {
        "n": 100,
        "p": 50,
        "k": 80
      },
      "durationDays": "120-140 days",
      "baseYieldPerAcre": 95.0,
      "maxYieldPerAcre": 150.0,
      "minYieldPerAcre": 50.0,
      "costOfCultivationPerAcre": 28000,
      "currentPricePerQuintal": 2450,
      "msp": 0,
      "historicalPrices": [
        1600,
        1750,
        1900,
        2200,
        2600,
        3100,
        2800,
        2450,
        2300,
        2400,
        2650,
        2800
      ],
      "priceForecast": {
        "trend": "Bullish",
        "changePercent": 6.5,
        "advice": "Strategic buffer procurement and export window stabilizing prices."
      },
      "description": "High-value bulb crop requiring fertile, friable, well-drained loamy soil.",
      "risks": "Thrips, purple blotch, and bulb rot in damp harvest fields."
    },
    "pearl_millet": {
      "id": "pearl_millet",
      "name": "Pearl Millet / Bajra (बाजरा)",
      "nameHi": "बाजरा",
      "category": "Millets / Nutri-Cereal",
      "icon": "🌾",
      "idealSeason": [
        "kharif",
        "zaid"
      ],
      "soilTypes": [
        "sandy_loam",
        "red",
        "alluvial"
      ],
      "phRange": [
        6.5,
        8.2
      ],
      "tempRange": [
        24,
        38
      ],
      "optTemp": 30,
      "rainfallRange": [
        300,
        500
      ],
      "waterRequirementMm": 350,
      "irrigationSensitive": false,
      "npkDemand": {
        "n": 80,
        "p": 40,
        "k": 30
      },
      "durationDays": "75-90 days",
      "baseYieldPerAcre": 10.5,
      "maxYieldPerAcre": 15.5,
      "minYieldPerAcre": 6.0,
      "costOfCultivationPerAcre": 8500,
      "currentPricePerQuintal": 2625,
      "msp": 2625,
      "historicalPrices": [
        2250,
        2320,
        2400,
        2480,
        2520,
        2570,
        2600,
        2625,
        2640,
        2660,
        2680,
        2710
      ],
      "priceForecast": {
        "trend": "Bullish",
        "changePercent": 3.0,
        "advice": "Boosted by Shree Anna millets initiative and government procurement."
      },
      "description": "Climate-resilient superfood millet thriving in arid, sandy, low-fertility soils.",
      "risks": "Ergot and downy mildew during prolonged wet flowering spells."
    },
    "sorghum": {
      "id": "sorghum",
      "name": "Sorghum / Jowar (ज्वार)",
      "nameHi": "ज्वार",
      "category": "Millets / Nutri-Cereal",
      "icon": "🌾",
      "idealSeason": [
        "kharif",
        "rabi"
      ],
      "soilTypes": [
        "black",
        "alluvial",
        "clayey_loam"
      ],
      "phRange": [
        6.0,
        8.0
      ],
      "tempRange": [
        22,
        34
      ],
      "optTemp": 28,
      "rainfallRange": [
        400,
        650
      ],
      "waterRequirementMm": 450,
      "irrigationSensitive": false,
      "npkDemand": {
        "n": 80,
        "p": 40,
        "k": 40
      },
      "durationDays": "95-115 days",
      "baseYieldPerAcre": 11.0,
      "maxYieldPerAcre": 16.5,
      "minYieldPerAcre": 6.5,
      "costOfCultivationPerAcre": 9200,
      "currentPricePerQuintal": 3371,
      "msp": 3371,
      "historicalPrices": [
        3050,
        3120,
        3180,
        3240,
        3290,
        3340,
        3371,
        3390,
        3420,
        3450,
        3480,
        3510
      ],
      "priceForecast": {
        "trend": "Stable",
        "changePercent": 1.9,
        "advice": "High fodder and grain value keeps local market rates resilient."
      },
      "description": "Dual-purpose grain and nutritious cattle fodder crop suited for semi-arid zones.",
      "risks": "Shoot fly in early seedling stage; ear-head bug."
    },
    "sunflower": {
      "id": "sunflower",
      "name": "Sunflower (सूरजमुखी)",
      "nameHi": "सूरजमुखी",
      "category": "Oilseed",
      "icon": "🌻",
      "idealSeason": [
        "rabi",
        "zaid",
        "kharif"
      ],
      "soilTypes": [
        "black",
        "red",
        "alluvial"
      ],
      "phRange": [
        6.5,
        8.0
      ],
      "tempRange": [
        18,
        30
      ],
      "optTemp": 24,
      "rainfallRange": [
        400,
        600
      ],
      "waterRequirementMm": 450,
      "irrigationSensitive": false,
      "npkDemand": {
        "n": 60,
        "p": 60,
        "k": 40
      },
      "durationDays": "85-100 days",
      "baseYieldPerAcre": 7.2,
      "maxYieldPerAcre": 11.0,
      "minYieldPerAcre": 4.2,
      "costOfCultivationPerAcre": 11500,
      "currentPricePerQuintal": 6420,
      "msp": 6760,
      "historicalPrices": [
        5900,
        6050,
        6150,
        6280,
        6340,
        6390,
        6420,
        6450,
        6510,
        6560,
        6600,
        6650
      ],
      "priceForecast": {
        "trend": "Moderate Bullish",
        "changePercent": 2.5,
        "advice": "Healthy premium for pure expeller sunflower seed."
      },
      "description": "Photo-insensitive oilseed ideal for contingency planting and intercropping.",
      "risks": "Poor seed set if honeybee pollinators are scarce; head rot in humidity."
    },
    "pigeon_pea": {
      "id": "pigeon_pea",
      "name": "Pigeon Pea / Arhar / Tur (अरहर)",
      "nameHi": "अरहर / तुअर",
      "category": "Pulse / Legume",
      "icon": "🌿",
      "idealSeason": [
        "kharif"
      ],
      "soilTypes": [
        "black",
        "alluvial",
        "red"
      ],
      "phRange": [
        6.0,
        7.5
      ],
      "tempRange": [
        20,
        32
      ],
      "optTemp": 26,
      "rainfallRange": [
        550,
        800
      ],
      "waterRequirementMm": 600,
      "irrigationSensitive": false,
      "npkDemand": {
        "n": 25,
        "p": 50,
        "k": 30
      },
      "durationDays": "150-180 days",
      "baseYieldPerAcre": 6.8,
      "maxYieldPerAcre": 10.5,
      "minYieldPerAcre": 3.8,
      "costOfCultivationPerAcre": 13000,
      "currentPricePerQuintal": 9350,
      "msp": 7550,
      "historicalPrices": [
        7400,
        7650,
        8100,
        8500,
        8900,
        9200,
        9350,
        9500,
        9600,
        9450,
        9550,
        9700
      ],
      "priceForecast": {
        "trend": "Very Bullish",
        "changePercent": 5.8,
        "advice": "Tight supply balance sheet generates exceptional profit margins over MSP."
      },
      "description": "Deep-rooted, drought-tolerant pulse fixing heavy atmospheric nitrogen.",
      "risks": "Sterility mosaic virus; pod borer; seedling waterlogging."
    }
  },
  "soilProfiles": {
    "alluvial": {
      "id": "alluvial",
      "name": "Alluvial Soil (जलोढ़ मिट्टी)",
      "nameHi": "जलोढ़ मिट्टी",
      "description": "Rich loamy sediment deposited by rivers, high natural fertility, balanced sand-silt-clay ratio.",
      "typicalPh": 6.8,
      "drainage": "Good to Moderate",
      "waterRetention": "High",
      "typicalNPK": {
        "n": 160,
        "p": 45,
        "k": 180
      },
      "suitableCrops": [
        "wheat",
        "paddy",
        "maize",
        "mustard",
        "sugarcane",
        "potato",
        "onion"
      ]
    },
    "black": {
      "id": "black",
      "name": "Black Cotton Soil / Regur (काली मिट्टी)",
      "nameHi": "काली कपास मिट्टी (रेगुर)",
      "description": "Clayey, rich in montmorillonite, shrinks & cracks when dry, swells when wet, high moisture retention.",
      "typicalPh": 7.6,
      "drainage": "Slow / Heavy",
      "waterRetention": "Very High",
      "typicalNPK": {
        "n": 130,
        "p": 35,
        "k": 260
      },
      "suitableCrops": [
        "cotton",
        "soybean",
        "chickpea",
        "wheat",
        "sorghum",
        "pigeon_pea"
      ]
    },
    "red": {
      "id": "red",
      "name": "Red & Yellow Soil (लाल मिट्टी)",
      "nameHi": "लाल व पीली मिट्टी",
      "description": "Formed from crystalline igneous rocks, rich in iron oxide, porous, mildly acidic to neutral.",
      "typicalPh": 6.2,
      "drainage": "Rapid / Excessive",
      "waterRetention": "Moderate to Low",
      "typicalNPK": {
        "n": 120,
        "p": 30,
        "k": 140
      },
      "suitableCrops": [
        "groundnut",
        "maize",
        "pearl_millet",
        "tomato",
        "pigeon_pea",
        "sunflower"
      ]
    },
    "laterite": {
      "id": "laterite",
      "name": "Laterite Soil (लैटेराइट मिट्टी)",
      "nameHi": "लैटेराइट मिट्टी",
      "description": "Leached soil in high rainfall zones, rich in iron and aluminium, deficient in lime and silica.",
      "typicalPh": 5.4,
      "drainage": "Moderate",
      "waterRetention": "Low",
      "typicalNPK": {
        "n": 90,
        "p": 20,
        "k": 110
      },
      "suitableCrops": [
        "paddy",
        "groundnut",
        "maize",
        "tomato"
      ]
    },
    "sandy_loam": {
      "id": "sandy_loam",
      "name": "Sandy Loam / Arid (बलुई दोमट)",
      "nameHi": "बलुई दोमट / रेतीली",
      "description": "Coarse texture, high aeration and easy tillage, fast drainage, low organic matter.",
      "typicalPh": 7.2,
      "drainage": "Very Fast",
      "waterRetention": "Low",
      "typicalNPK": {
        "n": 100,
        "p": 35,
        "k": 130
      },
      "suitableCrops": [
        "pearl_millet",
        "mustard",
        "potato",
        "groundnut",
        "tomato",
        "onion"
      ]
    },
    "clayey_loam": {
      "id": "clayey_loam",
      "name": "Clayey Soil / Heavy Soil (चिकनी मिट्टी)",
      "nameHi": "चिकनी भारी मिट्टी",
      "description": "Fine particles, dense texture, excellent nutrient retention, prone to surface crusting.",
      "typicalPh": 7.0,
      "drainage": "Slow",
      "waterRetention": "High",
      "typicalNPK": {
        "n": 150,
        "p": 40,
        "k": 210
      },
      "suitableCrops": [
        "paddy",
        "wheat",
        "sugarcane",
        "sorghum",
        "soybean"
      ]
    }
  },
  "regionalMandis": {
    "Maharashtra": [
      {
        "name": "APMC Lasalgaon",
        "distKm": 35,
        "spread": "+3.5%",
        "status": "Active High Volume"
      },
      {
        "name": "APMC Nagpur",
        "distKm": 42,
        "spread": "+1.8%",
        "status": "Open"
      },
      {
        "name": "APMC Amravati",
        "distKm": 60,
        "spread": "+2.0%",
        "status": "Open"
      },
      {
        "name": "APMC Jalgaon",
        "distKm": 78,
        "spread": "-0.5%",
        "status": "Normal"
      }
    ],
    "Punjab": [
      {
        "name": "Khanna Grain Market",
        "distKm": 28,
        "spread": "+4.2%",
        "status": "Asia's Largest"
      },
      {
        "name": "APMC Ludhiana",
        "distKm": 45,
        "spread": "+2.5%",
        "status": "Open"
      },
      {
        "name": "APMC Jalandhar",
        "distKm": 62,
        "spread": "+1.0%",
        "status": "Open"
      },
      {
        "name": "APMC Bathinda",
        "distKm": 85,
        "spread": "+0.8%",
        "status": "Normal"
      }
    ],
    "Karnataka": [
      {
        "name": "APMC Hubballi",
        "distKm": 30,
        "spread": "+2.8%",
        "status": "Active Hub"
      },
      {
        "name": "APMC Davanagere",
        "distKm": 48,
        "spread": "+3.1%",
        "status": "Open"
      },
      {
        "name": "APMC Kolar",
        "distKm": 65,
        "spread": "+5.4%",
        "status": "Heavy Arrivals"
      },
      {
        "name": "APMC Belagavi",
        "distKm": 72,
        "spread": "+1.2%",
        "status": "Open"
      }
    ],
    "Madhya Pradesh": [
      {
        "name": "APMC Indore",
        "distKm": 25,
        "spread": "+3.8%",
        "status": "Soybean Hub"
      },
      {
        "name": "APMC Ujjain",
        "distKm": 55,
        "spread": "+2.1%",
        "status": "Open"
      },
      {
        "name": "APMC Sehore",
        "distKm": 68,
        "spread": "+1.5%",
        "status": "Open"
      },
      {
        "name": "APMC Harda",
        "distKm": 90,
        "spread": "+0.9%",
        "status": "Normal"
      }
    ],
    "Uttar Pradesh": [
      {
        "name": "APMC Agra",
        "distKm": 32,
        "spread": "+2.4%",
        "status": "Potato Hub"
      },
      {
        "name": "APMC Kanpur",
        "distKm": 40,
        "spread": "+1.9%",
        "status": "Open"
      },
      {
        "name": "APMC Meerut",
        "distKm": 58,
        "spread": "+2.7%",
        "status": "Sugarcane Belt"
      },
      {
        "name": "APMC Varanasi",
        "distKm": 80,
        "spread": "+1.0%",
        "status": "Open"
      }
    ],
    "Gujarat": [
      {
        "name": "APMC Rajkot",
        "distKm": 34,
        "spread": "+3.6%",
        "status": "Cotton & Groundnut Hub"
      },
      {
        "name": "APMC Gondal",
        "distKm": 45,
        "spread": "+4.0%",
        "status": "High Demand"
      },
      {
        "name": "APMC Unjha",
        "distKm": 70,
        "spread": "+5.2%",
        "status": "Spice & Seed Hub"
      },
      {
        "name": "APMC Surat",
        "distKm": 82,
        "spread": "+1.5%",
        "status": "Open"
      }
    ],
    "West Bengal": [
      {
        "name": "APMC Burdwan",
        "distKm": 30,
        "spread": "+2.9%",
        "status": "Rice Bowl"
      },
      {
        "name": "APMC Hooghly",
        "distKm": 48,
        "spread": "+3.4%",
        "status": "Potato Hub"
      },
      {
        "name": "APMC Siliguri",
        "distKm": 75,
        "spread": "+1.6%",
        "status": "Open"
      }
    ],
    "Rajasthan": [
      {
        "name": "APMC Alwar",
        "distKm": 35,
        "spread": "+3.2%",
        "status": "Mustard Capital"
      },
      {
        "name": "APMC Kota",
        "distKm": 50,
        "spread": "+2.8%",
        "status": "Soybean/Wheat Hub"
      },
      {
        "name": "APMC Bikaner",
        "distKm": 82,
        "spread": "+1.1%",
        "status": "Open"
      }
    ],
    "Andhra Pradesh / Telangana": [
      {
        "name": "APMC Guntur",
        "distKm": 28,
        "spread": "+4.5%",
        "status": "Commercial Hub"
      },
      {
        "name": "APMC Warangal",
        "distKm": 52,
        "spread": "+2.3%",
        "status": "Cotton Market"
      },
      {
        "name": "APMC Nizamabad",
        "distKm": 76,
        "spread": "+2.0%",
        "status": "Turmeric & Maize"
      }
    ]
  },
  "sampleFarms": [
    {
      "id": "farm_vidarbha",
      "name": "Vidarbha Cotton & Soybean Farm (Maharashtra)",
      "farmerName": "Ramesh Patil",
      "state": "Maharashtra",
      "area": 3.5,
      "areaUnit": "acres",
      "soilType": "black",
      "soilPh": 7.6,
      "nitrogen": 135,
      "phosphorus": 32,
      "potassium": 240,
      "season": "kharif",
      "avgTemp": 29,
      "rainfall": 720,
      "humidity": 68,
      "irrigation": "rainfed_borewell",
      "ureaUsedKg": 85,
      "dapUsedKg": 40,
      "mopUsedKg": 20,
      "compostTonnes": 2.0,
      "farmingMethod": "conventional"
    },
    {
      "id": "farm_punjab",
      "name": "Punjab Wheat & Paddy Farm (Punjab)",
      "farmerName": "Gurpreet Singh",
      "state": "Punjab",
      "area": 8.0,
      "areaUnit": "acres",
      "soilType": "alluvial",
      "soilPh": 7.0,
      "nitrogen": 180,
      "phosphorus": 55,
      "potassium": 190,
      "season": "rabi",
      "avgTemp": 18,
      "rainfall": 380,
      "humidity": 55,
      "irrigation": "canal",
      "ureaUsedKg": 120,
      "dapUsedKg": 60,
      "mopUsedKg": 35,
      "compostTonnes": 3.5,
      "farmingMethod": "precision"
    },
    {
      "id": "farm_karnataka",
      "name": "Karnataka Maize & Tomato Farm (Karnataka)",
      "farmerName": "Anil Kumar Gowda",
      "state": "Karnataka",
      "area": 4.0,
      "areaUnit": "acres",
      "soilType": "red",
      "soilPh": 6.4,
      "nitrogen": 140,
      "phosphorus": 45,
      "potassium": 155,
      "season": "kharif",
      "avgTemp": 26,
      "rainfall": 620,
      "humidity": 72,
      "irrigation": "drip",
      "ureaUsedKg": 90,
      "dapUsedKg": 50,
      "mopUsedKg": 45,
      "compostTonnes": 4.0,
      "farmingMethod": "precision"
    },
    {
      "id": "farm_rajasthan",
      "name": "Rajasthan Mustard & Bajra Farm (Rajasthan)",
      "farmerName": "Mohan Lal Meena",
      "state": "Rajasthan",
      "area": 5.0,
      "areaUnit": "acres",
      "soilType": "sandy_loam",
      "soilPh": 7.8,
      "nitrogen": 95,
      "phosphorus": 30,
      "potassium": 125,
      "season": "rabi",
      "avgTemp": 17,
      "rainfall": 280,
      "humidity": 45,
      "irrigation": "sprinkler",
      "ureaUsedKg": 70,
      "dapUsedKg": 35,
      "mopUsedKg": 20,
      "compostTonnes": 1.5,
      "farmingMethod": "conventional"
    }
  ]
};

if (typeof window !== "undefined") {
  window.AGRI_DATA = AGRI_DATA;
}
