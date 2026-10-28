/**
 * Market Intelligence & Profitability Engine
 * Mandi price discovery, MSP benchmarks, transport deduction, and selling recommendations.
 */

const MarketIntel = {
  priceChartInstance: null,
  mandiChartInstance: null,

  /**
   * Get complete market intelligence for a crop in a state
   * @param {string} cropId
   * @param {string} state
   * @returns {Object} Market data, mandi rankings, and financial projections
   */
  getMarketAnalysis: function(cropId, state = "Maharashtra") {
    if (!window.AGRI_DATA || !window.AGRI_DATA.crops[cropId]) {
      return null;
    }

    const crop = window.AGRI_DATA.crops[cropId];
    const mandis = (window.AGRI_DATA.regionalMandis && window.AGRI_DATA.regionalMandis[state]) ||
                   window.AGRI_DATA.regionalMandis["Maharashtra"];

    const basePrice = crop.currentPricePerQuintal;
    const msp = crop.msp;

    // Evaluate each mandi with realistic price spread and transport logistics
    const mandiList = mandis.map(m => {
      let spreadMultiplier = 1.0;
      if (m.spread.startsWith("+")) {
        spreadMultiplier += parseFloat(m.spread.replace("+", "").replace("%", "")) / 100;
      } else if (m.spread.startsWith("-")) {
        spreadMultiplier -= parseFloat(m.spread.replace("-", "").replace("%", "")) / 100;
      }

      const mandiPrice = Math.round(basePrice * spreadMultiplier);
      const transportCostPerQuintal = Math.round(m.distKm * 1.4); // ₹1.4 per km per quintal
      const netRealization = mandiPrice - transportCostPerQuintal;

      return {
        name: m.name,
        distKm: m.distKm,
        status: m.status,
        mandiPrice: mandiPrice,
        transportCost: transportCostPerQuintal,
        netRealization: netRealization
      };
    });

    // Sort by highest net realization
    mandiList.sort((a, b) => b.netRealization - a.netRealization);
    const bestMandi = mandiList[0];

    // Determine selling recommendation
    let recommendationEn = "";
    let recommendationHi = "";

    if (msp > 0 && basePrice < msp) {
      recommendationEn = `Market price (₹${basePrice}/Q) is currently below MSP (₹${msp}/Q). We recommend selling through government procurement centers (NAFED/FCI) or holding stocks for 3-4 weeks.`;
      recommendationHi = `वर्तमान बाजार भाव (₹${basePrice}/क्विंटल) न्यूनतम समर्थन मूल्य (₹${msp}/क्विंटल) से नीचे है। सरकारी खरीद केंद्र पर बेचें या ३-४ सप्ताह रोकें।`;
    } else if (crop.priceForecast.trend === "Bullish" || crop.priceForecast.trend === "Very Bullish") {
      recommendationEn = `Prices are trending upward (+${crop.priceForecast.changePercent}%). ${crop.priceForecast.advice} Best mandi for maximum net return: ${bestMandi.name} (Net ₹${bestMandi.netRealization}/Q).`;
      recommendationHi = `भाव में तेजी का रुझान (+${crop.priceForecast.changePercent}%) है। सबसे अधिक शुद्ध मुनाफा देने वाली मंडी: ${bestMandi.name} (शुद्ध ₹${bestMandi.netRealization}/क्विंटल)।`;
    } else {
      recommendationEn = `Stable market conditions (+${crop.priceForecast.changePercent}%). ${crop.priceForecast.advice} Staggered sales across 2-3 weeks recommended.`;
      recommendationHi = `मंडी भाव स्थिर (+${crop.priceForecast.changePercent}%) हैं। २-३ हफ्तों में धीरे-धीरे माल निकालें।`;
    }

    return {
      crop: crop,
      state: state,
      basePrice: basePrice,
      msp: msp,
      forecast: crop.priceForecast,
      mandiList: mandiList,
      bestMandi: bestMandi,
      recommendationEn: recommendationEn,
      recommendationHi: recommendationHi,
      historicalMonths: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      historicalPrices: crop.historicalPrices
    };
  },

  /**
   * Render or update Chart.js visualizations
   */
  renderCharts: function(marketData) {
    if (typeof Chart === "undefined") {
      console.warn("Chart.js not loaded");
      return;
    }

    // 1. Historical & Forecast Trend Line Chart
    const priceCanvas = document.getElementById("priceTrendChart");
    if (priceCanvas) {
      const ctx = priceCanvas.getContext("2d");
      if (this.priceChartInstance) {
        this.priceChartInstance.destroy();
      }

      const months = marketData.historicalMonths.slice();
      months.push("Next 30D (Est)");
      const prices = marketData.historicalPrices.slice();
      const lastPrice = prices[prices.length - 1];
      const forecastedNext = Math.round(lastPrice * (1 + marketData.forecast.changePercent / 100));
      prices.push(forecastedNext);

      const mspData = new Array(prices.length).fill(marketData.msp > 0 ? marketData.msp : null);

      this.priceChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: months,
          datasets: [
            {
              label: `Wholesale Modal Price (₹/Quintal)`,
              data: prices,
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              borderWidth: 3,
              fill: true,
              tension: 0.35,
              pointBackgroundColor: prices.map((p, idx) => idx === prices.length - 1 ? "#f59e0b" : "#10b981"),
              pointRadius: prices.map((p, idx) => idx === prices.length - 1 ? 7 : 4)
            },
            ...(marketData.msp > 0 ? [{
              label: `MSP Support Floor (₹${marketData.msp})`,
              data: mspData,
              borderColor: "#ef4444",
              borderWidth: 2,
              borderDash: [6, 6],
              fill: false,
              pointRadius: 0
            }] : [])
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ₹${context.parsed.y}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: { color: "rgba(200, 200, 200, 0.15)" },
              ticks: {
                callback: function(val) { return "₹" + val; }
              }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      });
    }

    // 2. Mandi Price Comparison Bar Chart
    const mandiCanvas = document.getElementById("mandiCompareChart");
    if (mandiCanvas) {
      const ctx2 = mandiCanvas.getContext("2d");
      if (this.mandiChartInstance) {
        this.mandiChartInstance.destroy();
      }

      const labels = marketData.mandiList.map(m => m.name);
      const netRates = marketData.mandiList.map(m => m.netRealization);
      const grossRates = marketData.mandiList.map(m => m.mandiPrice);

      this.mandiChartInstance = new Chart(ctx2, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Net Farmgate Realization (₹/Q)",
              data: netRates,
              backgroundColor: "#059669",
              borderRadius: 6
            },
            {
              label: "Mandi Quoted Rate (₹/Q)",
              data: grossRates,
              backgroundColor: "#93c5fd",
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" }
          },
          scales: {
            y: {
              ticks: { callback: function(v) { return "₹" + v; } }
            }
          }
        }
      });
    }
  }
};

if (typeof window !== "undefined") {
  window.MarketIntel = MarketIntel;
}
