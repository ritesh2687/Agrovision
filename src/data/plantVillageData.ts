export interface DiseaseRecord {
  id: string;
  crop: string;
  condition: string;
  scientificName: string;
  canonicalClass: string;
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Oomycete' | 'Healthy' | 'Pest';
  description: string;
  symptoms: string[];
  organicTreatment: string;
  chemicalTreatment: string;
  preventativeMeasures: string[];
  favorableWeather: string;
  severityRisk: 'Low' | 'Moderate' | 'High' | 'Severe';
  typicalLossPercent: string;
}

export interface FieldSample {
  id: string;
  crop: string;
  condition: string;
  severity: string;
  sampleType: 'disease' | 'healthy';
  previewColor: string;
  description: string;
  svgBadge: string;
  svgMarkup: string;
}

export const DISEASE_RECORDS: DiseaseRecord[] = [
  {
    id: "tomato-late-blight",
    crop: "Tomato",
    condition: "Late Blight",
    scientificName: "Phytophthora infestans",
    canonicalClass: "Tomato___Late_blight",
    pathogenType: "Oomycete",
    description: "One of the most destructive agricultural diseases globally, capable of decimating tomato and potato canopies within 7-10 days under humid conditions.",
    symptoms: [
      "Water-soaked pale green or brown lesions on leaves",
      "Delicate white fungal-like mildew on leaflet undersides in damp weather",
      "Dark brown petiole and stem girdling lesions",
      "Firm, rough brown rot on green or ripe tomato fruit"
    ],
    organicTreatment: "Copper octanoate, Bordeaux mixture (1% w/v), or bio-fungicide containing Bacillus subtilis / Trichoderma viride.",
    chemicalTreatment: "Curative spray with Metalaxyl-M + Mancozeb (Ridomil Gold 2.5 g/L) or Cymoxanil (Curzate M8 2.0 g/L).",
    preventativeMeasures: [
      "Avoid planting adjacent to potato fields",
      "Install drip irrigation to prevent foliar wetting",
      "Ensure 60cm row spacing to facilitate morning leaf drying",
      "Destroy volunteer tomatoes and infected solanaceous culls"
    ],
    favorableWeather: "Temperatures 15°C - 22°C paired with relative humidity > 90% and continuous rain or heavy dew.",
    severityRisk: "Severe",
    typicalLossPercent: "50% - 100% if unchecked"
  },
  {
    id: "tomato-early-blight",
    crop: "Tomato",
    condition: "Early Blight",
    scientificName: "Alternaria solani",
    canonicalClass: "Tomato___Early_blight",
    pathogenType: "Fungal",
    description: "Common foliar disease marked by characteristic concentric target-board rings, typically initiating on older lower leaves.",
    symptoms: [
      "Brown to black circular or irregular leaf spots with concentric target-like rings",
      "Surrounding yellow (chlorotic) halos around spots",
      "Lower canopy defoliation progressing upward",
      "Sunscald vulnerability on exposed developing fruit"
    ],
    organicTreatment: "Copper hydroxide or Neem oil (0.5%) combined with potassium bicarbonate (3 g/L).",
    chemicalTreatment: "Chlorothalonil (Bravo 720) at 2.0 mL/L or Mancozeb 75% WP at 2.5 g/L at 7-10 day intervals.",
    preventativeMeasures: [
      "Mulch beds with straw or plastic to block rain splash from soil spores",
      "Rotate out of solanaceous crops for minimum 2-3 years",
      "Stake and prune lower 30cm of foliage from soil surface"
    ],
    favorableWeather: "Warm temperatures (24°C - 29°C) with alternating wet periods and heavy dew.",
    severityRisk: "Moderate",
    typicalLossPercent: "20% - 40%"
  },
  {
    id: "grape-black-rot",
    crop: "Grape",
    condition: "Black Rot",
    scientificName: "Guignardia bidwellii",
    canonicalClass: "Grape___Black_rot",
    pathogenType: "Fungal",
    description: "Severe viticultural fungal pathogen causing reddish-brown leaf spots and complete berry shriveling into hard black mummies.",
    symptoms: [
      "Small circular tan spots on upper leaf surfaces bordered by dark brown rings",
      "Tiny black specks (pycnidia) arranged in a neat ring inside leaf spots",
      "Shoot lesions that appear elongated and sunken",
      "Berries turn brown, soften, and shrivel into black wrinkled mummies"
    ],
    organicTreatment: "Fixed copper or lime sulfur dormant sprays applied prior to bud swell and during shoot emergence.",
    chemicalTreatment: "Myclobutanil (Rally 40WSP) or Tebuconazole (Folicur) applied from pre-bloom through 4-5 weeks post-bloom.",
    preventativeMeasures: [
      "Canopy management for maximum air circulation and solar exposure",
      "Thorough dormant sanitation: remove and burn all berry mummies",
      "Mow vineyard floor vegetation short to decrease humidity"
    ],
    favorableWeather: "Persistent rain at temperatures 21°C - 27°C with >6 hours of continuous vine wetness.",
    severityRisk: "High",
    typicalLossPercent: "30% - 80%"
  },
  {
    id: "corn-northern-leaf-blight",
    crop: "Corn (Maize)",
    condition: "Northern Leaf Blight",
    scientificName: "Exserohilum turcicum",
    canonicalClass: "Corn_(maize)___Northern_Leaf_Blight",
    pathogenType: "Fungal",
    description: "Major cereal pathogen causing elongated cigar-shaped blighted necrotic areas on maize leaves, greatly diminishing photosynthesis.",
    symptoms: [
      "Long, elliptical, grayish-green or tan lesions (2.5 - 15 cm long)",
      "Lesions run parallel with leaf margins",
      "Dark olive to black spore masses developing inside lesions in damp mornings",
      "Extensive leaf firing and premature canopy death"
    ],
    organicTreatment: "Bacillus amyloliquefaciens bio-fungicide combined with micronutrient foliar zinc/silicon sprays.",
    chemicalTreatment: "Azoxystrobin + Difenoconazole (Amistar Top) at 1.0 mL/L or Pyraclostrobin (Headline) at VT tasseling stage.",
    preventativeMeasures: [
      "Plant hybrid corn varieties possessing single-gene (Ht) or polygenic resistance",
      "Rotate with soybeans, wheat, or alfalfa",
      "Tillage management to bury crop residue and break fungal life cycle"
    ],
    favorableWeather: "Moderate temperatures (18°C - 27°C) accompanied by heavy dews, frequent rain, and overcast skies.",
    severityRisk: "High",
    typicalLossPercent: "30% - 50%"
  },
  {
    id: "apple-scab",
    crop: "Apple",
    condition: "Apple Scab",
    scientificName: "Venturia inaequalis",
    canonicalClass: "Apple___Apple_scab",
    pathogenType: "Fungal",
    description: "The most prevalent apple disease worldwide, causing dark olive-green velvety lesions on leaves and corky scabs on fruit.",
    symptoms: [
      "Olive-green to dull brown velvety spots on leaf surfaces",
      "Distorted, cupped, or curled leaf margins around lesions",
      "Premature summer defoliation causing tree stress",
      "Corky, cracked brownish-black scabs on developing apple skin"
    ],
    organicTreatment: "Liquid lime sulfur or potassium bicarbonate applied immediately following primary spring infection rains.",
    chemicalTreatment: "Captan 50WP (2.5 g/L) or Mancozeb protective sprays; Difenoconazole (Score) for curative action.",
    preventativeMeasures: [
      "Shred or flail-mow fallen autumn leaves and apply 5% urea spray to speed leaf breakdown",
      "Plant scab-resistant cultivars (e.g. Liberty, Enterprise, Prima)",
      "Prune orchard trees annually for open canopy aeration"
    ],
    favorableWeather: "Continuous leaf wetness for 9-18 hours at spring temperatures between 12°C and 24°C.",
    severityRisk: "Moderate",
    typicalLossPercent: "25% - 70%"
  },
  {
    id: "potato-early-blight",
    crop: "Potato",
    condition: "Early Blight",
    scientificName: "Alternaria solani",
    canonicalClass: "Potato___Early_blight",
    pathogenType: "Fungal",
    description: "Fungal disease targeting senescing lower leaves in maturing potato stands, reducing tuber bulking and total marketable yield.",
    symptoms: [
      "Dark brown to black angular or circular spots on lower foliage",
      "Concentric ridges creating a target appearance",
      "Leaves turn yellow and drop prematurely",
      "Dark, sunken, dry rot lesions on tuber surface"
    ],
    organicTreatment: "Copper hydroxide spray or Trichoderma harzianum bio-agent every 7-10 days.",
    chemicalTreatment: "Mancozeb 75% WP (2.5 g/L) or Azoxystrobin (1.0 mL/L) at first sign of lower canopy spots.",
    preventativeMeasures: [
      "Maintain adequate nitrogen and potassium fertility throughout tuber initiation",
      "Avoid overhead irrigation in late evening",
      "Harvest tubers only after vine kill and skin set have hardened"
    ],
    favorableWeather: "Warm temperatures (24°C - 30°C) with alternating dry and wet leaf conditions.",
    severityRisk: "Moderate",
    typicalLossPercent: "15% - 35%"
  },
  {
    id: "pepper-bacterial-spot",
    crop: "Bell Pepper",
    condition: "Bacterial Spot",
    scientificName: "Xanthomonas campestris pv. vesicatoria",
    canonicalClass: "Pepper,_bell___Bacterial_spot",
    pathogenType: "Bacterial",
    description: "Destructive bacterial infection causing small water-soaked spots, severe leaf drop, and blister-like fruit blemishes in peppers.",
    symptoms: [
      "Small, angular, water-soaked translucent spots on leaf undersides",
      "Spots turn purplish-brown with necrotic centers",
      "Leaves turn chlorotic and rapidly defoliate",
      "Rough, raised, warty lesions on pepper pods"
    ],
    organicTreatment: "Fixed copper bactericide tank-mixed with Bacillus amyloliquefaciens (Serenade ASO).",
    chemicalTreatment: "Copper hydroxide (Kocide) + Mancozeb (co-application significantly improves bacterial suppression).",
    preventativeMeasures: [
      "Use certified pathogen-free seeds treated with hot water (50°C for 25 min)",
      "Avoid working in pepper fields when foliage is wet",
      "Drip irrigate and sanitize greenhouse staking equipment"
    ],
    favorableWeather: "High rainfall, driving wind, high humidity, and warm temperatures (24°C - 32°C).",
    severityRisk: "High",
    typicalLossPercent: "20% - 50%"
  },
  {
    id: "tomato-healthy",
    crop: "Tomato",
    condition: "Healthy Foliage",
    scientificName: "Solanum lycopersicum",
    canonicalClass: "Tomato___healthy",
    pathogenType: "Healthy",
    description: "Vigorous, unblemished tomato foliage exhibiting robust chlorophyll density, uniform vein morphology, and zero pathogenic lesions.",
    symptoms: [
      "Uniform deep green leaf color",
      "Smooth, intact leaf margins without necrotic edges",
      "Turgid petiole structure with optimal photosynthetic posture",
      "Absence of fungal pustules, chlorotic halos, or bacterial ooze"
    ],
    organicTreatment: "Routine preventative seaweed extract or compost tea foliar spray to bolster plant immunity.",
    chemicalTreatment: "No synthetic chemicals needed. Maintain balanced N-P-K and calcium nutrition.",
    preventativeMeasures: [
      "Scout lower leaves weekly for early insect or fungal vectors",
      "Maintain mulch layer to isolate foliage from soil splash",
      "Regulate drip irrigation to avoid waterlogged root zones"
    ],
    favorableWeather: "Sunny, well-ventilated days with moderate humidity (50-70%).",
    severityRisk: "Low",
    typicalLossPercent: "0% (Optimal Yield)"
  }
];

// Helper to generate a detailed botanical SVG data URL for instant 1-click testing
export function generateLeafSvgDataUrl(type: 'late-blight' | 'corn-blight' | 'grape-rot' | 'healthy-tomato'): string {
  let innerElements = '';

  if (type === 'late-blight') {
    // Tomato Leaf with water-soaked necrotic lesions and chlorotic halos
    innerElements = `
      <g id="leaf-stem">
        <path d="M 112 215 C 112 180 112 140 112 25" stroke="#2D5A27" stroke-width="4" stroke-linecap="round" fill="none" />
      </g>
      <!-- Base Leaf Shape -->
      <path d="M 112 30 C 70 65 35 110 40 155 C 44 190 75 208 112 215 C 149 208 180 190 184 155 C 189 110 154 65 112 30 Z" fill="#3A7D34" stroke="#265C22" stroke-width="2" />
      <!-- Veins -->
      <path d="M 112 60 Q 80 85 55 100 M 112 95 Q 75 120 50 140 M 112 130 Q 80 150 62 175" stroke="#2D5A27" stroke-width="1.8" fill="none" />
      <path d="M 112 60 Q 144 85 169 100 M 112 95 Q 149 120 174 140 M 112 130 Q 144 150 162 175" stroke="#2D5A27" stroke-width="1.8" fill="none" />
      <!-- Late Blight Lesion 1 (Upper left) -->
      <circle cx="80" cy="85" r="22" fill="#D4D700" opacity="0.45" />
      <path d="M 72 75 C 85 70 95 82 90 95 C 80 102 65 98 70 85 Z" fill="#3D2914" opacity="0.88" />
      <circle cx="80" cy="87" r="8" fill="#1C1309" opacity="0.9" />
      <path d="M 74 83 Q 80 88 84 84" stroke="#FFFFFF" stroke-width="1" opacity="0.7" fill="none" />
      <!-- Late Blight Lesion 2 (Lower right edge) -->
      <circle cx="145" cy="140" r="28" fill="#CCD59E" opacity="0.5" />
      <path d="M 135 125 C 160 120 172 140 165 160 C 150 168 130 155 135 135 Z" fill="#2E1F0F" opacity="0.92" />
      <ellipse cx="148" cy="145" rx="14" ry="10" fill="#150D06" />
      <circle cx="152" cy="142" r="3" fill="#EAEAEA" opacity="0.75" />
      <!-- Small satellite spots -->
      <circle cx="95" cy="145" r="7" fill="#4A3419" />
      <circle cx="95" cy="145" r="11" stroke="#D4A373" stroke-width="1" fill="none" opacity="0.6" />
    `;
  } else if (type === 'corn-blight') {
    // Corn Leaf with long cigar-shaped lesions
    innerElements = `
      <!-- Long Corn Leaf -->
      <path d="M 112 15 C 80 50 65 110 70 170 C 72 205 90 220 112 224 C 134 220 152 205 154 170 C 159 110 144 50 112 15 Z" fill="#4B8B3B" stroke="#336327" stroke-width="2" />
      <!-- Parallel veins -->
      <line x1="112" y1="15" x2="112" y2="224" stroke="#7CB342" stroke-width="2.5" />
      <line x1="98" y1="35" x2="98" y2="210" stroke="#5E9A34" stroke-width="1.2" />
      <line x1="85" y1="65" x2="85" y2="195" stroke="#5E9A34" stroke-width="1.2" />
      <line x1="126" y1="35" x2="126" y2="210" stroke="#5E9A34" stroke-width="1.2" />
      <line x1="139" y1="65" x2="139" y2="195" stroke="#5E9A34" stroke-width="1.2" />
      <!-- Cigar-shaped Lesion 1 -->
      <ellipse cx="98" cy="100" rx="11" ry="38" fill="#D9C5A0" stroke="#8C6D46" stroke-width="1.5" transform="rotate(-4 98 100)" />
      <ellipse cx="98" cy="100" rx="6" ry="24" fill="#5E4324" opacity="0.85" />
      <!-- Cigar-shaped Lesion 2 -->
      <ellipse cx="125" cy="145" rx="9" ry="32" fill="#E0D2B4" stroke="#8C6D46" stroke-width="1.5" transform="rotate(3 125 145)" />
      <ellipse cx="125" cy="145" rx="5" ry="18" fill="#422E17" opacity="0.85" />
    `;
  } else if (type === 'grape-rot') {
    // Grape leaf with circular brown spots and pycnidia
    innerElements = `
      <!-- Palmate Grape Leaf -->
      <path d="M 112 30 C 95 38 75 40 60 55 C 50 68 55 90 40 105 C 32 120 40 140 50 160 C 70 178 90 190 112 210 C 134 190 154 178 174 160 C 184 140 192 120 184 105 C 169 90 174 68 164 55 C 149 40 129 38 112 30 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="2" />
      <!-- Palmate Veins -->
      <path d="M 112 180 L 112 45 M 112 180 L 60 75 M 112 180 L 45 125 M 112 180 L 164 75 M 112 180 L 179 125" stroke="#4CAF50" stroke-width="1.8" fill="none" />
      <!-- Circular Black Rot Spots -->
      <circle cx="80" cy="110" r="14" fill="#8D5B4C" stroke="#4E271D" stroke-width="1.8" />
      <circle cx="80" cy="110" r="4" fill="#1C100C" />
      <!-- Tiny pycnidia dots in ring -->
      <circle cx="76" cy="107" r="1" fill="#000" /><circle cx="84" cy="107" r="1" fill="#000" />
      <circle cx="80" cy="115" r="1" fill="#000" /><circle cx="75" cy="113" r="1" fill="#000" />
      <circle cx="85" cy="113" r="1" fill="#000" />
      <!-- Spot 2 -->
      <circle cx="140" cy="95" r="12" fill="#9E6B5A" stroke="#4E271D" stroke-width="1.5" />
      <circle cx="140" cy="95" r="3" fill="#1C100C" />
      <!-- Spot 3 -->
      <circle cx="120" cy="140" r="10" fill="#7D4B3C" stroke="#3D1E15" stroke-width="1.5" />
    `;
  } else {
    // Healthy Tomato Leaf
    innerElements = `
      <path d="M 112 215 C 112 180 112 140 112 25" stroke="#2E7D32" stroke-width="3.5" stroke-linecap="round" fill="none" />
      <path d="M 112 30 C 72 65 40 110 44 155 C 48 190 76 208 112 215 C 148 208 176 190 180 155 C 184 110 152 65 112 30 Z" fill="#388E3C" stroke="#1B5E20" stroke-width="2" />
      <!-- Intact Veins -->
      <path d="M 112 60 Q 80 85 55 100 M 112 95 Q 75 120 50 140 M 112 130 Q 80 150 62 175" stroke="#4CAF50" stroke-width="1.8" fill="none" />
      <path d="M 112 60 Q 144 85 169 100 M 112 95 Q 149 120 174 140 M 112 130 Q 144 150 162 175" stroke="#4CAF50" stroke-width="1.8" fill="none" />
      <!-- Subtle glossy highlight -->
      <path d="M 95 65 C 105 85 105 130 92 165" stroke="#81C784" stroke-width="3" stroke-linecap="round" opacity="0.35" fill="none" />
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224 224" width="224" height="224">
    <rect width="224" height="224" fill="#F8FAFC" rx="12" />
    <!-- 224x224 PlantVillage neural bounding grid indicator -->
    <rect x="8" y="8" width="208" height="208" fill="none" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4 4" rx="8" />
    ${innerElements}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const FIELD_SAMPLES: FieldSample[] = [
  {
    id: "sample-tomato-late-blight",
    crop: "Tomato",
    condition: "Late Blight",
    severity: "Severe",
    sampleType: "disease",
    previewColor: "#78350F",
    description: "Water-soaked brown oily lesions with advancing chlorotic halo margins",
    svgBadge: "Phytophthora infestans",
    svgMarkup: generateLeafSvgDataUrl('late-blight')
  },
  {
    id: "sample-corn-blight",
    crop: "Corn (Maize)",
    condition: "Northern Leaf Blight",
    severity: "Moderate",
    sampleType: "disease",
    previewColor: "#92400E",
    description: "Cigar-shaped grayish-tan necrotic lesions running along parallel leaf veins",
    svgBadge: "Exserohilum turcicum",
    svgMarkup: generateLeafSvgDataUrl('corn-blight')
  },
  {
    id: "sample-grape-black-rot",
    crop: "Grape",
    condition: "Black Rot",
    severity: "Moderate",
    sampleType: "disease",
    previewColor: "#581C87",
    description: "Discrete circular reddish-brown necrotic spots with black pycnidia rings",
    svgBadge: "Guignardia bidwellii",
    svgMarkup: generateLeafSvgDataUrl('grape-rot')
  },
  {
    id: "sample-tomato-healthy",
    crop: "Tomato",
    condition: "Healthy Foliage",
    severity: "None",
    sampleType: "healthy",
    previewColor: "#166534",
    description: "Uniform emerald chlorophyll distribution, clean margin morphology, no pathogens",
    svgBadge: "Solanum lycopersicum",
    svgMarkup: generateLeafSvgDataUrl('healthy-tomato')
  }
];
