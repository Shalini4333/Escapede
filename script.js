document.addEventListener("DOMContentLoaded", function () {
  // --- Navbar Functionality ---
  const navbar = document.getElementById("navbar");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  // Change navbar background on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Toggle mobile menu
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // --- Text Animation Functionality ---
  function resetTypewriter() {
    const typewriter = document.querySelector(".typewriter");
    typewriter.style.animation = "none";
    void typewriter.offsetWidth; // Trigger reflow
    typewriter.style.animation =
      "typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite";
  }

  // Reset typewriter when scrolling to the hero section
  const heroSection = document.getElementById("home");
  const typewriterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resetTypewriter();
        }
      });
    },
    { threshold: 0.5 }
  );

  typewriterObserver.observe(heroSection);

  // --- Back to Top Button ---
  const backToTop = document.getElementById("backToTop");
  const backToTopButton = document.getElementById("callNowBtn");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
      backToTopButton.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
      backToTopButton.classList.remove("visible");
    }
  });

  // --- Lazy Loading ---
  const lazyImages = document.querySelectorAll(".lazy-load");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });

  // --- Intersection Observer for Animations ---
  const animatedElements = document.querySelectorAll(".fade-in-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // --- Initialize Inline Carousel ---
  initializeInlineCarousel();

  // --- Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// --- Lightbox Functionality (for bento grid) ---
let currentImageIndex = 0;
const bentoImages = [
  {
    src: "assets/newimages/new2/DSC_0048.JPG",
    caption: "Escapade - Scenic Landscape View",
  },
  {
    src: "assets/newimages/WhatsApp Image 2025-07-03 at 6.27.24 PM (1).jpeg",
    caption: "Escapade - Development Progress",
  },
  {
    src: "assets/newimages/new2/DSC_0021.JPG",
    caption: "Escapade - Natural Environment",
  },
  {
    src: "assets/newimages/WhatsApp Image 2025-01-18 at 6.12.39 PM.jpeg",
    caption: "Escapade - Plot Infrastructure",
  },
  {
    src: "assets/newimages/WhatsApp Image 2025-07-03 at 6.27.25 PM.jpeg",
    caption: "Escapade - Road Development",
  },
];

const galleryImages = [
  {
    src: "assets/newimages/new2/DSC_0039.JPG",
    caption: "Escapade - Site Overview",
  },
  {
    src: "assets/newimages/WhatsApp Image 2025-07-03 at 6.27.24 PM.jpeg",
    caption: "Escapade - Project Planning",
  },
  {
    src: "assets/newimages/new2/DSC_0025.JPG",
    caption: "Escapade - Green Spaces",
  },
  {
    src: "assets/newimages/WhatsApp Image 2025-01-18 at 6.12.39 PM (1).jpeg",
    caption: "Escapade - Construction Progress",
  },
  {
    src: "assets/newimages/WhatsApp Image 2025-07-03 at 6.27.25 PM (1).jpeg",
    caption: "Escapade - Access Roads",
  },
  {
    src: "assets/newimages/new2/DSC_0034.JPG",
    caption: "Escapade - Terrain Features",
  },
  {
    src: "assets/newimages/WhatsApp Image 2025-07-04 at 3.41.04 PM (1).jpeg",
    caption: "Escapade - Plot Layout View",
  },
  {
    src: "assets/newimages/WhatsApp Image 2025-07-03 at 6.27.24 PM (2).jpeg",
    caption: "Escapade - Site Preparation",
  },
  {
    src: "assets/newimages/new2/DSC_0020.JPG",
    caption: "Escapade - Boundary Marking",
  },
  {
    src: "assets/newimages/WhatsApp Image 2025-07-03 at 6.27.23 PM.jpeg",
    caption: "Escapade - Future Development Area",
  },
];

function openLightbox(imageIndex) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const captionText = document.getElementById("lightbox-caption-text");
  const currentImgNum = document.getElementById("current-img");
  currentImageIndex = imageIndex;

  // Always update modal image and caption
  lightboxImg.src = bentoImages[imageIndex].src;
  captionText.textContent = bentoImages[imageIndex].caption;
  currentImgNum.textContent = imageIndex + 1;
  document.getElementById("total-imgs").textContent = bentoImages.length;

  // Show modal if not already visible
  if (lightbox.style.display !== "block") {
    lightbox.style.display = "block";
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyPress);
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
  document.body.style.overflow = ""; // Re-enable scrolling

  // Remove keyboard event listener
  document.removeEventListener("keydown", handleKeyPress);
}

function changeImage(direction) {
  currentImageIndex += direction;

  // Handle wrapping around the bento gallery
  if (currentImageIndex < 0) {
    currentImageIndex = bentoImages.length - 1;
  } else if (currentImageIndex >= bentoImages.length) {
    currentImageIndex = 0;
  }

  const lightboxImg = document.getElementById("lightbox-img");
  const captionText = document.getElementById("lightbox-caption-text");
  const currentImgNum = document.getElementById("current-img");

  // Apply a small fade effect
  lightboxImg.style.opacity = "0.3";

  setTimeout(() => {
    lightboxImg.src = bentoImages[currentImageIndex].src;
    captionText.textContent = bentoImages[currentImageIndex].caption;
    currentImgNum.textContent = currentImageIndex + 1;
    lightboxImg.style.opacity = "1";
  }, 200);
}

function handleKeyPress(e) {
  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowLeft") {
    changeImage(-1);
  } else if (e.key === "ArrowRight") {
    changeImage(1);
  }
}

// --- Inline Carousel Functionality ---
let currentCarouselIndex = 0;

function initializeInlineCarousel() {
  const carouselImages = document.getElementById("carouselImagesInline");
  const carouselIndicators = document.getElementById(
    "carouselIndicatorsInline"
  );

  if (!carouselImages || !carouselIndicators) return;

  // Clear existing content
  carouselImages.innerHTML = "";
  carouselIndicators.innerHTML = "";

  // Create first image
  if (galleryImages.length > 0) {
    const img = document.createElement("img");
    img.src = galleryImages[0].src;
    img.alt = galleryImages[0].caption;
    img.className = "lazy-load";
    carouselImages.appendChild(img);
  }

  // Create indicator dots
  galleryImages.forEach((image, index) => {
    const dot = document.createElement("div");
    dot.className = `carousel-dot ${index === 0 ? "active" : ""}`;
    dot.onclick = () => goToCarouselSlide(index);
    carouselIndicators.appendChild(dot);
  });

  currentCarouselIndex = 0;
}

function nextCarouselImage() {
  const carouselImages = document.getElementById("carouselImagesInline");
  const dots = document.querySelectorAll(
    "#carouselIndicatorsInline .carousel-dot"
  );

  if (dots.length === 0) return;

  dots[currentCarouselIndex].classList.remove("active");
  currentCarouselIndex = (currentCarouselIndex + 1) % galleryImages.length;
  dots[currentCarouselIndex].classList.add("active");

  // Update image
  const img = carouselImages.querySelector("img");
  if (img) {
    img.src = galleryImages[currentCarouselIndex].src;
    img.alt = galleryImages[currentCarouselIndex].caption;
  }
}

function prevCarouselImage() {
  const carouselImages = document.getElementById("carouselImagesInline");
  const dots = document.querySelectorAll(
    "#carouselIndicatorsInline .carousel-dot"
  );

  if (dots.length === 0) return;

  dots[currentCarouselIndex].classList.remove("active");
  currentCarouselIndex =
    currentCarouselIndex === 0
      ? galleryImages.length - 1
      : currentCarouselIndex - 1;
  dots[currentCarouselIndex].classList.add("active");

  // Update image
  const img = carouselImages.querySelector("img");
  if (img) {
    img.src = galleryImages[currentCarouselIndex].src;
    img.alt = galleryImages[currentCarouselIndex].caption;
  }
}

function goToCarouselSlide(index) {
  const carouselImages = document.getElementById("carouselImagesInline");
  const dots = document.querySelectorAll(
    "#carouselIndicatorsInline .carousel-dot"
  );

  if (dots.length === 0) return;

  dots[currentCarouselIndex].classList.remove("active");
  currentCarouselIndex = index;
  dots[currentCarouselIndex].classList.add("active");

  // Update image
  const img = carouselImages.querySelector("img");
  if (img) {
    img.src = galleryImages[currentCarouselIndex].src;
    img.alt = galleryImages[currentCarouselIndex].caption;
  }
}

// --- Contact Modal Functionality ---
function openModal() {
  const modal = document.getElementById("contactModal");
  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });
}

function openBrochureModal() {
  console.log("inside brochure");
  const modal = document.getElementById("download-brochure");
  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.getElementById("contactModal");
  modal.style.display = "none";
  document.body.style.overflow = "";

  // Clear form
  document.getElementById("contactForm").reset();

  // Remove any alert messages
  const existingAlerts = modal.querySelectorAll(".alert");
  existingAlerts.forEach((alert) => alert.remove());
}

function closeBrochureModal() {
  console.log("close brochure");
  const modal = document.getElementById("download-brochure");
  modal.style.display = "none";
  document.body.style.overflow = "";

  // Clear form
  document.getElementById("brochureForm").reset();

  // Remove any alert messages
  const existingAlerts = modal.querySelectorAll(".alert");
  existingAlerts.forEach((alert) => alert.remove());
}

function closeSiteVisitModal() {
  const modal = document.getElementById("Site-visit");
  modal.style.display = "none";
  document.body.style.overflow = "";

  // Clear form
  document.getElementById("siteVisitForm").reset();

  // Remove any alert messages
  const existingAlerts = modal.querySelectorAll(".alert");
  existingAlerts.forEach((alert) => alert.remove());
}

function showAlert(message, type = "success") {
  const alertModal = document.getElementById("alertModal");
  const alertMessage = document.getElementById("alertMessage");
  alertMessage.innerHTML = "";
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.style.padding = "24px 16px";
  alertDiv.style.borderRadius = "10px";
  alertDiv.style.fontWeight = "600";
  alertDiv.style.textAlign = "center";
  alertDiv.style.fontSize = "1.1rem";
  alertDiv.style.boxShadow = "0 4px 24px rgba(0,0,0,0.10)";
  alertDiv.style.margin = "40px 0 0 0";
  if (type === "success") {
    alertDiv.style.background = "#d1fae5";
    alertDiv.style.color = "#065f46";
  } else if (type === "failed" || type === "error") {
    alertDiv.style.background = "#fee2e2";
    alertDiv.style.color = "#991b1b";
  } else if (type === "warning") {
    alertDiv.style.background = "#fef3c7";
    alertDiv.style.color = "#92400e";
  }
  alertDiv.textContent = message;
  alertMessage.appendChild(alertDiv);
  alertModal.style.display = "flex";
  document.body.style.overflow = "hidden";
  if (type === "success") {
    setTimeout(() => {
      closeAlertModal();
    }, 3000);
  }
}

function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

function submitEnquiry(formData) {
  // Create API data object (same format as your working Postman test)
  const apiData = {
    signature: {
      api_key: "98218a7c7f25fe2",
      timestamp: getCurrentDate(),
      pkey: "30198b76a3b80cc",
    },
    action: "addenquiry",
    data: {
      request: {
        requester_email: formData.email,
        requester_first_name: formData.firstName,
        requester_last_name: formData.lastName,
        requester_phone: formData.phone,
        request_type: formData.requestType,
        request_details:
          formData.message ||
          "Contact form submission from Right Choice Escapade website",
      },
    },
  };

  // Show loading state
  const submitBtn = document.getElementById("submitBtn");
  const submitText = document.getElementById("submitText");
  const loadingText = document.getElementById("loadingText");

  submitBtn.disabled = true;
  submitText.style.display = "none";
  loadingText.style.display = "inline";

  const timestamp = getCurrentDate();

  const request = {
    requester_email: formData.email,
    requester_first_name: formData.firstName,
    requester_last_name: formData.lastName,
    requester_phone: formData.phone,
    request_type: formData.requestType,
    request_details:
      formData.message ||
      "Contact form submission from Right Choice Escapade website",
  };
  var newData =
    `{
      "signature": {
          "api_key": "98218a7c7f25fe2" ,
          "timestamp": "` +
    timestamp +
    `",
          "pkey": "30198b76a3b80cc"
      },
      "action": "addenquiry",
      "data": {
        "request": ` +
    JSON.stringify(request) +
    `
      }
  }`;

  //   delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

  $.ajax({
    type: "post",
    url: "https://crm.rightchoicegroup.in/api/enquiry",
    data: newData,

    success: function (response) {
      if (response.code === 0) {
        closeModal();
        closeBrochureModal();
        closeSiteVisitModal();
        showAlert(
          "Thank you for your enquiry! We will get back to you soon.",
          "success"
        );
      } else {
        closeModal();
        closeBrochureModal();
        closeSiteVisitModal();
        showAlert(
          "There was an error submitting your enquiry. Please try again.",
          "failed"
        );
      }
    },
    error: function (response) {
      closeModal();
      closeBrochureModal();
      closeSiteVisitModal();
      showAlert(
        "There was an error submitting your enquiry. Please try again.",
        "failed"
      );
    },
    complete: function () {
      // Reset button state in both success/error cases
      submitBtn.disabled = false;
      submitText.style.display = "inline";
      loadingText.style.display = "none";
    },
  });
  // $.ajaxSetup({
  //   headers: {
  //     'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
  //   }
  // });

  // Use fetch API instead of jQuery AJAX
  //   fetch("https://crm.rightchoicegroup.in/api/enquiry", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: newData,
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Success:", data);
  //       if (data.code === 0) {
  //         showAlert(
  //           "Thank you for your enquiry! We will get back to you soon.",
  //           "success"
  //         );
  //       } else {
  //         showAlert(
  //           "There was an error submitting your enquiry. Please try again.",
  //           "error"
  //         );
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error: igguug", error);
  //       showAlert(
  //         "There was an error submitting your enquiry. Please try again.",
  //         "error"
  //       );
  //     })
  //     .finally(() => {
  //       // Reset button state
  //       submitBtn.disabled = false;
  //       submitText.style.display = "inline";
  //       loadingText.style.display = "none";
  //     });
}

// Handle form submission
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const siteVisitForm = document.getElementById("siteVisitForm");
  const brochureForm = document.getElementById("brochureForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      requestType: document.getElementById("requestType").value,
      message: document.getElementById("message").value,
    };

    submitEnquiry(formData);
  });

  if (siteVisitForm) {
    siteVisitForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = {
        firstName: siteVisitForm.querySelector("#firstName").value,
        lastName: siteVisitForm.querySelector("#lastName").value,
        email: siteVisitForm.querySelector("#email").value,
        phone: siteVisitForm.querySelector("#phone").value,
        requestType: siteVisitForm.querySelector("#requestType").value,
        message: siteVisitForm.querySelector("#message").value,
      };
      submitEnquiry(formData);
    });
  }

  if (brochureForm) {
    brochureForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = {
        firstName: brochureForm.querySelector("#firstName").value,
        lastName: brochureForm.querySelector("#lastName").value,
        email: brochureForm.querySelector("#email").value,
        phone: brochureForm.querySelector("#phone").value,
        requestType: brochureForm.querySelector("#requestType").value,
        message: brochureForm.querySelector("#message").value,
      };
      submitEnquiry(formData);
    });
  }

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const modal = document.getElementById("contactModal");
      if (modal.style.display === "block") {
        closeModal();
      }
    }
  });
});
