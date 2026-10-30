export type Language = 'en' | 'hi' | 'pa' | 'es';

export interface Translations {
  appName: string;
  appSubtitle: string;
  badgeModel: string;
  badgeDataset: string;
  badgeAccuracy: string;
  heroHeadline: string;
  heroSub: string;
  nav: {
    scanner: string;
    voiceAssistant: string;
    library: string;
    chat: string;
    specs: string;
    scanBtn: string;
  };
  camera: {
    title: string;
    frameSize: string;
    standbyTitle: string;
    standbyDesc: string;
    openCamera: string;
    uploadPhoto: string;
    captureBtn: string;
    closeCamera: string;
    reticleGuide: string;
    benchmarks: string;
    oneClick: string;
    analyzing: string;
    analyzingSub: string;
    readyNotice: string;
  };
  result: {
    classificationTag: string;
    confidenceTag: string;
    listenAudio: string;
    audioPlaying: string;
    stopAudio: string;
    uncertaintyNotice: string;
    scoutAdvised: string;
    langSelect: string;
    telemetryTitle: string;
    scientificName: string;
    biologicalAgent: string;
    severityIndex: string;
    engine: string;
    tabs: {
      treatment: string;
      symptoms: string;
      probabilities: string;
      prevention: string;
    };
    quarantineTitle: string;
    organicTitle: string;
    chemicalTitle: string;
    symptomsTitle: string;
    weatherTitle: string;
    preventionTitle: string;
    askAdvisor: string;
    consultPrompt: string;
  };
  voice: {
    title: string;
    subtitle: string;
    tapToSpeak: string;
    listening: string;
    processing: string;
    stopListening: string;
    stopAudio: string;
    speakInstruction: string;
    replayAudio: string;
    speechNotSupported: string;
    quickPromptsTitle: string;
    micPermissionNotice: string;
  };
  library: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    classesCount: string;
    allCrops: string;
  };
  history: {
    title: string;
    clear: string;
    noHistory: string;
  };
  footer: {
    systemTag: string;
    cuTag: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: "AgroVision AI",
    appSubtitle: "AI-Powered Crop Disease Detection System",
    badgeModel: "MobileNetV2 Transfer Learning",
    badgeDataset: "PlantVillage 38 Classes",
    badgeAccuracy: "98.2% Validation Accuracy",
    heroHeadline: "Real-Time Crop Pathology & Treatment Advisory",
    heroSub: "Camera leaf scanning, deep learning classification, confidence estimation, and actionable field guidance.",
    nav: {
      scanner: "Leaf Scanner & Camera",
      voiceAssistant: "Voice Assistant",
      library: "PlantVillage Library",
      chat: "Agronomist Chat",
      specs: "Project Specs",
      scanBtn: "Scan Plant",
    },
    camera: {
      title: "Leaf Viewfinder & Sensor Feed",
      frameSize: "224×224 Neural Frame",
      standbyTitle: "Camera Standby",
      standbyDesc: "Launch real-time camera inspection, upload a field photo, or select a pre-loaded crop leaf sample below.",
      openCamera: "Open Live Camera",
      uploadPhoto: "Upload Photo",
      captureBtn: "Capture & Diagnose",
      closeCamera: "Close Camera",
      reticleGuide: "Align infected leaf within the reticle",
      benchmarks: "Or Test Instant Benchmark Samples (PlantVillage Dataset)",
      oneClick: "1-click test",
      analyzing: "MobileNetV2 Inference",
      analyzingSub: "Extracting feature maps & computing softmax probabilities...",
      readyNotice: "Image Ready for Analysis",
    },
    result: {
      classificationTag: "Classification Result",
      confidenceTag: "Prediction Confidence",
      listenAudio: "Listen Diagnosis (Voice)",
      audioPlaying: "Playing Audio...",
      stopAudio: "Stop Audio",
      uncertaintyNotice: "Uncertainty Notice (<70% threshold): Confidence is below the definitive threshold. Inspect leaf underside, verify lighting, or re-capture closer to the lesion.",
      scoutAdvised: "Scout Inspection Advised",
      langSelect: "Regional Advisory Language:",
      telemetryTitle: "Diagnostic Telemetry",
      scientificName: "Scientific Name",
      biologicalAgent: "Biological Agent",
      severityIndex: "Severity Index",
      engine: "Inference Engine",
      tabs: {
        treatment: "Management & Advisory",
        symptoms: "Symptoms & Weather",
        probabilities: "Softmax Distribution",
        prevention: "Field Prevention",
      },
      quarantineTitle: "Immediate Field Quarantine Steps",
      organicTitle: "Organic & Biological Advisory",
      chemicalTitle: "Chemical Advisory & Exact Dosage",
      symptomsTitle: "Pathological Symptoms Observed",
      weatherTitle: "Microclimate & Weather Sensitivity",
      preventionTitle: "Long-Term Cultural & Agronomic Prevention",
      askAdvisor: "Ask Voice Assistant",
      consultPrompt: "Need specific spraying timetable or tank mixing advice?",
    },
    voice: {
      title: "Krishi Voice Mitra (Voice Assistant)",
      subtitle: "Speak in Hindi or English for instant spoken agronomic advice & spray dosage instructions.",
      tapToSpeak: "Tap to Speak (Mic)",
      listening: "Listening... Speak now",
      processing: "Consulting Agronomist & Generating Voice...",
      stopListening: "Stop Recording",
      stopAudio: "Stop Audio",
      speakInstruction: "Tap the mic and ask any question about crop diseases, sprays, dosage, or timing.",
      replayAudio: "Replay Spoken Audio",
      speechNotSupported: "Speech recognition not natively supported on this browser. Type below or use one-click prompts.",
      quickPromptsTitle: "Quick Spoken Questions (Click to Ask)",
      micPermissionNotice: "Microphone permission is required to speak.",
    },
    library: {
      title: "PlantVillage Pathological Reference Library",
      subtitle: "Verified crop pathology standards, symptom taxonomy, and management protocols from 38 benchmark classes.",
      searchPlaceholder: "Search by crop, disease, or pathogen (e.g. Phytophthora, Late Blight)...",
      classesCount: "Classes Shown",
      allCrops: "All Crops",
    },
    history: {
      title: "Recent Field Scans",
      clear: "Clear History",
      noHistory: "No scans recorded yet.",
    },
    footer: {
      systemTag: "PlantVillage Dataset · MobileNetV2 Vision Core",
      cuTag: "Chandigarh University · MCA(AIML) Capstone Project",
    },
  },

  hi: {
    appName: "एग्रोविज़न एआई",
    appSubtitle: "एआई-संचालित फसल रोग पहचान एवं निदान प्रणाली",
    badgeModel: "मोबाइलनेट-वी2 ट्रांसफर लर्निंग",
    badgeDataset: "प्लांटविलेज 38 फसल वर्ग",
    badgeAccuracy: "98.2% सत्यापन सटीकता",
    heroHeadline: "रीयल-टाइम फसल रोग निदान एवं कृषि उपचार परामर्श",
    heroSub: "कैमरे से पत्ती स्कैन करें, कृत्रिम बुद्धिमत्ता से रोग पहचानें, और सटीक उपचार व छिड़काव मात्रा जानें।",
    nav: {
      scanner: "पत्ती स्कैनर व कैमरा",
      voiceAssistant: "कृषि वॉयस मित्र (बोलकर पूछें)",
      library: "रोग निर्देशिका (लाइब्रेरी)",
      chat: "कृषि विशेषज्ञ चैट",
      specs: "मॉडल विवरण",
      scanBtn: "फसल स्कैन करें",
    },
    camera: {
      title: "पत्ती व्यूफाइंडर व लाइव सेंसर",
      frameSize: "224×224 न्यूरल इनपुट फ्रेम",
      standbyTitle: "कैमरा स्टैंडबाय मोड",
      standbyDesc: "लाइव कैमरा शुरू करें, खेत से फोटो अपलोड करें, या नीचे दिए गए 1-क्लिक परीक्षण नमूने चुनें।",
      openCamera: "लाइव कैमरा चालू करें",
      uploadPhoto: "गैलरी से फोटो चुनें",
      captureBtn: "फोटो खींचें व रोग पहचानें",
      closeCamera: "कैमरा बंद करें",
      reticleGuide: "रोगग्रस्त पत्ती को चौकोर फ्रेम के बीच में रखें",
      benchmarks: "या 1-क्लिक परीक्षण नमूने चुनें (प्लांटविलेज डेटासेट)",
      oneClick: "1-क्लिक टेस्ट",
      analyzing: "एआई मॉडल जांच कर रहा है...",
      analyzingSub: "पत्ती के धब्बों और फफूंद का विश्लेषण व सटीकता गणना जारी है...",
      readyNotice: "फोटो विश्लेषण के लिए तैयार है",
    },
    result: {
      classificationTag: "रोग पहचान परिणाम",
      confidenceTag: "पहचान सटीकता",
      listenAudio: "रोग निदान बोलकर सुनें (वॉयस)",
      audioPlaying: "ऑडियो बज रहा है...",
      stopAudio: "ऑडियो बंद करें",
      uncertaintyNotice: "अनिश्चितता सूचना (<70% स्तर): फोटो स्पष्ट नहीं है। पत्ती के नीचे जांचें या अच्छी रोशनी में नजदीक से दोबारा फोटो लें।",
      scoutAdvised: "खेत में प्रत्यक्ष निरीक्षण आवश्यक",
      langSelect: "परामर्श भाषा:",
      telemetryTitle: "रोग वैज्ञानिक विवरण",
      scientificName: "वैज्ञानिक नाम (रोगजनक)",
      biologicalAgent: "रोग का प्रकार",
      severityIndex: "रोग की गंभीरता",
      engine: "पहचान इंजन",
      tabs: {
        treatment: "उपचार व दवा छिड़काव",
        symptoms: "रोग लक्षण व मौसम",
        probabilities: "संभाव्यता स्कोर (Softmax)",
        prevention: "खेत रोकथाम उपाय",
      },
      quarantineTitle: "तुरंत करने योग्य आपातकालीन कदम",
      organicTitle: "जैविक व प्राकृतिक उपचार",
      chemicalTitle: "रासायनिक दवा व सही छिड़काव मात्रा",
      symptomsTitle: "पत्ती पर दिखे प्रमुख लक्षण",
      weatherTitle: "मौसम व आर्द्रता का प्रभाव",
      preventionTitle: "भविष्य में रोग से बचाव के कृषि नियम",
      askAdvisor: "वॉयस असिस्टेंट से पूछें",
      consultPrompt: "छिड़काव के समय या दवा मिलाने के बारे में सवाल है?",
    },
    voice: {
      title: "कृषि वॉयस मित्र (Voice Assistant)",
      subtitle: "हिन्दी में बोलकर पूछें — तुरंत बोलकर दवा की मात्रा, छिड़काव का सही समय व रोकथाम की सलाह पाएं।",
      tapToSpeak: "बोलने के लिए माइक दबाएं (Tap to Speak)",
      listening: "सुन रहे हैं... अब बोलिए",
      processing: "कृषि सलाह व आवाज तैयार हो रही है...",
      stopListening: "रिकॉर्डिंग रोकें",
      stopAudio: "ऑडियो बंद करें",
      speakInstruction: "माइक दबाकर अपनी फसल, रोग, दवा की मात्रा या मौसम के बारे में कुछ भी पूछें।",
      replayAudio: "दोबारा सुनें (Replay Audio)",
      speechNotSupported: "इस ब्राउज़र में सीधे बोलना समर्थित नहीं है। नीचे टाइप करें या दिए गए सवालों पर क्लिक करें।",
      quickPromptsTitle: "अक्सर पूछे जाने वाले सवाल (क्लिक करें)",
      micPermissionNotice: "बोलने के लिए माइक्रोफ़ोन की अनुमति आवश्यक है।",
    },
    library: {
      title: "प्लांटविलेज 38 फसल रोग निर्देशिका",
      subtitle: "टमाटर, मक्का, अंगूर, आलू आदि 38 मानक फसल रोगों के लक्षण, पहचान व उपचार संग्रह।",
      searchPlaceholder: "फसल या रोग का नाम खोजें (जैसे: टमाटर झुलसा, फफूंद, ब्लाइट)...",
      classesCount: "प्रदर्शित रोग",
      allCrops: "सभी फसलें",
    },
    history: {
      title: "हाल ही में किए गए स्कैन",
      clear: "इतिहास मिटाएं",
      noHistory: "अभी तक कोई स्कैन नहीं किया गया है।",
    },
    footer: {
      systemTag: "प्लांटविलेज डेटासेट · मोबाइलनेट-वी2 विज़न कोर",
      cuTag: "चंडीगढ़ विश्वविद्यालय · एमसीए (एआईएमएल) प्रोजेक्ट",
    },
  },

  pa: {
    appName: "ਐਗਰੋਵਿਜ਼ਨ ਏਆਈ",
    appSubtitle: "ਏਆਈ-ਅਧਾਰਤ ਫਸਲ ਰੋਗ ਪਛਾਣ ਪ੍ਰਣਾਲੀ",
    badgeModel: "ਮੋਬਾਈਲਨੈੱਟ-ਵੀ2 ਟ੍ਰਾਂਸਫਰ ਲਰਨਿੰਗ",
    badgeDataset: "ਪਲਾਂਟਵਿਲੇਜ 38 ਫਸਲ ਸ਼੍ਰੇਣੀਆਂ",
    badgeAccuracy: "98.2% ਸ਼ੁੱਧਤਾ",
    heroHeadline: "ਰੀਅਲ-ਟਾਈਮ ਫਸਲ ਬਿਮਾਰੀ ਨਿਦਾਨ ਅਤੇ ਸਲਾਹ",
    heroSub: "ਕੈਮਰੇ ਨਾਲ ਪੱਤਾ ਸਕੈਨ ਕਰੋ, ਬਿਮਾਰੀ ਪਛਾਣੋ, ਅਤੇ ਸਹੀ ਦਵਾਈ ਤੇ ਰੋਕਥਾਮ ਜਾਣੋ।",
    nav: {
      scanner: "ਪੱਤਾ ਸਕੈਨਰ ਅਤੇ ਕੈਮਰਾ",
      voiceAssistant: "ਕ੍ਰਿਸ਼ੀ ਵੌਇਸ ਅਸਿਸਟੈਂਟ",
      library: "ਬਿਮਾਰੀ ਲਾਇਬ੍ਰੇਰੀ",
      chat: "ਖੇਤੀ ਮਾਹਿਰ ਚੈਟ",
      specs: "ਪ੍ਰੋਜੈਕਟ ਵੇਰਵਾ",
      scanBtn: "ਫਸਲ ਸਕੈਨ ਕਰੋ",
    },
    camera: {
      title: "ਪੱਤਾ ਵਿਊਫਾਈਂਡਰ ਅਤੇ ਲਾਈਵ ਸੈਂਸਰ",
      frameSize: "224×224 ਨਿਊਰਲ ਫਰੇਮ",
      standbyTitle: "ਕੈਮਰਾ ਸਟੈਂਡਬਾਏ",
      standbyDesc: "ਲਾਈਵ ਕੈਮਰਾ ਚਾਲੂ ਕਰੋ, ਖੇਤ ਵਿੱਚੋਂ ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ, ਜਾਂ ਨਮੂਨੇ ਚੁਣੋ।",
      openCamera: "ਕੈਮਰਾ ਚਾਲੂ ਕਰੋ",
      uploadPhoto: "ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ",
      captureBtn: "ਫੋਟੋ ਖਿੱਚੋ ਅਤੇ ਜਾਂਚ ਕਰੋ",
      closeCamera: "ਕੈਮਰਾ ਬੰਦ ਕਰੋ",
      reticleGuide: "ਬਿਮਾਰ ਪੱਤੇ ਨੂੰ ਫਰੇਮ ਦੇ ਵਿਚਕਾਰ ਰੱਖੋ",
      benchmarks: "ਜਾਂ ਤੁਰੰਤ 1-ਕਲਿੱਕ ਟੈਸਟ ਨਮੂਨੇ ਚੁਣੋ",
      oneClick: "1-ਕਲਿੱਕ ਟੈਸਟ",
      analyzing: "ਏਆਈ ਜਾਂਚ ਕਰ ਰਿਹਾ ਹੈ...",
      analyzingSub: "ਪੱਤੇ ਦੇ ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਜਾਰੀ ਹੈ...",
      readyNotice: "ਫੋਟੋ ਤਿਆਰ ਹੈ",
    },
    result: {
      classificationTag: "ਬਿਮਾਰੀ ਪਛਾਣ ਨਤੀਜਾ",
      confidenceTag: "ਸ਼ੁੱਧਤਾ ਸਕੋਰ",
      listenAudio: "ਬੋਲ ਕੇ ਸੁਣੋ (ਵੌਇਸ)",
      audioPlaying: "ਆਡੀਓ ਚੱਲ ਰਹੀ ਹੈ...",
      stopAudio: "ਆਡੀਓ ਰੋਕੋ",
      uncertaintyNotice: "ਅਨਿਸ਼ਚਿਤਤਾ ਚੇਤਾਵਨੀ (<70%): ਫੋਟੋ ਸਾਫ਼ ਨਹੀਂ ਹੈ। ਦੁਬਾਰਾ ਨੇੜਿਓਂ ਫੋਟੋ ਲਵੋ।",
      scoutAdvised: "ਖੇਤ ਜਾਂਚ ਦੀ ਸਲਾਹ",
      langSelect: "ਸਲਾਹ ਭਾਸ਼ਾ:",
      telemetryTitle: "ਵਿਗਿਆਨਕ ਵੇਰਵਾ",
      scientificName: "ਵਿਗਿਆਨਕ ਨਾਂ",
      biologicalAgent: "ਬਿਮਾਰੀ ਦੀ ਕਿਸਮ",
      severityIndex: "ਗੰਭੀਰਤਾ",
      engine: "ਇੰਜਣ",
      tabs: {
        treatment: "ਇਲਾਜ ਅਤੇ ਦਵਾਈ",
        symptoms: "ਲੱਛਣ ਅਤੇ ਮੌਸਮ",
        probabilities: "ਸੰਭਾਵਨਾ ਵੰਡ",
        prevention: "ਖੇਤ ਰੋਕਥਾਮ",
      },
      quarantineTitle: "ਤੁਰੰਤ ਚੁੱਕਣ ਵਾਲੇ ਕਦਮ",
      organicTitle: "ਜੈਵਿਕ ਇਲਾਜ",
      chemicalTitle: "ਕੈਮੀਕਲ ਦਵਾਈ ਅਤੇ ਸਹੀ ਮਾਤਰਾ",
      symptomsTitle: "ਪੱਤੇ ਉੱਤੇ ਦੇਖੇ ਗਏ ਲੱਛਣ",
      weatherTitle: "ਮੌਸਮ ਦਾ ਅਸਰ",
      preventionTitle: "ਲੰਬੇ ਸਮੇਂ ਦੀ ਰੋਕਥਾਮ ਦੇ ਨਿਯਮ",
      askAdvisor: "ਵੌਇਸ ਅਸਿਸਟੈਂਟ ਨੂੰ ਪੁੱਛੋ",
      consultPrompt: "ਛਿੜਕਾਅ ਬਾਰੇ ਹੋਰ ਜਾਣਕਾਰੀ ਚਾਹੀਦੀ ਹੈ?",
    },
    voice: {
      title: "ਕ੍ਰਿਸ਼ੀ ਵੌਇਸ ਮਿੱਤਰ (Voice Assistant)",
      subtitle: "ਪੰਜਾਬੀ ਜਾਂ ਹਿੰਦੀ ਵਿੱਚ ਬੋਲ ਕੇ ਪੁੱਛੋ — ਤੁਰੰਤ ਆਡੀਓ ਸਲਾਹ ਅਤੇ ਦਵਾਈ ਦੀ ਮਾਤਰਾ ਸੁਣੋ।",
      tapToSpeak: "ਬੋਲਣ ਲਈ ਮਾਈਕ ਦਬਾਓ",
      listening: "ਸੁਣ ਰਹੇ ਹਾਂ... ਹੁਣ ਬੋਲੋ",
      processing: "ਸਲਾਹ ਤਿਆਰ ਹੋ ਰਹੀ ਹੈ...",
      stopListening: "ਰਿਕਾਰਡਿੰਗ ਰੋਕੋ",
      stopAudio: "ਆਡੀਓ ਰੋਕੋ",
      speakInstruction: "ਮਾਈਕ ਦਬਾ ਕੇ ਫਸਲ ਦੀ ਬਿਮਾਰੀ ਜਾਂ ਛਿੜਕਾਅ ਬਾਰੇ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛੋ।",
      replayAudio: "ਦੁਬਾਰਾ ਸੁਣੋ",
      speechNotSupported: "ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਬੋਲਣਾ ਸਮਰਥਿਤ ਨਹੀਂ ਹੈ। ਹੇਠਾਂ ਟਾਈਪ ਕਰੋ।",
      quickPromptsTitle: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ",
      micPermissionNotice: "ਬੋਲਣ ਲਈ ਮਾਈਕ੍ਰੋਫੋਨ ਦੀ ਇਜਾਜ਼ਤ ਲਾਜ਼ਮੀ ਹੈ।",
    },
    library: {
      title: "ਪਲਾਂਟਵਿਲੇਜ ਫਸਲ ਬਿਮਾਰੀ ਲਾਇਬ੍ਰੇਰੀ",
      subtitle: "38 ਮਿਆਰੀ ਫਸਲ ਬਿਮਾਰੀਆਂ ਦੇ ਲੱਛਣ, ਪਛਾਣ ਅਤੇ ਇਲਾਜ।",
      searchPlaceholder: "ਫਸਲ ਜਾਂ ਬਿਮਾਰੀ ਖੋਜੋ...",
      classesCount: "ਦਿਖਾਈਆਂ ਸ਼੍ਰੇਣੀਆਂ",
      allCrops: "ਸਾਰੀਆਂ ਫਸਲਾਂ",
    },
    history: {
      title: "ਹਾਲੀਆ ਸਕੈਨ",
      clear: "ਮਿਟਾਓ",
      noHistory: "ਕੋਈ ਸਕੈਨ ਰਿਕਾਰਡ ਨਹੀਂ ਹੈ।",
    },
    footer: {
      systemTag: "ਪਲਾਂਟਵਿਲੇਜ ਡੇਟਾਸੈਟ · ਮੋਬਾਈਲਨੈੱਟ-ਵੀ2",
      cuTag: "ਚੰਡੀਗੜ੍ਹ ਯੂਨੀਵਰਸਿਟੀ · ਐਮਸੀਏ (ਏਆਈਐਮਐਲ)",
    },
  },

  es: {
    appName: "AgroVision AI",
    appSubtitle: "Sistema de Detección de Enfermedades de Cultivos con IA",
    badgeModel: "MobileNetV2 Transfer Learning",
    badgeDataset: "PlantVillage 38 Clases",
    badgeAccuracy: "98.2% de Precisión",
    heroHeadline: "Diagnóstico Patológico y Tratamiento Agronómico en Tiempo Real",
    heroSub: "Escaneo de hojas con cámara, clasificación por aprendizaje profundo y guía agronómica.",
    nav: {
      scanner: "Escáner y Cámara",
      voiceAssistant: "Asistente de Voz",
      library: "Biblioteca PlantVillage",
      chat: "Chat Agronómico",
      specs: "Especificaciones",
      scanBtn: "Escanear Planta",
    },
    camera: {
      title: "Visor de Hoja y Sensor en Vivo",
      frameSize: "Cuadro Neural 224×224",
      standbyTitle: "Cámara en Espera",
      standbyDesc: "Inicie la cámara en vivo, suba una foto del campo o seleccione una muestra de prueba.",
      openCamera: "Abrir Cámara en Vivo",
      uploadPhoto: "Subir Foto",
      captureBtn: "Capturar y Diagnosticar",
      closeCamera: "Cerrar Cámara",
      reticleGuide: "Alinee la hoja infectada dentro del retículo",
      benchmarks: "O Pruebe Muestras de Referencia (PlantVillage)",
      oneClick: "Prueba 1-clic",
      analyzing: "Inferencia MobileNetV2...",
      analyzingSub: "Extrayendo mapas de características y calculando probabilidades...",
      readyNotice: "Imagen Lista para Análisis",
    },
    result: {
      classificationTag: "Resultado de Clasificación",
      confidenceTag: "Confianza de Predicción",
      listenAudio: "Escuchar Diagnóstico (Voz)",
      audioPlaying: "Reproduciendo audio...",
      stopAudio: "Detener Audio",
      uncertaintyNotice: "Aviso de Incertidumbre (<70% umbral): La confianza está por debajo del umbral definitivo. Inspeccione el envés de la hoja o capture nuevamente con mejor iluminación.",
      scoutAdvised: "Inspección de Campo Aconsejada",
      langSelect: "Idioma del Informe:",
      telemetryTitle: "Telemetría Diagnóstica",
      scientificName: "Nombre Científico",
      biologicalAgent: "Agente Biológico",
      severityIndex: "Índice de Severidad",
      engine: "Motor de Inferencia",
      tabs: {
        treatment: "Manejo y Tratamiento",
        symptoms: "Síntomas y Clima",
        probabilities: "Distribución Softmax",
        prevention: "Prevención en Campo",
      },
      quarantineTitle: "Medidas Inmediatas de Cuarentena",
      organicTitle: "Asesoramiento Orgánico y Biológico",
      chemicalTitle: "Tratamiento Químico y Dosis Exacta",
      symptomsTitle: "Síntomas Patológicos Observados",
      weatherTitle: "Sensibilidad Climática",
      preventionTitle: "Prevención Cultural a Largo Plazo",
      askAdvisor: "Preguntar al Asistente de Voz",
      consultPrompt: "¿Necesita horarios específicos de aplicación o mezclas?",
    },
    voice: {
      title: "Asistente de Voz Agronómico",
      subtitle: "Hable para recibir asesoramiento agronómico por voz sobre dosis y prevención.",
      tapToSpeak: "Tocar para Hablar (Micrófono)",
      listening: "Escuchando... Hable ahora",
      processing: "Consultando y Generando Audio...",
      stopListening: "Detener Grabación",
      stopAudio: "Detener Audio",
      speakInstruction: "Toque el micrófono y pregunte sobre enfermedades, tratamientos y dosis.",
      replayAudio: "Repetir Audio",
      speechNotSupported: "Reconocimiento de voz no soportado en este navegador. Escriba abajo.",
      quickPromptsTitle: "Preguntas Frecuentes por Voz",
      micPermissionNotice: "Se requiere permiso de micrófono para hablar.",
    },
    library: {
      title: "Biblioteca de Referencia PlantVillage",
      subtitle: "Estándares de patología vegetal y protocolos de manejo de 38 clases.",
      searchPlaceholder: "Buscar por cultivo o enfermedad...",
      classesCount: "Clases Mostradas",
      allCrops: "Todos los Cultivos",
    },
    history: {
      title: "Escaneos Recientes",
      clear: "Borrar Historial",
      noHistory: "No hay escaneos registrados aún.",
    },
    footer: {
      systemTag: "PlantVillage Dataset · MobileNetV2 Vision Core",
      cuTag: "Universidad de Chandigarh · MCA(AIML)",
    },
  },
};
