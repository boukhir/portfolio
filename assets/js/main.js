(function() {
  "use strict";

  /**
   * ---------------------------------------------------------------------------------
   * HELPER FUNCTIONS
   * ---------------------------------------------------------------------------------
   */

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    });
  };


  /**
   * ---------------------------------------------------------------------------------
   * NAVIGATION
   * ---------------------------------------------------------------------------------
   */
  const Navigation = (() => {
    const navbarlinks = select('#navbar .scrollto', true);

    const navbarlinksActive = () => {
      let position = window.scrollY + 200;
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return;
        let section = select(navbarlink.hash);
        if (!section) return;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active');
        } else {
          navbarlink.classList.remove('active');
        }
      });
    };

    const mobileNavToggle = () => {
      on('click', '.mobile-nav-toggle', function(e) {
        select('body').classList.toggle('mobile-nav-active');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
      });
    };

    const scrollToLinks = () => {
      on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
          e.preventDefault();
          let body = select('body');
          if (body.classList.contains('mobile-nav-active')) {
            body.classList.remove('mobile-nav-active');
            let navbarToggle = select('.mobile-nav-toggle');
            navbarToggle.classList.toggle('bi-list');
            navbarToggle.classList.toggle('bi-x');
          }
          scrollto(this.hash);
        }
      }, true);
    };

    const scrollToHashOnLoad = () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash);
        }
      }
    };

    const init = () => {
      window.addEventListener('load', navbarlinksActive);
      onscroll(document, navbarlinksActive);
      mobileNavToggle();
      scrollToLinks();
      window.addEventListener('load', scrollToHashOnLoad);
    };

    return { init };
  })();


  /**
   * ---------------------------------------------------------------------------------
   * UI COMPONENTS & EFFECTS
   * ---------------------------------------------------------------------------------
   */

  const TypedEffect = (() => {
    const init = () => {
      const typedElement = select('.typed');
      if (typedElement) {
        let typed_strings = typedElement.getAttribute('data-typed-items');
        typed_strings = typed_strings.split(',');
        new Typed('.typed', {
          strings: typed_strings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
      }
    };
    return { init };
  })();

  const BackToTopButton = (() => {
    const backtotop = select('.back-to-top');
    const init = () => {
      if (backtotop) {
        const toggleBacktotop = () => {
          if (window.scrollY > 100) {
            backtotop.classList.add('active');
          } else {
            backtotop.classList.remove('active');
          }
        };
        window.addEventListener('load', toggleBacktotop);
        onscroll(document, toggleBacktotop);
      }
    };
    // Expose backtotop element for GSAP if needed outside
    return { init, getElement: () => backtotop };
  })();


  const Preloader = (() => {
    const preloaderElement = select('#preloader');
    const init = () => {
      if (preloaderElement) {
        window.addEventListener('load', () => {
          preloaderElement.remove();
        });
      }
    };
    return { init };
  })();

  const TestimonialsSlider = (() => {
    const init = () => {
      new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      });
    };
    return { init };
  })();


  /**
   * ---------------------------------------------------------------------------------
   * GSAP ANIMATIONS
   * ---------------------------------------------------------------------------------
   */
  const GSAPAnimations = (() => {
    const animateSectionTitles = () => {
      select('.section-title h2', true).forEach(title => {
        gsap.from(title, {
          scrollTrigger: { trigger: title, start: "top 80%", toggleActions: "play none none none" },
          opacity: 0, y: 50, duration: 0.6, ease: "power3.out"
        });
      });
      select('.section-title p', true).forEach(p => {
        gsap.from(p, {
          scrollTrigger: { trigger: p, start: "top 85%", toggleActions: "play none none none" },
          opacity: 0, y: 40, duration: 0.7, delay: 0.2, ease: "power3.out"
        });
      });
    };

    const animateHeroSection = () => {
      gsap.from("#hero h1", { duration: 1, y: 50, opacity: 0, ease: "power3.out", delay: 0.2 });
      gsap.from("#hero p", { duration: 1, y: 50, opacity: 0, ease: "power3.out", delay: 0.4 });
      gsap.from("#hero .social-links a", { duration: 0.8, y: 30, opacity: 0, stagger: 0.15, ease: "power3.out", delay: 0.7 });
    };

    const animateAboutSection = () => {
      gsap.from(".about .profile-img", {
        scrollTrigger: { trigger: ".about .profile-img", start: "top 80%", toggleActions: "play none none none" },
        opacity: 0, scale: 0.8, duration: 0.8, ease: "power3.out"
      });
      gsap.from(".about .content h3", {
        scrollTrigger: { trigger: ".about .content h3", start: "top 80%", toggleActions: "play none none none" },
        opacity: 0, y: 30, duration: 0.7, ease: "power3.out"
      });
      gsap.from(".about .content .row > div > ul > li", {
        scrollTrigger: { trigger: ".about .content .row > div > ul", start: "top 85%", toggleActions: "play none none none" },
        opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: "power3.out"
      });
      gsap.from(".about .content hr", {
        scrollTrigger: { trigger: ".about .content hr", start: "top 90%", toggleActions: "play none none none" },
        width: "0%", duration: 1, stagger: 0.3, ease: "power2.inOut"
      });
    };

    const animateSkillsSection = () => {
      select('.skills .skill-category', true).forEach((category, index) => {
        gsap.from(category, {
          scrollTrigger: { trigger: category, start: "top 85%", toggleActions: "play none none none" },
          opacity: 0, y: 50, duration: 0.6, delay: index * 0.1, ease: "power3.out"
        });
      });
      // Initial animation for skill icons in tabs (if visible on load)
      select('.detailed-skill-category img', true).forEach(icon => {
        gsap.from(icon, {
          scrollTrigger: { trigger: icon, start: "top 90%", toggleActions: "play none none none" },
          opacity: 0, scale: 0.5, y: 30, duration: 0.5, ease: "power2.out", stagger: 0.05
        });
      });
    };

    const animateResumeSection = () => {
      select('.resume .resume-item', true).forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" },
          opacity: 0, x: -50, duration: 0.7, delay: index * 0.15, ease: "power3.out"
        });
      });
    };

    const animatePortfolioSection = () => {
      gsap.from(".portfolio-details .portfolio-image-container img", {
        scrollTrigger: { trigger: ".portfolio-details .portfolio-image-container img", start: "top 80%", toggleActions: "play none none none" },
        opacity: 0, scale: 0.9, duration: 0.8, ease: "power3.out"
      });
      gsap.from(".portfolio-details .row.mt-4 > div", {
        scrollTrigger: { trigger: ".portfolio-details .row.mt-4", start: "top 80%", toggleActions: "play none none none" },
        opacity: 0, y: 40, duration: 0.7, stagger: 0.2, ease: "power3.out"
      });
    };

    const animateContactSection = () => {
      gsap.from(".contact .info > div", {
        scrollTrigger: { trigger: ".contact .info", start: "top 80%", toggleActions: "play none none none" },
        opacity: 0, y: 50, duration: 0.6, stagger: 0.2, ease: "power3.out"
      });
      gsap.from(".testimonials .swiper-slide", {
        scrollTrigger: { trigger: ".testimonials", start: "top 80%", toggleActions: "play none none none" },
        opacity: 0, scale: 0.85, duration: 0.8, stagger: 0.2, ease: "elastic.out(1, 0.75)"
      });
    };

    const microInteractions = () => {
      // Nav menu links hover
      select('.nav-menu a', true).forEach(navLink => {
        const icon = navLink.querySelector('i');
        const span = navLink.querySelector('span');
        navLink.addEventListener('mouseenter', () => {
          if (icon) gsap.to(icon, { scale: 1.2, duration: 0.3, color: "#f1c40f", ease: "power2.out" });
          if (span) gsap.to(span, { x: 5, duration: 0.3, color: "#f1c40f", ease: "power2.out" });
        });
        navLink.addEventListener('mouseleave', () => {
          if (icon) gsap.to(icon, { scale: 1, duration: 0.3, color: "", ease: "power2.out" });
          if (span && !navLink.classList.contains('active') && !(navLink.closest('li:hover'))) {
            if (window.innerWidth >= 992) {
              gsap.to(span, { x: 0, duration: 0.3, color: "", ease: "power2.out" });
            } else {
              gsap.to(span, { x: 0, duration: 0.3, color: "", ease: "power2.out" });
            }
          } else if (span) {
            gsap.to(span, { x: 0, duration: 0.3, color: "", ease: "power2.out" });
          }
        });
      });

      // Social links hover
      select('.social-links a', true).forEach(socialLink => {
        const icon = socialLink.querySelector('i');
        socialLink.addEventListener('mouseenter', () => {
          gsap.to(icon, { y: -5, scale: 1.1, duration: 0.3, color: "#2ecc71", ease: "power2.out" });
        });
        socialLink.addEventListener('mouseleave', () => {
          gsap.to(icon, { y: 0, scale: 1, duration: 0.3, color: "", ease: "power2.out" });
        });
      });

      // Back to top button hover
      const backtotopElement = BackToTopButton.getElement();
      if (backtotopElement) {
        backtotopElement.addEventListener('mouseenter', () => {
          gsap.to(backtotopElement, { scale: 1.1, backgroundColor: "#2ecc71", duration: 0.3, ease: "power2.out" });
        });
        backtotopElement.addEventListener('mouseleave', () => {
          gsap.to(backtotopElement, { scale: 1, backgroundColor: "#3498db", duration: 0.3, ease: "power2.out" });
        });
      }

      // Animated skill icons on tab click (MDB specific)
      const skillTabs = select('.nav-tabs .nav-link', true);
      skillTabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', event => {
          const paneId = event.target.getAttribute('href');
          const iconsInPane = select(`${paneId} img`, true);
          gsap.fromTo(iconsInPane,
            { opacity: 0, scale: 0.3, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out", delay: 0.1 }
          );
        });
      });
      // Initial animation for the default active tab's icons
      const activeTabPaneIcons = select('.tab-pane.active.show .detailed-skill-category img', true);
      if (activeTabPaneIcons.length > 0) {
        gsap.fromTo(activeTabPaneIcons,
          { opacity: 0, scale: 0.3, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out", delay: 0.2 }
        );
      }
    };

    const init = () => {
      gsap.registerPlugin(ScrollTrigger);
      animateSectionTitles();
      animateHeroSection();
      animateAboutSection();
      animateSkillsSection();
      animateResumeSection();
      animatePortfolioSection();
      animateContactSection();
      microInteractions();
    };

    return { init };
  })();

  /**
   * ---------------------------------------------------------------------------------
   * INITIALIZATION
   * ---------------------------------------------------------------------------------
   */
  document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    TypedEffect.init();
    BackToTopButton.init();
    Preloader.init();
    TestimonialsSlider.init();
    GSAPAnimations.init();
  });

})();
