# AgroSense AI: Smart Agriculture Crop Recommendation, Yield Prediction & Market Intelligence Dashboard

A human-centered web dashboard applying Stanford d.school and IDEO's **Design Thinking framework** (*Empathize, Define, Ideate, Prototype, Test*) to smart agriculture.

---

## 🌟 Key Features

1. **🌾 Farm Input & Geographic Setup**:
   - Location / Area selection (Acres, Hectares, Bigha).
   - Soil profile diagnostics (Alluvial, Black/Regur, Red & Yellow, Laterite, Sandy Loam, Clayey).
   - Soil pH (4.5 – 9.0) and available N-P-K nutrient reserves.
   - Cropping seasons (Kharif, Rabi, Zaid), temperature, rainfall, humidity, and irrigation systems (Drip, Canal, Sprinkler, Borewell, Rainfed).
   - Fertilizer usage (Urea, DAP, Potash/MOP, and Organic FYM/Compost).

2. **🏆 Multi-Factor Crop Recommendation Engine**:
   - Scores 16 major crops (Wheat, Paddy, Cotton, Maize, Soybean, Chickpea, Mustard, Sugarcane, Groundnut, Tomato, Potato, Onion, Millets/Bajra, Sorghum/Jowar, Sunflower, Pigeon Pea).
   - Evaluates soil physical texture, pH tolerance, climatic bounds, nutrient demand vs. supply, and market profitability.
   - Generates plain-language reasoning cards: "Why this crop fits your farm", risk warnings, growth duration, and expected net profit.

3. **📊 Crop Yield Predictor & What-If Optimizer**:
   - Scientific yield model based on **Liebig's Law of the Minimum** and **Mitscherlich-Baule nutrient-yield curves**.
   - Yield outputs in Quintals/Acre, Tonnes/Acre, and Total Farm Harvest with a 95% confidence interval.
   - **Interactive What-If Simulator**: Adjust sliders for Urea, DAP, Potash, Compost, or Irrigation and observe instant recalculation of harvest tonnage and profit.
   - Precision fertilizer split schedule (Basal, Vegetative, and Flowering doses).

4. **💰 Mandi Wholesale Prices & Profitability Intelligence**:
   - Real-time modal prices, official Government MSP (Minimum Support Price) floors, and 30-day forecast trajectory.
   - Interactive Chart.js visualizations: 12-month historical price trend curve vs. MSP floor.
   - Regional APMC Mandi comparison table factoring in freight/transport deductions.
   - Economic breakdown: Gross Revenue, Cultivation Cost, Net Farm Margin, and ROI %.

5. **💡 Design Thinking Framework Showcase**:
   - Complete pedagogical presentation tab mapping the 5 stages:
     - **Empathize**: Farmer interviews, real constraints, voice-of-farmer persona.
     - **Define**: Actionable problem statement (How Might We...), 4 key factor pillars.
     - **Ideate**: Brainstorming solution trade-offs (static calendar vs black box vs transparent AgroSense engine).
     - **Prototype**: Live interactive dashboard.
     - **Test**: Field validation studies against ICAR trial datasets (96.8% - 97.8% accuracy).
   - Features the presentation diagram infographics uploaded by the user.

6. **🌐 Farmer Accessibility & Usability**:
   - Full bilingual support: **English & Hindi (हिन्दी)** with instant one-click toggle.
   - **Voice Audio Readout** using the browser's Web Speech API.
   - **Printable / PDF Farmer Advisory Report** formatted for A4 printing.
   - Pre-loaded one-click test farm profiles (Vidarbha Cotton, Punjab Wheat, Karnataka Maize, Rajasthan Mustard).

---

## 🚀 How to Run the Dashboard

### Option 1: Direct File Open
Simply double-click `index.html` or open it in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local Python HTTP Server
Run the following in the project directory:
```bash
python -m http.server 8080
```
Then visit `http://localhost:8080` in your web browser.
