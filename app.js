document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
     1. MOBILE NAVIGATION / BURGER ICON TOGGLE
     ========================================== */
  const navToggle = document.getElementById("navToggle");
  const navbarLinks = document.getElementById("navbarLinks");

  if (navToggle && navbarLinks) {
    navToggle.addEventListener("click", () => {
      // Toggle the navbarLinks--open class targeted by style.css
      navbarLinks.classList.toggle("navbarLinks--open");

      // Toggle Font Awesome icon between bars and times (X)
      const icon = navToggle.querySelector("i");
      if (icon) {
        if (navbarLinks.classList.contains("navbarLinks--open")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        } else {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });
  }

  /* ==========================================
     2. FEE CALCULATOR LOGIC
     ========================================== */
  const packageSelect = document.getElementById("packageSelect");
  const squadDecreaseBtn = document.getElementById("squadDecrease");
  const discountCheckboxes = document.querySelectorAll(".discount-check");
  const discountCodeInput = document.getElementById("discountCode");
  const applyCodeBtn = document.getElementById("applyCodeBtn");

  // Summary element outputs
  const summaryPackageFee = document.querySelector(
    ".summary-box-row:nth-of-type(1) span:last-child",
  );
  const summaryDiscount = document.getElementById("summaryDiscount");
  const summaryTotal = document.getElementById("summaryTotal");

  // Only execute calculator code if feeCalc elements exist on current page
  if (packageSelect && summaryTotal) {
    let squadCount = 1;
    let promoDiscountPercent = 0;

    // Dynamically insert missing Squad count display and increase button into the DOM
    const stepperContainer = squadDecreaseBtn?.parentElement;
    let squadCountDisplay;
    let squadIncreaseBtn;

    if (stepperContainer) {
      squadCountDisplay = document.createElement("span");
      squadCountDisplay.id = "squadCount";
      squadCountDisplay.textContent = squadCount;

      squadIncreaseBtn = document.createElement("button");
      squadIncreaseBtn.id = "squadIncrease";
      squadIncreaseBtn.type = "button";
      squadIncreaseBtn.innerHTML = "**";

      stepperContainer.appendChild(squadCountDisplay);
      stepperContainer.appendChild(squadIncreaseBtn);

      // Squad Counter Event Listeners
      squadDecreaseBtn.addEventListener("click", () => {
        if (squadCount > 1) {
          squadCount--;
          squadCountDisplay.textContent = squadCount;
          calculateFee();
        }
      });

      squadIncreaseBtn.addEventListener("click", () => {
        squadCount++;
        squadCountDisplay.textContent = squadCount;
        calculateFee();
      });
    }

    // Ensure booking checkboxes behave like mutually exclusive radio selections
    discountCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        if (e.target.checked) {
          discountCheckboxes.forEach((cb) => {
            if (cb !== e.target) cb.checked = false;
          });
        }
        calculateFee();
      });
    });

    // Discount Code Application Logic
    if (applyCodeBtn && discountCodeInput) {
      applyCodeBtn.addEventListener("click", () => {
        const code = discountCodeInput.value.trim().toUpperCase();
        if (code === "LEVELUP20") {
          promoDiscountPercent = 20;
          alert("Promo code applied: 20% OFF!");
        } else if (code === "") {
          promoDiscountPercent = 0;
        } else {
          promoDiscountPercent = 0;
          alert("Invalid discount code.");
        }
        calculateFee();
      });
    }

    // Main calculation function
    function calculateFee() {
      // 1. Get Base Package Price
      const selectedOption = packageSelect.options[packageSelect.selectedIndex];
      const basePrice =
        parseFloat(selectedOption.getAttribute("data-price")) || 0;

      // 2. Calculate Subtotal with Squad Members
      const subtotal = basePrice * squadCount;

      // 3. Get Selected Booking Discount Percentage
      let bookingDiscountPercent = 0;
      discountCheckboxes.forEach((cb) => {
        if (cb.checked) {
          bookingDiscountPercent =
            parseFloat(cb.getAttribute("data-discount")) || 0;
        }
      });

      // 4. Calculate Total Discounts Combined
      const totalDiscountPercent =
        bookingDiscountPercent + promoDiscountPercent;
      const discountAmount = subtotal * (totalDiscountPercent / 100);
      const grandTotal = Math.max(0, subtotal - discountAmount);

      // 5. Update UI Displays formatted as Rand (R)
      if (summaryPackageFee) {
        summaryPackageFee.textContent = `R${subtotal.toLocaleString("en-ZA", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      }

      if (summaryDiscount) {
        summaryDiscount.textContent = `-${totalDiscountPercent}%`;
      }

      summaryTotal.textContent = `R${grandTotal.toLocaleString("en-ZA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }

    // Listen for changes on package select
    packageSelect.addEventListener("change", calculateFee);

    // Initial calculation on page load
    calculateFee();
  }

  /* ==========================================
     3. OPTIONAL: PACKAGE TABLE FILTERING
     ========================================== */
  const filterButtons = document.querySelectorAll(".filter-tab");
  const tableRows = document.querySelectorAll(".pricing-table tbody tr");

  if (filterButtons.length > 0 && tableRows.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("filter-tab-active"));
        btn.classList.add("filter-tab-active");

        const category = btn.getAttribute("data-category");

        tableRows.forEach((row) => {
          const rowCategory = row.getAttribute("data-category");
          if (category === "all" || rowCategory === category) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        });
      });
    });
  }
});
