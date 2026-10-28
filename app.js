/**
 * AgroSense AI - Main Application Controller
 * Handles user interactions, reactivity, Chart.js integrations, bilingual switching, and audio readout.
 */

(function() {
  "use strict";

  const state = {
    activeCropId: "cotton",
    activeTab: "farm-setup",
    farmerInput: {
      state: "Maharashtra",
      area: 3.5,
      areaUnit: "acres",
      soilType: "black",
      soilPh: 7.6,
      nitrogen: 135,
      phosphorus: 32,
      potassium: 240,
      season: "kharif",
      avgTemp: 29,
      rainfall: 720,
      humidity: 68,
      irrigation: "rainfed_borewell",
      ureaUsedKg: 85,
      dapUsedKg: 40,
      mopUsedKg: 20,
      compostTonnes: 2.0,
      farmingMethod: "conventional"
    },
    whatIf: {
      adjN: 0,
      adjP: 0,
      adjK: 0,
      adjIrrigation: 0,
      adjCompost: 0
    },
    recommendations: [],
    yieldResult: null,
    marketResult: null,
    isSpeaking: false
  };

  function init() {
    bindTabs();
    bindPresets();
    bindFormInputs();
    bindWhatIfSliders();
    bindLanguageSwitcher();
    bindAudioReader();
    bindPrintButton();

    loadInitialPreset();
    recalculateAll();
  }

  function bindTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        switchTab(targetTab);
      });
    });
  }

  function switchTab(tabId) {
    state.activeTab = tabId;
    document.querySelectorAll(".tab-btn").forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-tab") === tabId);
    });
    document.querySelectorAll(".tab-pane").forEach(p => {
      p.classList.toggle("active", p.id === `tab-${tabId}`);
    });

    if (tabId === "market-intel" && state.marketResult) {
      setTimeout(() => {
        if (window.MarketIntel) {
          window.MarketIntel.renderCharts(state.marketResult);
        }
      }, 50);
    }
    if (tabId === "report") {
      renderAdvisoryReport();
    }
  }

  function bindPresets() {
    const presetSelect = document.getElementById("farmPresetSelect");
    if (!presetSelect || !window.AGRI_DATA) return;

    window.AGRI_DATA.sampleFarms.forEach(f => {
      const opt = document.createElement("option");
      opt.value = f.id;
      opt.textContent = `${f.name} - ${f.farmerName}`;
      presetSelect.appendChild(opt);
    });

    presetSelect.addEventListener("change", (e) => {
      const selectedId = e.target.value;
      if (selectedId && selectedId !== "custom") {
        const farm = window.AGRI_DATA.sampleFarms.find(f => f.id === selectedId);
        if (farm) {
          populateForm(farm);
          recalculateAll();
        }
      }
    });
  }

  function loadInitialPreset() {
    const defaultFarm = window.AGRI_DATA.sampleFarms[0];
    if (defaultFarm) {
      populateForm(defaultFarm);
      const presetSelect = document.getElementById("farmPresetSelect");
      if (presetSelect) presetSelect.value = defaultFarm.id;
    }
  }

  function populateForm(data) {
    state.farmerInput = Object.assign({}, data);
    for (let key in state.farmerInput) {
      const el = document.getElementById(`input_${key}`);
      if (el) {
        el.value = state.farmerInput[key];
        const valBadge = document.getElementById(`badge_${key}`);
        if (valBadge) valBadge.textContent = el.value;
      }
    }
    resetWhatIfSliders();
  }

  function bindFormInputs() {
    const form = document.getElementById("farmDataForm");
    if (!form) return;

    const inputs = form.querySelectorAll("input, select");
    inputs.forEach(input => {
      const fieldId = input.id.replace("input_", "");

      if (input.type === "range") {
        input.addEventListener("input", () => {
          const badge = document.getElementById(`badge_${fieldId}`);
          if (badge) badge.textContent = input.value;
        });
      }

      input.addEventListener("change", () => {
        state.farmerInput[fieldId] = input.type === "number" || input.type === "range" ? parseFloat(input.value) : input.value;
        const presetSelect = document.getElementById("farmPresetSelect");
        if (presetSelect) presetSelect.value = "custom";
        recalculateAll();
      });
    });

    const btnReset = document.getElementById("btnResetForm");
    if (btnReset) {
      btnReset.addEventListener("click", (e) => {
        e.preventDefault();
        loadInitialPreset();
        recalculateAll();
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      recalculateAll();
      const recSec = document.getElementById("recommendationsContainer");
      if (recSec) recSec.scrollIntoView({ behavior: "smooth" });
    });
  }

  function bindWhatIfSliders() {
    const sliderKeys = ["adjN", "adjP", "adjK", "adjIrrigation", "adjCompost"];
    sliderKeys.forEach(key => {
      const slider = document.getElementById(`slider_${key}`);
      const badge = document.getElementById(`val_${key}`);
      if (!slider) return;

      slider.addEventListener("input", () => {
        state.whatIf[key] = parseFloat(slider.value);
        if (badge) {
          const prefix = slider.value > 0 ? "+" : "";
          const unit = key === "adjCompost" ? " T/Acre" : "%";
          badge.textContent = `${prefix}${slider.value}${unit}`;
        }
        updateYieldPredictions();
      });
    });

    const btnResetWhatIf = document.getElementById("btnResetWhatIf");
    if (btnResetWhatIf) {
      btnResetWhatIf.addEventListener("click", () => {
        resetWhatIfSliders();
        updateYieldPredictions();
      });
    }
  }

  function resetWhatIfSliders() {
    state.whatIf = { adjN: 0, adjP: 0, adjK: 0, adjIrrigation: 0, adjCompost: 0 };
    ["adjN", "adjP", "adjK", "adjIrrigation", "adjCompost"].forEach(key => {
      const slider = document.getElementById(`slider_${key}`);
      const badge = document.getElementById(`val_${key}`);
      if (slider) slider.value = 0;
      if (badge) {
        const unit = key === "adjCompost" ? " T/Acre" : "%";
        badge.textContent = `0${unit}`;
      }
    });
  }

  function recalculateAll() {
    if (window.RecommendationEngine) {
      state.recommendations = window.RecommendationEngine.evaluateAllCrops(state.farmerInput);
      renderRecommendations(state.recommendations);

      if (state.recommendations.length > 0) {
        const topCrop = state.recommendations[0].cropId;
        if (!state.activeCropId || !window.AGRI_DATA.crops[state.activeCropId]) {
          state.activeCropId = topCrop;
        }
      }
    }

    updateHeaderKPIs();
    updateYieldPredictions();
    updateMarketIntelligence();
    renderDesignThinkingSection();
  }

  function renderRecommendations(recs) {
    const container = document.getElementById("recommendationsList");
    if (!container) return;

    container.innerHTML = "";
    const isHi = window.I18N && window.I18N.currentLang === "hi";

    const topList = recs.slice(0, 6);
    topList.forEach((item, idx) => {
      const crop = item.crop;
      const isSelected = item.cropId === state.activeCropId;

      let scoreColorClass = "score-high";
      if (item.suitabilityScore < 75) scoreColorClass = "score-low";
      else if (item.suitabilityScore < 88) scoreColorClass = "score-mid";

      const card = document.createElement("div");
      card.className = `crop-card ${isSelected ? "selected" : ""}`;
      card.innerHTML = `
        <div class="crop-card-header">
          <div class="crop-identity">
            <span class="crop-icon">${crop.icon}</span>
            <div>
              <h3 class="crop-title">${isHi ? (crop.nameHi || crop.name) : crop.name}</h3>
              <span class="crop-cat">${crop.category} • ${crop.durationDays}</span>
            </div>
          </div>
          <div class="crop-score-badge ${scoreColorClass}">
            <span class="score-num">${item.suitabilityScore}%</span>
            <span class="score-lbl">${isHi ? "अनुकूल" : "Match"}</span>
          </div>
        </div>

        <div class="crop-badge-pill">${isHi ? item.badgeHi : item.badge}</div>

        <div class="crop-metrics-grid">
          <div class="crop-metric-item">
            <span class="cm-label">${isHi ? "अनुमानित उपज" : "Exp. Yield"}</span>
            <span class="cm-val">${item.estYieldAcre} Q/Acre</span>
          </div>
          <div class="crop-metric-item">
            <span class="cm-label">${isHi ? "शुद्ध लाभ / एकड़" : "Net Profit / Acre"}</span>
            <span class="cm-val highlight-green">₹${item.estNetProfitAcre.toLocaleString()}</span>
          </div>
          <div class="crop-metric-item">
            <span class="cm-label">${isHi ? "बाजार भाव" : "Mandi Price"}</span>
            <span class="cm-val">₹${crop.currentPricePerQuintal}/Q</span>
          </div>
          <div class="crop-metric-item">
            <span class="cm-label">${isHi ? "लागत / एकड़" : "Cost / Acre"}</span>
            <span class="cm-val">₹${crop.costOfCultivationPerAcre.toLocaleString()}</span>
          </div>
        </div>

        <div class="crop-sub-scores">
          <div class="score-bar-row">
            <span>${isHi ? "मिट्टी" : "Soil"}: ${item.soilScore}%</span>
            <div class="mini-bar"><div class="mini-bar-fill" style="width: ${item.soilScore}%"></div></div>
          </div>
          <div class="score-bar-row">
            <span>${isHi ? "मौसम" : "Climate"}: ${item.climateScore}%</span>
            <div class="mini-bar"><div class="mini-bar-fill" style="width: ${item.climateScore}%"></div></div>
          </div>
          <div class="score-bar-row">
            <span>${isHi ? "खाद" : "Nutrients"}: ${item.nutrientScore}%</span>
            <div class="mini-bar"><div class="mini-bar-fill" style="width: ${item.nutrientScore}%"></div></div>
          </div>
        </div>

        <p class="crop-reasoning">${isHi ? item.reasoningHi : item.reasoningEn}</p>

        <div class="crop-actions">
          <button class="btn-select-crop ${isSelected ? "btn-active" : ""}" data-cropid="${item.cropId}">
            ${isSelected ? (isHi ? "✓ चुनी गई फसल (सक्रिय)" : "✓ Currently Active") : (isHi ? "उपज व मंडी भाव देखें ➔" : "Model Yield & Prices ➔")}
          </button>
        </div>
      `;

      card.querySelector(".btn-select-crop").addEventListener("click", () => {
        state.activeCropId = item.cropId;
        recalculateAll();
        switchTab("yield-predict");
      });

      container.appendChild(card);
    });
  }

  function updateHeaderKPIs() {
    const isHi = window.I18N && window.I18N.currentLang === "hi";

    const seasonEl = document.getElementById("kpi_season_val");
    if (seasonEl) {
      const sMap = { kharif: "Kharif (खरीफ)", rabi: "Rabi (रबी)", zaid: "Zaid (जायद)" };
      seasonEl.textContent = sMap[state.farmerInput.season] || state.farmerInput.season;
    }

    const soilHealthEl = document.getElementById("kpi_soil_val");
    if (soilHealthEl) {
      const ph = parseFloat(state.farmerInput.soilPh);
      let phStatus = "Good (pH " + ph + ")";
      if (ph < 6.0) phStatus = isHi ? "अम्लीय (pH " + ph + ")" : "Acidic (pH " + ph + ")";
      else if (ph > 7.8) phStatus = isHi ? "क्षारीय (pH " + ph + ")" : "Alkaline (pH " + ph + ")";
      else phStatus = isHi ? "उत्तम (pH " + ph + ")" : "Optimal (pH " + ph + ")";
      soilHealthEl.textContent = phStatus;
    }

    const topCropEl = document.getElementById("kpi_crop_val");
    if (topCropEl && state.recommendations.length > 0) {
      const top = state.recommendations[0].crop;
      topCropEl.textContent = `${top.icon} ${isHi ? (top.nameHi || top.name) : top.name}`;
    }

    const marketOutlookEl = document.getElementById("kpi_market_val");
    if (marketOutlookEl && state.activeCropId && window.AGRI_DATA.crops[state.activeCropId]) {
      const activeCrop = window.AGRI_DATA.crops[state.activeCropId];
      marketOutlookEl.textContent = `₹${activeCrop.currentPricePerQuintal}/Q (${activeCrop.priceForecast.trend})`;
    }
  }

  function updateYieldPredictions() {
    if (!window.YieldPredictor || !state.activeCropId) return;

    state.yieldResult = window.YieldPredictor.predictYield(state.activeCropId, state.farmerInput, state.whatIf);
    if (!state.yieldResult) return;

    const res = state.yieldResult;
    const isHi = window.I18N && window.I18N.currentLang === "hi";
    const crop = res.crop;

    const activeCropSelect = document.getElementById("activeCropSelect");
    if (activeCropSelect && activeCropSelect.options.length === 0) {
      for (let k in window.AGRI_DATA.crops) {
        const c = window.AGRI_DATA.crops[k];
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = `${c.icon} ${c.name}`;
        activeCropSelect.appendChild(opt);
      }
      activeCropSelect.addEventListener("change", (e) => {
        state.activeCropId = e.target.value;
        resetWhatIfSliders();
        recalculateAll();
      });
    }
    if (activeCropSelect) activeCropSelect.value = state.activeCropId;

    setText("res_yield_acre", `${res.predictedYieldPerAcre} Q`);
    setText("res_yield_total", `${res.totalYieldQuintals} Q (${res.totalYieldTonnes} Tonnes)`);
    setText("res_gross_rev", `₹${res.grossRevenue.toLocaleString()}`);
    setText("res_net_profit", `₹${res.netProfit.toLocaleString()}`);
    setText("res_roi", `${res.roiPercent}% ROI`);
    setText("res_conf_range", `± 7% (${res.lowerYield} - ${res.upperYield} Q/Acre)`);

    setText("res_limiter_title", isHi ? res.limitingNutrientHi : res.limitingNutrientEn);
    setText("res_limiter_desc", isHi ? res.recommendationHi : res.recommendationEn);

    const schedTbody = document.getElementById("fertilizerScheduleBody");
    if (schedTbody) {
      schedTbody.innerHTML = "";
      res.schedule.forEach(s => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>${isHi ? s.stageHi : s.stageEn}</strong></td>
          <td>${s.urea} kg/acre</td>
          <td>${s.dap} kg/acre</td>
          <td>${s.mop} kg/acre</td>
          <td>${s.compost > 0 ? s.compost + " Tonnes" : "-"}</td>
          <td><span class="sched-note">${isHi ? s.noteHi : s.noteEn}</span></td>
        `;
        schedTbody.appendChild(tr);
      });
    }
  }

  function updateMarketIntelligence() {
    if (!window.MarketIntel || !state.activeCropId) return;

    const stateName = state.farmerInput.state || "Maharashtra";
    state.marketResult = window.MarketIntel.getMarketAnalysis(state.activeCropId, stateName);
    if (!state.marketResult) return;

    const mkt = state.marketResult;
    const isHi = window.I18N && window.I18N.currentLang === "hi";

    setText("mkt_crop_name", `${mkt.crop.icon} ${isHi ? (mkt.crop.nameHi || mkt.crop.name) : mkt.crop.name}`);
    setText("mkt_modal_price", `₹${mkt.basePrice}/Quintal`);
    setText("mkt_msp_price", mkt.msp > 0 ? `₹${mkt.msp}/Quintal` : (isHi ? "लागू नहीं (सब्जी/फल)" : "N/A (Perishable)"));
    setText("mkt_trend", `${mkt.forecast.trend} (${mkt.forecast.changePercent > 0 ? "+" : ""}${mkt.forecast.changePercent}%)`);
    setText("mkt_advice", isHi ? mkt.recommendationHi : mkt.recommendationEn);

    if (state.yieldResult) {
      setText("mkt_gross_income", `₹${state.yieldResult.grossRevenue.toLocaleString()}`);
      setText("mkt_total_cost", `₹${state.yieldResult.totalCostOfCultivation.toLocaleString()}`);
      setText("mkt_net_margin", `₹${state.yieldResult.netProfit.toLocaleString()}`);
      setText("mkt_roi_badge", `${state.yieldResult.roiPercent}%`);
    }

    const mandiTbody = document.getElementById("mandiTableBody");
    if (mandiTbody) {
      mandiTbody.innerHTML = "";
      mkt.mandiList.forEach((m, idx) => {
        const isBest = idx === 0;
        const tr = document.createElement("tr");
        if (isBest) tr.className = "best-mandi-row";
        tr.innerHTML = `
          <td><strong>${m.name}</strong> ${isBest ? '<span class="badge-best">Best Rate</span>' : ""}</td>
          <td>${m.distKm} km</td>
          <td>₹${m.mandiPrice}</td>
          <td>- ₹${m.transportCost}</td>
          <td><strong class="highlight-green">₹${m.netRealization}</strong></td>
          <td><span class="mandi-status-pill">${m.status}</span></td>
        `;
        mandiTbody.appendChild(tr);
      });
    }

    if (state.activeTab === "market-intel") {
      window.MarketIntel.renderCharts(mkt);
    }
  }

  function renderDesignThinkingSection() {
    const container = document.getElementById("designThinkingCardsContainer");
    if (!container || !window.DesignThinkingShowcase) return;

    container.innerHTML = "";
    const isHi = window.I18N && window.I18N.currentLang === "hi";
    const stages = window.DesignThinkingShowcase.stages;

    stages.forEach(s => {
      const card = document.createElement("div");
      card.className = "dt-stage-card";
      card.style.borderTopColor = s.color;

      let stageBodyHtml = "";
      if (s.id === "empathize") {
        stageBodyHtml = `
          <div class="dt-quote-box">
            <p class="dt-quote">"${s.quoteEn}"</p>
            <span class="dt-quote-author">— ${s.quoteAuthor}</span>
          </div>
          <h5 class="dt-subhead">${isHi ? "फील्ड साक्षात्कार से मुख्य निष्कर्ष:" : "Key Field Interview Findings:"}</h5>
          <ul class="dt-list">
            ${(isHi ? s.keyFindingsHi : s.keyFindingsEn).map(f => `<li>${f}</li>`).join("")}
          </ul>
        `;
      } else if (s.id === "define") {
        stageBodyHtml = `
          <div class="dt-problem-box">
            <strong>${isHi ? "कार्यकारी समस्या वक्तव्य (HMW):" : "Actionable Problem Statement (How Might We):"}</strong>
            <p>${isHi ? s.problemStatementHi : s.problemStatementEn}</p>
          </div>
          <h5 class="dt-subhead">${isHi ? "४ प्रमुख कारक स्तंभ:" : "4 Key Factor Pillars Identified:"}</h5>
          <div class="dt-pillars-grid">
            ${s.pillars.map(p => `
              <div class="dt-pillar-item">
                <span class="dt-pname">${p.name}</span>
                <span class="dt-pdesc">${p.detail}</span>
              </div>
            `).join("")}
          </div>
        `;
      } else if (s.id === "ideate") {
        stageBodyHtml = `
          <h5 class="dt-subhead">${isHi ? "समाधान विकल्पों का तुलनात्मक विश्लेषण:" : "Solution Ideation & Trade-off Matrix:"}</h5>
          <div class="dt-solutions-list">
            ${(isHi ? s.solutionsEvaluatedHi : s.solutionsEvaluatedEn).map(sol => `
              <div class="dt-sol-item ${sol.verdict.includes("Adopted") || sol.verdict.includes("स्वीकृत") ? "adopted" : "rejected"}">
                <strong>${sol.idea}</strong>
                <p>${sol.verdict}</p>
              </div>
            `).join("")}
          </div>
        `;
      } else if (s.id === "prototype") {
        stageBodyHtml = `
          <p class="dt-desc">${isHi ? s.descriptionHi : s.descriptionEn}</p>
          <div class="dt-prototype-features">
            <span class="feat-tag">⚡ Live Dynamic Math Engine</span>
            <span class="feat-tag">🌾 16 Comprehensive Crop Models</span>
            <span class="feat-tag">📊 Chart.js Mandi Analytics</span>
            <span class="feat-tag">🌐 Dual English/Hindi Localization</span>
            <span class="feat-tag">🔊 Web Speech Synthesis</span>
            <span class="feat-tag">🖨 Printable Advisory PDF</span>
          </div>
        `;
      } else if (s.id === "test") {
        stageBodyHtml = `
          <h5 class="dt-subhead">${isHi ? "वास्तविक कृषि परीक्षण डेटा से सत्यापन:" : "Validation Against Real Farm Field Trials:"}</h5>
          <div class="dt-trials-table-wrap">
            <table class="dt-trials-table">
              <thead>
                <tr>
                  <th>Field Test Case</th>
                  <th>Actual Yield</th>
                  <th>Model Predicted</th>
                  <th>Accuracy</th>
                  <th>Farmer Feedback</th>
                </tr>
              </thead>
              <tbody>
                ${s.validationStudies.map(v => `
                  <tr>
                    <td><strong>${v.farmName}</strong><br><small>${v.location}</small></td>
                    <td>${v.actualYield}</td>
                    <td>${v.predictedYield}</td>
                    <td><span class="badge-accuracy">${v.accuracy}</span></td>
                    <td><em>"${v.feedback}"</em></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="dt-card-header">
          <div class="dt-stage-title-wrap">
            <span class="dt-num" style="background:${s.color}">${s.num}</span>
            <div>
              <h4 class="dt-stage-name">${isHi ? s.nameHi : s.name}</h4>
              <span class="dt-stage-action">${s.action}</span>
            </div>
          </div>
          <span class="dt-badge" style="color:${s.color}; border-color:${s.color}">${s.badge}</span>
        </div>
        <div class="dt-card-body">
          ${stageBodyHtml}
        </div>
      `;

      container.appendChild(card);
    });
  }

  function renderAdvisoryReport() {
    const reportContainer = document.getElementById("advisoryReportContent");
    if (!reportContainer || !state.yieldResult || !state.marketResult) return;

    const isHi = window.I18N && window.I18N.currentLang === "hi";
    const res = state.yieldResult;
    const mkt = state.marketResult;
    const crop = res.crop;
    const inp = state.farmerInput;

    const dateStr = new Date().toLocaleDateString(isHi ? "hi-IN" : "en-US", {
      year: "numeric", month: "long", day: "numeric"
    });

    reportContainer.innerHTML = `
      <div class="report-header">
        <div class="report-branding">
          <h2>AgroSense AI — Precision Farmer Advisory Report</h2>
          <p>Human-Centered Crop Intelligence & Yield Forecast</p>
        </div>
        <div class="report-meta">
          <span><strong>Date:</strong> ${dateStr}</span>
          <span><strong>State:</strong> ${inp.state}</span>
          <span><strong>Farm Area:</strong> ${inp.area} ${inp.areaUnit}</span>
        </div>
      </div>

      <div class="report-section">
        <h3>1. Land & Field Diagnostic Summary</h3>
        <div class="report-grid">
          <div><strong>Soil Type:</strong> ${window.AGRI_DATA.soilProfiles[inp.soilType]?.name || inp.soilType}</div>
          <div><strong>Soil pH:</strong> ${inp.soilPh}</div>
          <div><strong>Available Nutrients:</strong> N: ${inp.nitrogen}, P: ${inp.phosphorus}, K: ${inp.potassium} kg/ha</div>
          <div><strong>Season:</strong> ${inp.season.toUpperCase()}</div>
          <div><strong>Irrigation:</strong> ${inp.irrigation}</div>
          <div><strong>Farming Method:</strong> ${inp.farmingMethod}</div>
        </div>
      </div>

      <div class="report-section">
        <h3>2. Top Recommended Crop & Yield Forecast</h3>
        <div class="report-highlight-box">
          <div class="rh-left">
            <span class="rh-icon">${crop.icon}</span>
            <div>
              <h4>${isHi ? (crop.nameHi || crop.name) : crop.name}</h4>
              <p>${crop.category} • Growth Cycle: ${crop.durationDays}</p>
            </div>
          </div>
          <div class="rh-right">
            <div class="rh-stat">
              <span>Predicted Yield</span>
              <strong>${res.predictedYieldPerAcre} Q / Acre</strong>
            </div>
            <div class="rh-stat">
              <span>Total Farm Harvest</span>
              <strong>${res.totalYieldQuintals} Quintals</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="report-section">
        <h3>3. Commercial Mandi & Economic Profitability</h3>
        <div class="report-financial-table">
          <table class="report-table">
            <tr>
              <td>Current Modal Mandi Price (${mkt.bestMandi.name}):</td>
              <td><strong>₹${mkt.bestMandi.mandiPrice} / Quintal</strong></td>
            </tr>
            <tr>
              <td>Govt Minimum Support Price (MSP):</td>
              <td>${crop.msp > 0 ? "₹" + crop.msp + " / Quintal" : "Not applicable (Commercial Horticulture)"}</td>
            </tr>
            <tr>
              <td>Projected Gross Revenue:</td>
              <td><strong>₹${res.grossRevenue.toLocaleString()}</strong></td>
            </tr>
            <tr>
              <td>Estimated Cultivation & Fertilizer Outlay:</td>
              <td>₹${res.totalCostOfCultivation.toLocaleString()}</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Estimated Net Farm Profit:</strong></td>
              <td><strong class="highlight-green">₹${res.netProfit.toLocaleString()} (${res.roiPercent}% ROI)</strong></td>
            </tr>
          </table>
        </div>
        <p class="report-advice"><strong>Market Selling Strategy:</strong> ${isHi ? mkt.recommendationHi : mkt.recommendationEn}</p>
      </div>

      <div class="report-section">
        <h3>4. Actionable Fertilizer & Nutrient Schedule</h3>
        <table class="report-table sched-table">
          <thead>
            <tr>
              <th>Crop Stage</th>
              <th>Urea (kg/acre)</th>
              <th>DAP (kg/acre)</th>
              <th>Potash (kg/acre)</th>
              <th>Compost</th>
              <th>Field Instructions</th>
            </tr>
          </thead>
          <tbody>
            ${res.schedule.map(s => `
              <tr>
                <td><strong>${isHi ? s.stageHi : s.stageEn}</strong></td>
                <td>${s.urea}</td>
                <td>${s.dap}</td>
                <td>${s.mop}</td>
                <td>${s.compost > 0 ? s.compost + " T" : "-"}</td>
                <td>${isHi ? s.noteHi : s.noteEn}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div class="report-footer">
        <p>Generated by AgroSense AI. Developed via Stanford d.school Design Thinking Framework.</p>
        <p>Verified against ICAR & State Agricultural University benchmarks.</p>
      </div>
    `;
  }

  function bindLanguageSwitcher() {
    const btnEn = document.getElementById("langEnBtn");
    const btnHi = document.getElementById("langHiBtn");
    if (!btnEn || !btnHi) return;

    btnEn.addEventListener("click", () => {
      setLanguage("en");
      btnEn.classList.add("active");
      btnHi.classList.remove("active");
    });

    btnHi.addEventListener("click", () => {
      setLanguage("hi");
      btnHi.classList.add("active");
      btnEn.classList.remove("active");
    });
  }

  function setLanguage(lang) {
    if (window.I18N) {
      window.I18N.setLang(lang);
      applyTranslations();
      recalculateAll();
    }
  }

  function applyTranslations() {
    const translatableElements = document.querySelectorAll("[data-i18n]");
    translatableElements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      const text = window.I18N.t(key);
      if (text) el.textContent = text;
    });
  }
  window.applyTranslations = applyTranslations;

  function bindAudioReader() {
    const btnAudio = document.getElementById("btnAudioReadout");
    if (!btnAudio) return;

    btnAudio.addEventListener("click", () => {
      if (!("speechSynthesis" in window)) {
        alert("Speech synthesis is not supported on this browser.");
        return;
      }

      if (state.isSpeaking) {
        window.speechSynthesis.cancel();
        state.isSpeaking = false;
        btnAudio.classList.remove("speaking");
        btnAudio.innerHTML = `<span class="icon-audio">🔊</span> <span data-i18n="audioListen">${window.I18N.t("audioListen")}</span>`;
        return;
      }

      const isHi = window.I18N && window.I18N.currentLang === "hi";
      let speechText = "";

      if (state.recommendations.length > 0 && state.yieldResult && state.marketResult) {
        const topCrop = state.recommendations[0].crop;
        const res = state.yieldResult;
        const mkt = state.marketResult;

        if (isHi) {
          speechText = `नमस्ते किसान भाई। आपके खेत की मिट्टी और मौसम के अनुसार सबसे उपयुक्त फसल ${topCrop.nameHi || topCrop.name} है। 
          इसकी अनुमानित पैदावार ${res.predictedYieldPerAcre} क्विंटल प्रति एकड़ होगी। 
          आपके ${state.farmerInput.area} एकड़ खेत से कुल शुद्ध मुनाफा लगभग ${res.netProfit.toLocaleString()} रुपए अनुमानित है। 
          मंडी में वर्तमान मॉडल भाव ${mkt.basePrice} रुपए प्रति क्विंटल चल रहा है। 
          सलाह: ${mkt.recommendationHi}`;
        } else {
          speechText = `Welcome farmer. Based on your soil diagnostics and weather parameters, the top recommended crop is ${topCrop.name.split(" (")[0]}. 
          The predicted yield is ${res.predictedYieldPerAcre} quintals per acre. 
          Your estimated net farm profit across ${state.farmerInput.area} acres is approximately ₹${res.netProfit.toLocaleString()}. 
          The wholesale mandi rate is ₹${mkt.basePrice} per quintal. 
          Advisory: ${mkt.recommendationEn}`;
        }
      } else {
        speechText = isHi ? "कृपया पहले खेत का विवरण भरें।" : "Please enter your farm parameters first.";
      }

      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.lang = isHi ? "hi-IN" : "en-US";
      utterance.rate = 0.95;

      utterance.onstart = () => {
        state.isSpeaking = true;
        btnAudio.classList.add("speaking");
        btnAudio.innerHTML = `<span class="icon-audio">⏹</span> <span data-i18n="audioStop">${window.I18N.t("audioStop")}</span>`;
      };

      utterance.onend = utterance.onerror = () => {
        state.isSpeaking = false;
        btnAudio.classList.remove("speaking");
        btnAudio.innerHTML = `<span class="icon-audio">🔊</span> <span data-i18n="audioListen">${window.I18N.t("audioListen")}</span>`;
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  function bindPrintButton() {
    const btnPrint = document.getElementById("btnPrintReport");
    if (!btnPrint) return;

    btnPrint.addEventListener("click", () => {
      switchTab("report");
      setTimeout(() => {
        window.print();
      }, 200);
    });
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
