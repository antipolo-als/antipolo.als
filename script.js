/* =========================================
   ALS – ANTIPOLO CITY
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       ELEMENTS
    ===================================== */

    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const backToTop = document.getElementById("backToTop");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");
    const revealElements = document.querySelectorAll(".reveal");
    const yearElement = document.getElementById("currentYear");


    /* =====================================
       MOBILE NAVIGATION
    ===================================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            menuToggle.classList.toggle("active", isOpen);

        });


        // Close menu when a navigation link is clicked
        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });


        // Close menu when clicking outside
        document.addEventListener("click", (event) => {

            const clickedInsideNav =
                mainNav.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);

            if (
                !clickedInsideNav &&
                !clickedMenuButton &&
                mainNav.classList.contains("open")
            ) {

                mainNav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =====================================
       HEADER SCROLL EFFECT
    ===================================== */

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (target === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================
       BACK TO TOP
    ===================================== */

    function handleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }

    window.addEventListener(
        "scroll",
        handleBackToTop,
        { passive: true }
    );

    handleBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================
       CURRENT YEAR
    ===================================== */

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =====================================
       SMOOTH INTERNAL LINKS
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================
       CARD STAGGER ANIMATION
    ===================================== */

    const cardGroups = [
        ".quick-grid .reveal",
        ".program-grid .reveal",
        ".announcement-grid .reveal"
    ];

    cardGroups.forEach(selector => {

        const cards =
            document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 80}ms`;

        });

    });


    /* =====================================
       ESC KEY - CLOSE MOBILE MENU
    ===================================== */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            mainNav &&
            mainNav.classList.contains("open")
        ) {

            mainNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.focus();

        }

    });

});