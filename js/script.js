document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // FOOTER YEAR
  // =========================

  const yearEl = document.getElementById("current-year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  // =========================
  // MOBILE MENU
  // =========================

  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburger && mobileMenu) {

    hamburger.addEventListener("click", () => {

      const isExpanded =
        hamburger.getAttribute("aria-expanded") === "true";

      hamburger.setAttribute(
        "aria-expanded",
        String(!isExpanded)
      );

      mobileMenu.classList.toggle("open");
      hamburger.classList.toggle("active");

    });


    // Close mobile menu after clicking a link

    mobileMenu.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        hamburger.setAttribute(
          "aria-expanded",
          "false"
        );

        hamburger.classList.remove("active");

      });

    });

  }


  // =========================
  // SCROLL REVEAL
  // =========================

  const revealElements =
    document.querySelectorAll(".scroll-reveal");

  if (revealElements.length > 0) {

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };


    const revealObserver =
      new IntersectionObserver((entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      }, observerOptions);


    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  }


  // =========================
  // INTERACTIVE ROADMAP
  // =========================

  const stepPanes =
    document.querySelectorAll(".step-content-pane");

  const stepIndicators =
    document.querySelectorAll(".step-indicator");

  const prevBtn =
    document.getElementById("prev-step");

  const nextBtn =
    document.getElementById("next-step");


  if (
    stepPanes.length > 0 &&
    prevBtn &&
    nextBtn
  ) {

    let currentStep = 0;

    const totalSteps = stepPanes.length;


    function updateSteps(index) {

      stepPanes.forEach((pane, i) => {

        pane.classList.toggle(
          "active",
          i === index
        );

      });


      stepIndicators.forEach((indicator, i) => {

        indicator.classList.toggle(
          "active",
          i === index
        );

      });


      prevBtn.disabled = index === 0;

      nextBtn.disabled =
        index === totalSteps - 1;


      prevBtn.style.opacity =
        index === 0 ? "0.5" : "1";

      nextBtn.style.opacity =
        index === totalSteps - 1 ? "0.5" : "1";

    }


    nextBtn.addEventListener("click", () => {

      if (currentStep < totalSteps - 1) {

        currentStep++;

        updateSteps(currentStep);

      }

    });


    prevBtn.addEventListener("click", () => {

      if (currentStep > 0) {

        currentStep--;

        updateSteps(currentStep);

      }

    });


    stepIndicators.forEach((indicator, i) => {

      indicator.addEventListener("click", () => {

        currentStep = i;

        updateSteps(currentStep);

      });

      indicator.style.cursor = "pointer";

    });


    updateSteps(currentStep);

  }


  // =========================
  // FAQ ACCORDION
  // =========================

  const faqItems =
    document.querySelectorAll(".faq-item");


  if (faqItems.length > 0) {

    faqItems.forEach((item) => {

      const questionBtn =
        item.querySelector(".faq-question");

      const answerDiv =
        item.querySelector(".faq-answer");


      if (!questionBtn || !answerDiv) {
        return;
      }


      questionBtn.addEventListener("click", () => {

        const isActive =
          item.classList.contains("active");


        // Close all FAQ items

        faqItems.forEach((otherItem) => {

          otherItem.classList.remove("active");

          const otherAnswer =
            otherItem.querySelector(".faq-answer");

          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }

        });


        // Open selected FAQ

        if (!isActive) {

          item.classList.add("active");

          answerDiv.style.maxHeight =
            answerDiv.scrollHeight + "px";

        }

      });

    });

  }

});