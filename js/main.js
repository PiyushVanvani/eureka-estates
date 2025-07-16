document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const deleteAccountBtn = document.getElementById("deleteAccountBtn");
  const authOptions = document.getElementById("authOptions");
  const loggedInUser = document.getElementById("loggedInUser");
  const formTitle = document.getElementById("formTitle");
  const loginBtn = document.querySelector(".login-btn");
  const slider = document.querySelector(".testimonials-slider");

  // User state from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Update UI based on login status
  if (isLoggedIn && user) {
    if (authOptions) authOptions.style.display = "block";
    if (loggedInUser) loggedInUser.textContent = user.name;
    if (loginForm) loginForm.style.display = "none";
    if (formTitle) formTitle.textContent = "Account Options";

    if (loginBtn) {
      const firstName = user.name.split(" ")[0];
      loginBtn.textContent = `Hello, ${firstName}`;
      loginBtn.onclick = () => (window.location.href = "login.html");
    }
  } else {
    if (authOptions) authOptions.style.display = "none";
    if (loginBtn) {
      loginBtn.textContent = "Login";
      loginBtn.onclick = () => (window.location.href = "login.html");
    }
  }

  // ======= SIGNUP =======
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value.trim();

      if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
      }

      const existingUser = JSON.parse(localStorage.getItem("user"));
      if (existingUser && existingUser.email === email) {
        alert(
          "This email is already used. Please use a different email or delete your existing account."
        );
        return;
      }

      localStorage.setItem("user", JSON.stringify({ name, email, password }));
      localStorage.removeItem("isLoggedIn");

      if (confirm("Sign up successful! Do you want to go to the login page?")) {
        window.location.href = "login.html";
      }
    });
  }

  // ======= LOGIN =======
  if (loginForm) {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      const loginEmailInput = document.getElementById("loginEmail");
      if (loginEmailInput) loginEmailInput.value = rememberedEmail;
      const rememberMeCheckbox = document.getElementById("rememberMe");
      if (rememberMeCheckbox) rememberMeCheckbox.checked = true;
    }

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
      const rememberMe = document.getElementById("rememberMe").checked;

      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (!savedUser) {
        alert("No user found. Please sign up first.");
        return;
      }

      if (email === savedUser.email && password === savedUser.password) {
        localStorage.setItem("isLoggedIn", "true");

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        alert("Login successful!");
        window.location.href = "index.html";
      } else {
        alert("Invalid email or password.");
      }
    });
  }

  // ======= LOGOUT =======
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      alert("You have been logged out.");
      location.reload();
    });
  }

  // ======= DELETE ACCOUNT =======
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete your account?")) {
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("subscriptions"); // <-- Add this line
        alert("Your account has been deleted.");
        window.location.href = "signup.html";
      }
    });
  }

  // ======= Page Load Animations =======
  document.getElementById("banner")?.classList.add("slideInFromRight");
  document.querySelector(".navbar-own")?.classList.add("slideInFromLeft");

  // ======= Scroll Animations =======
  const missionVisionSection = document.querySelector(".mission-vision");
  const quoteBox = document.querySelector(".quote-box");
  const typesSection = document.querySelector(".types");
  const offersSection = document.querySelector("#offers");
  const offerCards = document.querySelectorAll(".offer-card");
  const counters = document.querySelectorAll(".counter");
  const aboutUsSection = document.querySelector(".about-us");
  const countersSection = document.querySelector(".counters");
  const agentCards = document.querySelectorAll(".agent-card");
  const timelineItems = document.querySelectorAll(".timeline-item");
  const leaderCards = document.querySelectorAll(".leader-card");
  const faqQuestions = document.querySelectorAll(".faq-question");

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  // Slow counter animation ~1.5 seconds duration
  function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const currentValue = Math.floor(progress * target);
        counter.innerText = currentValue;
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    }

    requestAnimationFrame(update);
  }

  function onScroll() {
    if (typesSection && isInViewport(typesSection)) {
      typesSection.classList.add("animate-visible");
    }

    if (offersSection && isInViewport(offersSection)) {
      offerCards.forEach((card, i) => {
        card.classList.add(i < 3 ? "slide-in-left" : "slide-in-right");
        card.style.opacity = 1;
      });
    }

    counters.forEach((counter) => {
      if (isInViewport(counter) && !counter.classList.contains("counted")) {
        animateCounter(counter);
        counter.classList.add("counted");
      }
    });

    agentCards.forEach((card, i) => {
      if (isInViewport(card)) {
        card.classList.add("visible");
        card.style.animationDelay = `${i * 0.7}s`;
      }
    });

    if (missionVisionSection && isInViewport(missionVisionSection)) {
      missionVisionSection.classList.add("animate-visible");
    }

    if (quoteBox && isInViewport(quoteBox)) {
      quoteBox.classList.add("animate-visible");
    }

    timelineItems.forEach((item) => {
      if (isInViewport(item)) item.classList.add("visible");
    });

    const aboutSections = document.querySelectorAll(".about-us");
    aboutSections.forEach((section) => {
      if (isInViewport(section)) section.classList.add("active");
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll();

  // Intersection Observer with slower delay for leader cards
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active", "animate-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  if (aboutUsSection) observer.observe(aboutUsSection);
  if (countersSection) observer.observe(countersSection);
  leaderCards.forEach((card) => {
    observer.observe(card);
    card.style.animationDelay = "1s";
  });

  // FAQ toggle
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const active = document.querySelector(".faq-question.active");
      if (active && active !== question) {
        active.classList.remove("active");
        active.nextElementSibling.style.display = "none";
      }
      question.classList.toggle("active");
      const answer = question.nextElementSibling;
      answer.style.display = question.classList.contains("active")
        ? "block"
        : "none";
    });
  });

  // Testimonials slider drag - slower movement
  if (slider) {
    let isDown = false,
      startX,
      scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 0.5;
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  // Initialize EmailJS
  emailjs.init("P1zLcYeNmsYfSeo_X");

  // Newsletter subscription form handling
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) {
        alert("Please login to subscribe.");
        window.location.href = "login.html";
        return;
      }

      const userEmailInput = document.getElementById("newsletterEmail");
      if (!userEmailInput) {
        alert("Email input field not found.");
        return;
      }

      const userEmail = userEmailInput.value.trim();

      // Debug logs
      console.log("Email input element:", userEmailInput);
      console.log("Email entered:", userEmail);

      // Simple regex email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(userEmail);
      console.log("Email validation result:", isValidEmail);

      if (!userEmail || !isValidEmail) {
        alert("Please enter a valid email address.");
        return;
      }

      // Check if user is logged in with same email (optional confirmation)
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser && userEmail === savedUser.email) {
        if (
          !confirm(
            `You are logged in as ${userEmail}. Use this email for subscription?`
          )
        ) {
          return;
        }
      }

      // Prevent duplicate subscriptions
      let subscriptions = JSON.parse(
        localStorage.getItem("subscriptions") || "[]"
      );
      if (subscriptions.includes(userEmail)) {
        alert("You have already subscribed.");
        return;
      }

      // Save new subscription in localStorage
      subscriptions.push(userEmail);
      localStorage.setItem("subscriptions", JSON.stringify(subscriptions));

      const templateParams = { user_email: userEmail };

      emailjs
        .send("service_r96gjkk", "template_u3o7f67", templateParams)
        .then(() => {
          alert(
            "Thank you for subscribing! A confirmation email has been sent."
          );
          newsletterForm.reset();
        })
        .catch((error) => {
          console.error("EmailJS error:", error);
          alert(
            "Subscription successful, but confirmation email failed. Please try again later."
          );
        });
    });
  }

  // ======= Page transition on link click - slower =======
  document.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        link.target === "_blank"
      )
        return;

      e.preventDefault();
      const loader = document.getElementById("page-transition");
      if (loader) loader.classList.remove("hide");

      setTimeout(() => {
        window.location.href = href;
      }, 3000);
    });
  });
});

// Page transition loader hide after load
window.addEventListener("load", function () {
  const loader = document.getElementById("page-transition");
  if (loader) {
    setTimeout(() => loader.classList.add("hide"), 1500);
  }
});
// Email js contact message
document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS with your public key
  emailjs.init("P1zLcYeNmsYfSeo_X");

  const form = document.getElementById("contact-form");

  // ✅ Check if form exists before using it
  if (!form) {
    console.error("Form with ID 'contact-form' not found.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate again just in case
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    // Common params for email
    const baseParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    // First: send email to admin
    emailjs
      .send("service_r96gjkk", "template_wnx3sdd", {
        ...baseParams,
        to_email: "piyushvanvani5555@gmail.com", // Replace with your admin email
        email_type: "Admin Notification",
      })
      .then(() => {
        console.log("Email sent to admin.");

        // Then: send confirmation email to user
        return emailjs.send("service_r96gjkk", "template_wnx3sdd", {
          ...baseParams,
          to_email: email,
          email_type: "User Confirmation",
        });
      })
      .then(() => {
        alert(
          "Message sent successfully. A confirmation email has been sent to you."
        );
        form.reset();
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
        alert("Oops! Something went wrong. Please try again later.");
      });
  });
});

//-----------types section

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".property-type-card").forEach((card) => {
    card.addEventListener("click", () => {
      const type = card.getAttribute("data-type");
      if (type) {
        window.location.href = `properties.html?type=${encodeURIComponent(
          type
        )}`;
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const typeFromURL = new URLSearchParams(window.location.search).get("type");

  if (typeFromURL) {
    const typeFilter = document.getElementById("typeFilter");
    if (typeFilter) {
      typeFilter.value = typeFromURL;

      // Trigger change event to apply filter
      const changeEvent = new Event("change");
      typeFilter.dispatchEvent(changeEvent);
    }

    // Optional scroll to properties section
    const propSection = document.getElementById("properties");
    if (propSection) {
      setTimeout(() => {
        window.scrollTo({
          top: propSection.offsetTop - 80,
          behavior: "smooth",
        });
      }, 200);
    }
  }
});

// ========== OFFERS SECTION ==========
const offers = [
  {
    id: 1,
    price: "₹1,50,00,000",
    type: "Premium Apartment",
    location: "Vesu, Surat, Gujarat",
    details: "3 BHK · 2 Bath · 1,650 sqft",
    image: "images/offers/apartment.jpg",
    status: "sale",
    description: "Spacious and stylish apartment ideal for modern living.",
  },
  {
    id: 2,
    price: "₹4,25,00,000",
    type: "Luxury Bungalow",
    location: "Alkapuri, Vadodara, Gujarat",
    details: "4 BHK · 3 Bath · 2,900 sqft",
    image: "images/offers/bungalow.jpg",
    status: "sale",
    description: "An expansive bungalow offering privacy and premium finishes.",
  },
  {
    id: 3,
    price: "₹75,000/month",
    type: " Megastore",
    location: "Navrangpura, Ahmedabad, Gujarat",
    details: "Second Floor · 550 sqft",
    image: "images/offers/megastore.jpg",
    status: "rent",
    description:
      "Perfect location for retail operations with high foot traffic.",
  },
  {
    id: 4,
    price: "₹85,000/month",
    type: "Office Space",
    location: "Rajkot, Gujarat",
    details: "1 Cabin,1 Washroom,900 sqft",
    image: "images/offers/office.jpg",
    status: "rent",
    description: "Functional and elegant office layout ideal for businesses.",
  },
  {
    id: 5,
    price: "₹1,25,00,000",
    type: "Spacious Garage",
    location: "Gandhinagar, Gujarat",
    details: "Capacity for 3 Cars · 750 sqft",
    image: "images/offers/garage.png",
    status: "sale",
    description: "Large garage space with ample room for multiple vehicles.",
  },
  {
    id: 6,
    price: "₹1,35,000/month",
    type: "Villa",
    location: "Udaipur, Rajasthan",
    details: "3 BHK · 2 Bath · 1,100 sqft",
    image: "images/offers/villa.jpg",
    status: "rent",
    description: "Contemporary villa with sleek interiors and a private pool for luxurious living.",
  },
];

const offersContainer = document.getElementById("offersContainer");
if (offersContainer) {
  // ✅ Detect the current page automatically
  const curPage = window.location.pathname.includes("properties.html")
    ? "offers-properties"
    : "offers-index";

  offers.forEach((property) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
      <div class="card offer-card position-relative h-100 d-flex flex-column justify-content-between">
        <span class="badge badge-${
          property.status
        }" style="position: absolute; top: 15px; left: 15px;">
          ${property.status === "sale" ? "For Sale" : "For Rent"}
        </span>
        <span class="badge-offer" style="position: absolute; top: 15px; right: 15px; background-color: #ffc107; color: #fff; padding: 5px 10px; border-radius: 5px; font-weight: bold;">🌟 Offer</span>
        
        <img src="${property.image}" class="card-img-top" alt="${
      property.type
    }" />

        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${property.price}</h5>
          <p class="card-text">
            <strong>Type:</strong> ${property.type}<br />
            <strong>Location:</strong> ${property.location}<br />
            <strong>Details:</strong> ${property.details}
          </p>
          <div class="d-flex justify-content-between gap-2 mt-3">
            <a href="property.html?id=${
              property.id
            }&from=${curPage}" class="btn btn-outline-success w-100">👁 View Details</a>
            <button class="btn btn-outline-primary w-100" onclick="contactAgent(${
              property.id
            })">📞 Contact</button>
          </div>
        </div>
      </div>
    `;

    offersContainer.appendChild(card);
  });
}
// 🔄 Clear filters on every page refresh
sessionStorage.removeItem("propertyFilters");

let currentPage = 1;
let isViewAllClicked = false;
const perPageDefault = 12;
const perPageAfterViewAll = 30;

// ✅ Save filters to sessionStorage
function saveFiltersToSession() {
  const filters = {
    location: document.getElementById("locationSearch")?.value || "",
    type: document.getElementById("typeFilter")?.value || "",
    status: document.getElementById("statusFilter")?.value || "",
    price: document.getElementById("priceRange")?.value || "",
    viewAll: isViewAllClicked,
    page: currentPage,
  };
  sessionStorage.setItem("propertyFilters", JSON.stringify(filters));
}

// ✅ Load filters from sessionStorage and override with URL if present
function loadFiltersFromSession() {
  const saved = sessionStorage.getItem("propertyFilters");
  const urlParams = new URLSearchParams(window.location.search);
  const typeFromUrl = urlParams.get("type");

  if (saved) {
    const filters = JSON.parse(saved);
    document.getElementById("locationSearch").value = filters.location || "";
    document.getElementById("typeFilter").value = filters.type || "";
    document.getElementById("statusFilter").value = filters.status || "";
    document.getElementById("priceRange").value = filters.price || "";
    isViewAllClicked = filters.viewAll;
    currentPage = filters.page || 1;
  }

  // ✅ Override type if passed in URL
  if (typeFromUrl) {
    document.getElementById("typeFilter").value = typeFromUrl;
    // ✅ Remove query string from URL (prevents sticky filter)
    window.history.replaceState({}, document.title, "properties.html");
  }
}

// ✅ Render property cards
function renderProperties() {
  const container = document.getElementById("propertiesContainer");
  container.innerHTML = "";

  const filters = {
    location:
      document.getElementById("locationSearch")?.value.toLowerCase() || "",
    type: document.getElementById("typeFilter")?.value || "",
    status: document.getElementById("statusFilter")?.value || "",
    price: document.getElementById("priceRange")?.value || "",
  };

  let filtered = allProperties.filter((p) => {
    const matchLocation = p.location.toLowerCase().includes(filters.location);
    const matchType = !filters.type || p.type.includes(filters.type);
    const matchStatus = !filters.status || p.status === filters.status;

    let matchPrice = true;
    if (filters.price) {
      const [min, max] = filters.price.split("-").map(Number);
      const priceNum = parseInt(p.price.replace(/[^\d]/g, ""));
      matchPrice = priceNum >= min && priceNum <= max;
    }

    return matchLocation && matchType && matchStatus && matchPrice;
  });

  const itemsPerPage = isViewAllClicked ? perPageAfterViewAll : perPageDefault;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filtered.slice(start, end);

  pageItems.forEach((p) => {
    const badge = `<span class="badge-${
      p.status
    }">${p.status.toUpperCase()}</span>`;
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="property-card">
          ${badge}
          <img src="${p.image}" alt="${p.type}" />
          <h5 class="card-title mt-2">${p.price}</h5>
          <p class="card-text">${p.type}</p>
          <p class="card-text">${p.details}</p>
          <p class="card-text text-muted">${p.location}</p>
          <div class="d-flex justify-content-between gap-2 mt-3">
            <a href="property.html?id=${p.id}&from=properties" onclick="saveFiltersToSession()" class="btn btn-outline-primary w-100">👁 View Details</a>
            <button class="btn btn-outline-success w-100" onclick="contactAgent(${p.id})">📞 Contact</button>
          </div>
        </div>
      </div>
    `;
  });

  const paginationWrapper = document.getElementById("paginationWrapper");
  paginationWrapper.style.display = isViewAllClicked ? "block" : "none";
  buildPagination(totalPages);
}

// ✅ Build pagination
function buildPagination(totalPages) {
  const wrapper = document.getElementById("paginationWrapper");
  wrapper.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = `btn btn-sm ${
      i === currentPage ? "btn-primary" : "btn-outline-primary"
    } mx-1`;
    btn.textContent = i;
    btn.addEventListener("click", () => {
      currentPage = i;
      renderProperties();
      window.scrollTo({
        top: document.getElementById("properties").offsetTop - 100,
        behavior: "smooth",
      });
    });
    wrapper.appendChild(btn);
  }
}

// ✅ WhatsApp contact
function contactAgent(id) {
  const property = allProperties.find((p) => p.id === id);
  if (!property) return;
  const msg = `Hi! I'm interested in the ${property.type} at ${property.location}. Please provide more info.`;
  window.open(
    `https://wa.me/919999999999?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

// ✅ Init
document.addEventListener("DOMContentLoaded", () => {
  loadFiltersFromSession();
  renderProperties();

  const viewAllBtn = document.getElementById("viewAllBtn");
  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", () => {
      isViewAllClicked = true;
      currentPage = 1;
      viewAllBtn.style.display = "none";
      renderProperties();
    });
  }

  ["locationSearch", "typeFilter", "statusFilter", "priceRange"].forEach(
    (id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("change", () => {
          currentPage = 1;
          renderProperties();
        });
      }
    }
  );
});

// Show popup automatically on first visit (if not previously accepted)
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("cookiesAccepted")) {
    showCookiesPopup();
  }
});
function showCookiesPopup() {
  document.getElementById("cookiesPopup").style.display = "block";
}

function hideCookiesPopup() {
  document.getElementById("cookiesPopup").style.display = "none";
  localStorage.setItem("cookiesAccepted", "true");
}

function closeWelcomePopup() {
  document.getElementById("welcomePopup").style.display = "none";
  sessionStorage.setItem("welcomeShown", "true");
}

window.addEventListener("load", () => {
  if (!sessionStorage.getItem("welcomeShown")) {
    setTimeout(() => {
      document.getElementById("welcomePopup").style.display = "block";
    }, 300); // delay for smoother appearance
  }
});
