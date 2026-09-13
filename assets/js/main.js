// AviatorCoatUp Master Client Script
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Synchronization
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // 2. Interactive FAQs Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. Interactive Flight Altitude & Shearling Thermal Clo Calculator
  const jacketModel = document.getElementById('calc-jacket-model');
  const flightAltitude = document.getElementById('calc-flight-altitude');
  const fleeceDepth = document.getElementById('calc-fleece-depth');
  const resultClo = document.getElementById('calc-clo-val');
  const resultSubZero = document.getElementById('calc-subzero-val');
  const resultWindproof = document.getElementById('calc-windproof-val');

  function updateThermalEstimates() {
    if (!jacketModel || !flightAltitude || !fleeceDepth) return;
    const model = jacketModel.value;
    const alt = flightAltitude.value;
    const depth = fleeceDepth.value;

    let cloRating = 3.8;
    let minTempC = -25;
    let windRating = "< 0.5 CFM (Zero Permeability)";

    if (model === 'b3-bomber') {
      cloRating += 0.8;
      minTempC -= 10;
    } else if (model === 'irvin-raf') {
      cloRating += 0.6;
      minTempC -= 8;
    }

    if (depth === '25mm-heavy') {
      cloRating += 0.7;
      minTempC -= 7;
    } else if (depth === '15mm-light') {
      cloRating -= 0.6;
      minTempC += 6;
    }

    if (alt === 'stratosphere-25k') {
      minTempC -= 12;
    }

    const minTempF = Math.round(minTempC * 1.8 + 32);

    if (resultClo) resultClo.textContent = `${cloRating.toFixed(1)} CLO (Arctic Spec)`;
    if (resultSubZero) resultSubZero.textContent = `${minTempC}°C (${minTempF}°F)`;
    if (resultWindproof) resultWindproof.textContent = windRating;
  }

  if (jacketModel && flightAltitude && fleeceDepth) {
    [jacketModel, flightAltitude, fleeceDepth].forEach(el => {
      el.addEventListener('change', updateThermalEstimates);
      el.addEventListener('input', updateThermalEstimates);
    });
    updateThermalEstimates();
  }
});
