/**
 * Human-Centered Agronomic Crop Recommendation Engine
 * Evaluates multi-factor compatibility: Soil, Climate, Nutrients, and Market Viability.
 */

const RecommendationEngine = {
  /**
   * Main recommendation function
   * @param {Object} input - Farmer input parameters
   * @returns {Array} Ranked list of crop recommendations
   */
  evaluateAllCrops: function(input) {
    if (!window.AGRI_DATA || !window.AGRI_DATA.crops) {
      console.error("AGRI_DATA not found");
      return [];
    }

    const crops = window.AGRI_DATA.crops;
    const results = [];

    // Parse input fields with safe defaults
    const soilType = input.soilType || "alluvial";
    const soilPh = parseFloat(input.soilPh) || 7.0;
    const soilN = parseFloat(input.nitrogen) || 120;
    const soilP = parseFloat(input.phosphorus) || 35;
    const soilK = parseFloat(input.potassium) || 150;
    
    const season = input.season || "kharif";
    const avgTemp = parseFloat(input.avgTemp) || 26;
    const rainfall = parseFloat(input.rainfall) || 600;
    const humidity = parseFloat(input.humidity) || 60;
    const irrigation = input.irrigation || "rainfed_borewell";
    
    const ureaKg = parseFloat(input.ureaUsedKg) || 0;
    const dapKg = parseFloat(input.dapUsedKg) || 0;
    const mopKg = parseFloat(input.mopUsedKg) || 0;
    const compostTonnes = parseFloat(input.compostTonnes) || 0;

    // Calculate effective nutrient supply in kg/ha
    // 1 acre = 0.4047 ha => multiplier for kg/acre to kg/ha is approx 2.47
    const appliedN = (ureaKg * 0.46 + dapKg * 0.18) * 2.47 + (compostTonnes * 12 * 2.47);
    const appliedP = (dapKg * 0.46) * 2.47 + (compostTonnes * 6 * 2.47);
    const appliedK = (mopKg * 0.60) * 2.47 + (compostTonnes * 10 * 2.47);

    const totalN = soilN + appliedN;
    const totalP = soilP + appliedP;
    const totalK = soilK + appliedK;

    // Calculate effective moisture (rainfall + irrigation allowance)
    let irrigationBonusMm = 0;
    if (irrigation === "drip") irrigationBonusMm = 450;
    else if (irrigation === "canal") irrigationBonusMm = 350;
    else if (irrigation === "sprinkler") irrigationBonusMm = 300;
    else if (irrigation === "rainfed_borewell") irrigationBonusMm = 180;
    else irrigationBonusMm = 0; // pure rainfed

    const effectiveWaterMm = rainfall + irrigationBonusMm;

    for (let key in crops) {
      const crop = crops[key];

      // 1. Soil Suitability (0 - 100)
      let soilScore = 0;
      const isTextureMatch = crop.soilTypes.includes(soilType);
      const textureScore = isTextureMatch ? 100 : 45;

      // pH factor
      let phScore = 100;
      const [phMin, phMax] = crop.phRange;
      if (soilPh >= phMin && soilPh <= phMax) {
        phScore = 100;
      } else {
        const phDiff = soilPh < phMin ? (phMin - soilPh) : (soilPh - phMax);
        phScore = Math.max(20, 100 - (phDiff * 40));
      }
      soilScore = Math.round(textureScore * 0.65 + phScore * 0.35);

      // 2. Climate & Season Suitability (0 - 100)
      let seasonScore = crop.idealSeason.includes(season) ? 100 : 35;

      // Temperature score
      let tempScore = 100;
      const [tMin, tMax] = crop.tempRange;
      if (avgTemp >= tMin && avgTemp <= tMax) {
        const tempDeviation = Math.abs(avgTemp - crop.optTemp);
        tempScore = Math.max(60, 100 - (tempDeviation * 4));
      } else {
        const tDiff = avgTemp < tMin ? (tMin - avgTemp) : (avgTemp - tMax);
        tempScore = Math.max(15, 60 - (tDiff * 12));
      }

      // Water score
      let waterScore = 100;
      const waterReq = crop.waterRequirementMm;
      if (effectiveWaterMm >= waterReq * 0.85 && effectiveWaterMm <= waterReq * 1.5) {
        waterScore = 98;
      } else if (effectiveWaterMm < waterReq * 0.85) {
        // Water deficit
        const deficitRatio = effectiveWaterMm / (waterReq * 0.85);
        waterScore = Math.max(20, deficitRatio * 90);
        if (!crop.irrigationSensitive) {
          waterScore = Math.min(85, waterScore + 15); // Drought hardy bonus
        }
      } else {
        // Excess water / flood risk
        const excessRatio = (effectiveWaterMm - waterReq * 1.5) / waterReq;
        waterScore = Math.max(30, 95 - (excessRatio * 50));
      }

      const climateScore = Math.round(seasonScore * 0.35 + tempScore * 0.35 + waterScore * 0.30);

      // 3. Nutrient Adequacy Score (0 - 100)
      const nRatio = Math.min(1.2, totalN / crop.npkDemand.n);
      const pRatio = Math.min(1.2, totalP / crop.npkDemand.p);
      const kRatio = Math.min(1.2, totalK / crop.npkDemand.k);

      // Liebig's Law of the minimum
      const minRatio = Math.min(nRatio, pRatio, kRatio);
      const avgRatio = (nRatio + pRatio + kRatio) / 3;
      const nutrientScore = Math.round(Math.min(100, (minRatio * 0.6 + avgRatio * 0.4) * 95));

      // 4. Market & Economic Return Score (0 - 100)
      const estGrossAcre = crop.baseYieldPerAcre * crop.currentPricePerQuintal;
      const estNetProfitAcre = estGrossAcre - crop.costOfCultivationPerAcre;
      // Normalize profit from 5k to 150k
      const profitNorm = Math.min(100, Math.max(30, (estNetProfitAcre / 80000) * 100));
      const marketScore = Math.round(profitNorm);

      // 5. Total Weighted Suitability Score
      const totalScore = Math.round(
        soilScore * 0.30 +
        climateScore * 0.32 +
        nutrientScore * 0.23 +
        marketScore * 0.15
      );

      // Generate badge
      let badge = "Suitable Choice";
      let badgeHi = "उपयुक्त फसल";
      if (totalScore >= 90) {
        badge = "🏆 Top Agronomic Match";
        badgeHi = "🏆 सर्वश्रेष्ठ अनुशंसित";
      } else if (!crop.irrigationSensitive && effectiveWaterMm < 600) {
        badge = "💧 Drought Resilient";
        badgeHi = "💧 कम पानी में सक्षम";
      } else if (estNetProfitAcre > 40000) {
        badge = "📈 High Market Return";
        badgeHi = "📈 उच्च बाजार मुनाफा";
      } else if (crop.category.includes("Legume") || crop.category.includes("Pulse")) {
        badge = "🌱 Soil Rejuvenator";
        badgeHi = "🌱 मिट्टी सुधारक दलहन";
      }

      // Plain language reasoning
      let reasoningEn = "";
      let reasoningHi = "";
      if (isTextureMatch && soilPh >= phMin && soilPh <= phMax) {
        reasoningEn = `Your ${window.AGRI_DATA.soilProfiles[soilType]?.name.split(' (')[0]} and pH (${soilPh}) offer prime biological conditions for ${crop.name.split(' (')[0]}.`;
        reasoningHi = `आपकी ${window.AGRI_DATA.soilProfiles[soilType]?.nameHi} और मिट्टी का pH (${soilPh}) इस फसल के लिए सर्वोत्तम है।`;
      } else if (!isTextureMatch) {
        reasoningEn = `Requires soil conditioning as ${crop.name.split(' (')[0]} typically performs best in ${crop.soilTypes.join(', ')} soils.`;
        reasoningHi = `यह फसल आमतौर पर ${crop.soilTypes.join(', ')} मिट्टी में बेहतर उपज देती है, अतिरिक्त जैविक खाद की आवश्यकता होगी।`;
      } else {
        reasoningEn = `Good climatic match for ${season} season with an expected duration of ${crop.durationDays}.`;
        reasoningHi = `${season} मौसम के लिए अनुकूल चक्र (${crop.durationDays}), पैदावार की अच्छी संभावना।`;
      }

      results.push({
        cropId: crop.id,
        crop: crop,
        suitabilityScore: totalScore,
        soilScore: soilScore,
        climateScore: climateScore,
        nutrientScore: nutrientScore,
        marketScore: marketScore,
        badge: badge,
        badgeHi: badgeHi,
        estYieldAcre: crop.baseYieldPerAcre,
        estGrossAcre: estGrossAcre,
        estNetProfitAcre: estNetProfitAcre,
        reasoningEn: reasoningEn,
        reasoningHi: reasoningHi,
        risks: crop.risks
      });
    }

    // Sort descending by suitability score
    results.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
    return results;
  }
};

if (typeof window !== "undefined") {
  window.RecommendationEngine = RecommendationEngine;
}
