/**
 * Crop Yield Predictor & What-If Sensitivity Simulator
 * Implements Liebig's Law of the Minimum and Mitscherlich-Baule nutrient-yield curves.
 */

const YieldPredictor = {
  /**
   * Predict crop yield and financial outcome
   * @param {string} cropId - Identifier of crop
   * @param {Object} input - Farm field parameters
   * @param {Object} whatIf - Sensitivity modifiers (optional)
   * @returns {Object} Comprehensive yield predictions and breakdown
   */
  predictYield: function(cropId, input, whatIf = {}) {
    if (!window.AGRI_DATA || !window.AGRI_DATA.crops[cropId]) {
      console.error("Invalid cropId:", cropId);
      return null;
    }

    const crop = window.AGRI_DATA.crops[cropId];

    // Inputs
    const area = parseFloat(input.area) || 1.0;
    const areaUnit = input.areaUnit || "acres";
    // Convert to standard acres for calculation
    let areaInAcres = area;
    if (areaUnit === "hectares") areaInAcres = area * 2.471;
    else if (areaUnit === "bigha") areaInAcres = area * 0.40;

    const soilType = input.soilType || "alluvial";
    const soilPh = parseFloat(input.soilPh) || 7.0;
    const soilN = parseFloat(input.nitrogen) || 120;
    const soilP = parseFloat(input.phosphorus) || 35;
    const soilK = parseFloat(input.potassium) || 150;

    const season = input.season || "kharif";
    const avgTemp = parseFloat(input.avgTemp) || 26;
    const rainfall = parseFloat(input.rainfall) || 600;
    const irrigation = input.irrigation || "rainfed_borewell";

    let ureaKg = parseFloat(input.ureaUsedKg) || 0;
    let dapKg = parseFloat(input.dapUsedKg) || 0;
    let mopKg = parseFloat(input.mopUsedKg) || 0;
    let compostTonnes = parseFloat(input.compostTonnes) || 0;
    const method = input.farmingMethod || "conventional";

    // Apply What-If adjustments if present
    const adjN = parseFloat(whatIf.adjN) || 0; // % change (-50 to +50)
    const adjP = parseFloat(whatIf.adjP) || 0;
    const adjK = parseFloat(whatIf.adjK) || 0;
    const adjIrrig = parseFloat(whatIf.adjIrrigation) || 0; // % upgrade
    const adjCompost = parseFloat(whatIf.adjCompost) || 0; // additional tonnes

    ureaKg = Math.max(0, ureaKg * (1 + adjN / 100));
    dapKg = Math.max(0, dapKg * (1 + adjP / 100));
    mopKg = Math.max(0, mopKg * (1 + adjK / 100));
    compostTonnes = Math.max(0, compostTonnes + adjCompost);

    // 1. Calculate applied nutrients (kg/ha equivalent)
    const appliedN = (ureaKg * 0.46 + dapKg * 0.18) * 2.47 + (compostTonnes * 12 * 2.47);
    const appliedP = (dapKg * 0.46) * 2.47 + (compostTonnes * 6 * 2.47);
    const appliedK = (mopKg * 0.60) * 2.47 + (compostTonnes * 10 * 2.47);

    const totalN = soilN + appliedN;
    const totalP = soilP + appliedP;
    const totalK = soilK + appliedK;

    const nRatio = totalN / crop.npkDemand.n;
    const pRatio = totalP / crop.npkDemand.p;
    const kRatio = totalK / crop.npkDemand.k;

    // Liebig's law of minimum response:
    // Yield factor based on Mitscherlich yield equation: 1 - 10^(-c*x)
    const fN = 1 - Math.pow(10, -1.2 * Math.min(1.5, nRatio));
    const fP = 1 - Math.pow(10, -1.3 * Math.min(1.5, pRatio));
    const fK = 1 - Math.pow(10, -1.1 * Math.min(1.5, kRatio));
    const nutrientFactor = (Math.min(fN, fP, fK) * 0.70 + ((fN + fP + fK) / 3) * 0.30);

    // 2. Soil & pH Modifier
    let soilModifier = crop.soilTypes.includes(soilType) ? 1.0 : 0.85;
    const [phMin, phMax] = crop.phRange;
    if (soilPh < phMin || soilPh > phMax) {
      const phDev = soilPh < phMin ? (phMin - soilPh) : (soilPh - phMax);
      soilModifier *= Math.max(0.70, 1.0 - (phDev * 0.12));
    }

    // 3. Water & Weather Modifier
    let effectiveWaterMm = rainfall;
    if (irrigation === "drip") effectiveWaterMm += 450 * (1 + adjIrrig / 100);
    else if (irrigation === "canal") effectiveWaterMm += 350 * (1 + adjIrrig / 100);
    else if (irrigation === "sprinkler") effectiveWaterMm += 300 * (1 + adjIrrig / 100);
    else if (irrigation === "rainfed_borewell") effectiveWaterMm += 180 * (1 + adjIrrig / 100);
    else effectiveWaterMm += (rainfall * (adjIrrig / 100));

    let waterModifier = 1.0;
    const reqMm = crop.waterRequirementMm;
    if (effectiveWaterMm < reqMm * 0.8) {
      const deficit = (reqMm * 0.8 - effectiveWaterMm) / reqMm;
      waterModifier = Math.max(0.60, 1.0 - deficit * 0.65);
      if (!crop.irrigationSensitive) waterModifier = Math.min(0.95, waterModifier + 0.12);
    } else if (effectiveWaterMm > reqMm * 1.6) {
      waterModifier = 0.88; // excessive moisture penalty
    } else {
      waterModifier = 1.04; // optimal moisture bonus
    }

    // 4. Method & Compost Bonus
    let methodBonus = method === "precision" ? 1.08 : 1.0;
    let compostBonus = Math.min(1.8, compostTonnes * 0.35); // up to +1.8 Quintals from humus

    // 5. Final Yield Computation
    let predictedYieldPerAcre = (crop.baseYieldPerAcre * nutrientFactor * soilModifier * waterModifier * methodBonus) + compostBonus;
    // Bound within biological bounds
    predictedYieldPerAcre = Math.max(crop.minYieldPerAcre, Math.min(crop.maxYieldPerAcre * 1.15, predictedYieldPerAcre));
    predictedYieldPerAcre = Math.round(predictedYieldPerAcre * 10) / 10;

    // Confidence interval (+- 7%)
    const confidenceMargin = Math.round(predictedYieldPerAcre * 0.07 * 10) / 10;
    const lowerYield = Math.round((predictedYieldPerAcre - confidenceMargin) * 10) / 10;
    const upperYield = Math.round((predictedYieldPerAcre + confidenceMargin) * 10) / 10;

    // Total farm yield
    const totalYieldQuintals = Math.round(predictedYieldPerAcre * areaInAcres * 10) / 10;
    const totalYieldTonnes = Math.round((totalYieldQuintals * 0.10) * 10) / 10;

    // 6. Financial Projections
    const modalPrice = crop.currentPricePerQuintal;
    const grossRevenue = Math.round(totalYieldQuintals * modalPrice);
    const fertilizerCost = Math.round((ureaKg * 6.5 + dapKg * 27.0 + mopKg * 34.0 + compostTonnes * 1200) * areaInAcres);
    const totalCostOfCultivation = Math.round((crop.costOfCultivationPerAcre * areaInAcres) + (fertilizerCost * 0.4));
    const netProfit = Math.round(grossRevenue - totalCostOfCultivation);
    const roiPercent = Math.round((netProfit / totalCostOfCultivation) * 100);

    // 7. Identify Primary Limiting Nutrient / Factor
    let limitingNutrientEn = "";
    let limitingNutrientHi = "";
    let recommendationEn = "";
    let recommendationHi = "";

    const ratios = [
      { name: "Nitrogen (यूरिया)", ratio: nRatio, type: "N" },
      { name: "Phosphorus (डीएपी)", ratio: pRatio, type: "P" },
      { name: "Potassium (पोटाश)", ratio: kRatio, type: "K" }
    ];
    ratios.sort((a, b) => a.ratio - b.ratio);

    if (waterModifier < 0.85) {
      limitingNutrientEn = "Moisture / Irrigation Deficit";
      limitingNutrientHi = "पानी व सिंचाई की कमी";
      recommendationEn = "Water availability is capping yield. Installing drip or supplementary irrigation can increase yield by 15-20%.";
      recommendationHi = "पानी की कमी पैदावार सीमित कर रही है। ड्रिप या पूरक सिंचाई से उपज में १५-२०% वृद्धि संभव है।";
    } else if (ratios[0].ratio < 0.85) {
      const lim = ratios[0];
      limitingNutrientEn = `${lim.name} Deficiency (${Math.round(lim.ratio * 100)}% of ideal)`;
      limitingNutrientHi = `${lim.name} की कमी (आवश्यकता का मात्र ${Math.round(lim.ratio * 100)}%)`;
      if (lim.type === "N") {
        recommendationEn = "Nitrogen is the primary bottleneck. Increase Urea split application at 30 days after sowing.";
        recommendationHi = "नाइट्रोजन मुख्य बाधा है। बुवाई के ३० दिन बाद यूरिया की अतिरिक्त खुराक दें।";
      } else if (lim.type === "P") {
        recommendationEn = "Phosphorus deficit limits root vigor. Apply 20-30 kg/acre DAP as basal dose during land preparation.";
        recommendationHi = "फास्फोरस की कमी से जड़ें कमजोर हैं। जुताई के समय २०-३० किग्रा/एकड़ DAP दें।";
      } else {
        recommendationEn = "Potassium is low. Apply MOP (Potash) to enhance grain filling, pest resistance, and crop weight.";
        recommendationHi = "पोटाश की कमी है। दानों में चमक, वजन और रोग प्रतिरोधक क्षमता बढ़ाने हेतु MOP खाद दें।";
      }
    } else {
      limitingNutrientEn = "Balanced Nutrient Profile (No Major Limiter)";
      limitingNutrientHi = "संतुलित पोषक तत्व (कोई बड़ी कमी नहीं)";
      recommendationEn = "Your nutrient levels are well balanced. Maintain current split application schedule for peak yield.";
      recommendationHi = "आपके खेत में पोषक तत्व संतुलित हैं। अधिकतम पैदावार हेतु अनुशंसित समय पर खाद दें।";
    }

    // 8. Generate Fertilizer Application Schedule
    const schedule = [
      {
        stageEn: "Basal Dose (At Sowing / Field Prep)",
        stageHi: "बुवाई के समय (बेसल खुराक)",
        urea: Math.round(ureaKg * 0.25),
        dap: Math.round(dapKg * 1.0),
        mop: Math.round(mopKg * 0.50),
        compost: compostTonnes,
        noteEn: "Mix full DAP, half Potash, and organic compost into the root zone.",
        noteHi: "पूरा DAP, आधा पोटाश और पूरी गोबर खाद खेत की तैयारी में मिलाएं।"
      },
      {
        stageEn: "Vegetative Growth (25 - 35 Days)",
        stageHi: "वानस्पतिक बढ़वार (२५-३५ दिन)",
        urea: Math.round(ureaKg * 0.50),
        dap: 0,
        mop: 0,
        compost: 0,
        noteEn: "Top-dress half of Urea after first weeding or irrigation.",
        noteHi: "पहली निराई-गुड़ाई या सिंचाई के बाद ५०% यूरिया का छिड़काव करें।"
      },
      {
        stageEn: "Flowering / Grain Formation (55 - 70 Days)",
        stageHi: "फूल व दाना बनते समय (५५-७० दिन)",
        urea: Math.round(ureaKg * 0.25),
        dap: 0,
        mop: Math.round(mopKg * 0.50),
        compost: 0,
        noteEn: "Apply remaining Urea and Potash to maximize seed weight and grain density.",
        noteHi: "शेष यूरिया और पोटाश दें ताकि दाने सुडौल और वजनदार बनें।"
      }
    ];

    return {
      cropId: cropId,
      crop: crop,
      areaInAcres: areaInAcres,
      predictedYieldPerAcre: predictedYieldPerAcre,
      lowerYield: lowerYield,
      upperYield: upperYield,
      totalYieldQuintals: totalYieldQuintals,
      totalYieldTonnes: totalYieldTonnes,
      grossRevenue: grossRevenue,
      totalCostOfCultivation: totalCostOfCultivation,
      netProfit: netProfit,
      roiPercent: roiPercent,
      limitingNutrientEn: limitingNutrientEn,
      limitingNutrientHi: limitingNutrientHi,
      recommendationEn: recommendationEn,
      recommendationHi: recommendationHi,
      schedule: schedule
    };
  }
};

if (typeof window !== "undefined") {
  window.YieldPredictor = YieldPredictor;
}
