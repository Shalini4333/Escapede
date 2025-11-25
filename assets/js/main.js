new Swiper(".amenities-carousel", {
    effect: "horizontal",
    loop: true,
    slidesPerView: 3,
    spaceBetween: 5,
    speed: 600,
    grabCursor: true,
    autoplay: {
        delay: 3000,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    // pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true, // Makes dots clickable
    // },

    breakpoints: {
        0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        },
        575: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 3,
        },
    },
});


new Swiper(".locations-carousel", {
    effect: "horizontal",
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    speed: 600,
    grabCursor: true,
    autoplay: {
        delay: 3000,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true, // Makes dots clickable
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        },
        575: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 3,
        },
    },
});

function easeInOutQuint(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}
// Initialize Lenis
const lenis = new Lenis({
    duration: 1.5,
    easing: easeInOutQuint(),
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
};

requestAnimationFrame(raf);

(function ($) {
    'use strict'


    AOS.init({
        duration: 800,
        once: true,
    });



    $(".menu-button").on("click", function () {
        $(".menu-wrapper").toggleClass("menu-open");
        $(this).toggleClass("active");
        $(".overlay").toggleClass("active");
    });


    function setActiveLink() {
        let currentPath = window.location.pathname.toLowerCase();
        currentPath = currentPath.endsWith("/")
            ? currentPath + "index.html"
            : currentPath;

        const currentURL = window.location.origin + currentPath;


        $("header li a").each(function () {
            const linkURL = $(this).prop("href").toLowerCase();

            if (currentURL.replace(/\/[^\/]*$/, "/index.html") === linkURL) {
                $(this).closest("li").addClass("active");
                $(this).closest("div").addClass("active");
            }

            if (currentURL === linkURL) {
                $(this).closest("li").addClass("active");
                $(this).closest("div").addClass("active");

                $(this).parents("li.has-children").addClass("active");
            }
        });


        $(".projects-type-list a").each(function () {
            const linkURL = $(this).prop("href").toLowerCase();

            if (currentURL === linkURL) {
                $(this).closest("div").addClass("active");
            }

            if (currentURL.replace(/\/[^\/]*$/, "/index.html") === linkURL) {
                $(this).closest("li").addClass("active");
                $(this).closest("div").addClass("active");

            }
        });
    }
    $(document).ready(function () {
        setActiveLink();
    });
    // ----------------


    function setSectionMarginTop() {
        let headerHeight = $("header").outerHeight();
        $(".top-space-margin").css("margin-top", headerHeight);
    }
    setSectionMarginTop();


    // Header Sticky Function

    function toggleStickyHeader() {
        let mainHeader = $(".main-header");
        let headerHeight = mainHeader.outerHeight();
        let scroll = $(window).scrollTop();
        if (scroll > headerHeight) {
            mainHeader.addClass("sticky-header");
        } else {
            mainHeader.removeClass("sticky-header");
        }
    }

    $(window).on("scroll", toggleStickyHeader);
    $(window).on("load", toggleStickyHeader);

    // --------------


    // Counter function
    function startCounter(element) {
        $(element).counter({
            autoStart: true,
            duration: 3000,
            countFrom: 0,
            countTo: parseInt($(element).attr("data-count")),
            runOnce: true,
            easing: "easeInOutCubic",
        });
    }

    // Create the Intersection Observer
    let observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Element is in view, start the counter
                    startCounter(entry.target);
                    // Unobserve once the animation is done
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.5,
        }
    );

    // Apply observer to each counter element
    $(".counter").each(function () {
        observer.observe(this);
    });

    $(".animsition").animsition({
        inClass: "fade-in",
        outClass: "fade-out",
        inDuration: 1000,
        outDuration: 700,
        linkElement:
            'a:not([target="_blank"]):not([href^="#"]):not([href^="javascript:void(0);"]):not([href^="https://www.youtube.com/watch?v="])',
        // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
        loading: true,
        loadingParentElement: "body",
        loadingClass: "preloader",
        loadingInner:
            '<div class="loader"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ["animation-duration", "-webkit-animation-duration"],
        overlay: false,
        overlayParentElement: "body",
        transition: function (url) {
            window.location.href = url;
        },
    });



    if ($("#scrollToTop").length) {
        let scrollTrigger = 500,
            backToTop = function () {
                let scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $("#scrollToTop").addClass("show");
                } else {
                    $("#scrollToTop").removeClass("show");
                }
            };
        backToTop();
        $(window).on("scroll", function () {
            backToTop();
        });

        $("#scrollToTop").on("click", function (e) {
            e.preventDefault();
            window.scrollTo(0, 0);
        });
    }


    $('.jarallax').jarallax({
        speed: 0.75,
        imgSize: 'cover'
    });


    $('#projectBanner').jarallax({
        speed: 0.8,
        imgSize: 'cover'
    });




    const hero = new Swiper('.hero-slider', {
        effect: 'fade',
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });




    $('.gallery-grid').imagesLoaded(function () {
        $('.gallery-grid').masonry({
            itemSelector: '.gallery-item',
            columnWidth: '.gallery-item',
            gutter: 10,
            percentPosition: true,
        });
    });

    Fancybox.bind('[data-fancybox="gallery"]', {
        Thumbs: false,
        hideScrollbar: false,
    });

    window.renderRecaptchas = function () {
        document.querySelectorAll(".recaptcha-container").forEach((container) => {
            grecaptcha.render(container, {
                sitekey: "6LdcMd8qAAAAAFNixj2ptioDVJSHEjduYyKkpAnV"
            });
        });
    }

    $(document).ready(function () {

        function validateCheckboxes(groupName) {
            const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);
            const atLeastOneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

            checkboxes.forEach(checkbox => {
                if (atLeastOneChecked) {
                    checkbox.removeAttribute("required");
                } else {
                    checkbox.setAttribute("required", "required");
                }
            });
        }

        // Attach event listener correctly (only once)
        function setupCheckboxValidation(groupName) {
            const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener("change", () => validateCheckboxes(groupName));
            });

            // Run validation on page load
            validateCheckboxes(groupName);
        }

        // Initialize
        setupCheckboxValidation("purpose[]");
        setupCheckboxValidation("plot_size[]");






        const phoneNumberInputs = $(".phone-input");

        phoneNumberInputs.each(function (index) {
            const input = $(this);

            input.on('input', function () {
                const value = input.val();
                input.val(value.replace(/[^0-9]/g, ''));
                const inputValue = input.val().trim();

                if (!/^[0-9]{10}$/.test(inputValue)) {
                    input.addClass("is-invalid");
                    this.setCustomValidity("Invalid phone number.");
                    isFormValid = false;
                } else {
                    input.removeClass("is-invalid");
                    this.setCustomValidity("");
                }
            });
        });


        function handleFormSubmit(formId, URL) {
            $(`#${formId}`).on("submit", function (event) {
                event.preventDefault();

                let form = $(this);

                if (!form[0].checkValidity()) {
                    form.addClass("was-validated");
                    return false;
                }

                let submitButton = form.find("button[type='submit']");
                let originalButtonText = submitButton.html();
                let isSubmitting = true;

                window.onbeforeunload = function () {
                    if (isSubmitting) {
                        return "Your message is still being sent. Are you sure you want to leave this page?";
                    }
                };

                submitButton.html("Submitting...").prop("disabled", true);

                grecaptcha.ready(function () {
                    grecaptcha.execute("6LdcMd8qAAAAAFNixj2ptioDVJSHEjduYyKkpAnV", { action: "submit" }).then(function (token) {

                        let formData = form.serialize();
                        formData += "&recaptcha_response=" + token;

                        $.ajax({
                            type: "POST",
                            url: URL,
                            data: formData,
                            success: function (response) {
                                isSubmitting = false;
                                submitButton.html(originalButtonText).prop("disabled", false);

                                form.removeClass("was-validated").find(".is-valid, .is-invalid").removeClass("is-valid is-invalid");
                                form[0].reset();
                                window.onbeforeunload = null;
                                window.history.replaceState(null, null, window.location.href);

                                if (response.status === "success") {
                                    // window.location.href = "thankyou.html";
                                    alert("Your message has been sent successfully!");
                                } else {
                                    alert(response.message);
                                }

                                let modal = form.closest(".modal");
                                if (modal.length) {
                                    modal.modal("hide");
                                }
                            },
                            error: function (response) {
                                submitButton.html(originalButtonText).prop("disabled", false);
                                isSubmitting = false;
                                window.onbeforeunload = null;
                                console.error(response);
                            },
                        });
                    });
                });
            });
        }


        handleFormSubmit("contactForm", "assets/sendEmail.php");
        handleFormSubmit("scheduleVisitForm", "assets/sendScheduleVisitLead.php");


        function handleDownloadFileOnFormSubmit(formId, URL, downloadURL, subject) {
            $(document).on("submit", `#${formId}`, function (event) {
                event.preventDefault();

                let form = $(this);
                if (!form[0].checkValidity()) {
                    form.addClass("was-validated");
                    return false;
                }

                let submitButton = form.find("button[type='submit']");
                let originalButtonText = submitButton.html();
                let isSubmitting = true;

                window.onbeforeunload = function () {
                    if (isSubmitting) {
                        return "Your message is still being sent. Are you sure you want to leave this page?";
                    }
                };

                submitButton.text("Submitting...").prop("disabled", true);

                grecaptcha.ready(function () {
                    grecaptcha.execute("6LdcMd8qAAAAAFNixj2ptioDVJSHEjduYyKkpAnV", { action: "submit" }).then(function (token) {
                        let formData = form.serialize();
                        formData += "&subject=" + encodeURIComponent(subject);
                        formData += "&recaptcha_response=" + token;

                        $.ajax({
                            type: "POST",
                            url: URL,
                            data: formData,
                            success: (response) => {
                                submitButton.html(originalButtonText).prop("disabled", false);
                                alert("Your message has been sent successfully!");
                                form[0].reset();
                                form.removeClass("was-validated").find(".is-valid, .is-invalid").removeClass("is-valid is-invalid");
                                isSubmitting = false;
                                window.onbeforeunload = null;

                                if (response.status === "success") {
                                    const downloadUrl = `${downloadURL}?${formData}`;
                                    // window.location.href = "thankyou.html";

                                    window.location.href = downloadUrl;

                                } else {
                                    alert(response.message);
                                }

                                window.history.replaceState(null, null, window.location.href);

                                // Check if the form is inside a modal and hide the modal
                                let modal = form.closest(".modal");
                                if (modal.length) {
                                    modal.modal("hide");
                                }
                            },
                            error: function (response) {
                                submitButton.html(originalButtonText).prop("disabled", false);
                                isSubmitting = false;
                                window.onbeforeunload = null;
                                console.error(response);
                            },
                        });
                    });
                });

            });
        };

        handleDownloadFileOnFormSubmit("downloadBrochureForm", "assets/sendBrochureLog.php", "assets/download-brochure.php", "My Paloma: Brochure Download Enquiry");
        handleDownloadFileOnFormSubmit("downloadLayoutForm", "assets/sendBrochureLog.php", "assets/download-master-layout.php", "My Paloma: Master Layout Download Enquiry");

    });



    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
        form.addEventListener(
            "submit",
            (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add("was-validated");
            },
            false
        );
    });
})(jQuery);


// ---------- tooltip -----------
let tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// document.addEventListener('contextmenu', function (event) {
//     event.preventDefault();
// });
// document.addEventListener('keydown', function (event) {
//     if (event.key === "F12" ||
//         (event.ctrlKey && event.shiftKey && event.key === "I") ||
//         (event.ctrlKey && event.shiftKey && event.key === "J") ||
//         (event.ctrlKey && event.key === "U")) {
//         event.preventDefault();
//     }
// });

