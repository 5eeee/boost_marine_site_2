// Основные скрипты для сайта Boost Marine (обновлённая версия)

document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== МОБИЛЬНОЕ МЕНЮ ====================
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const body = document.body;
  let menuOverlay = document.querySelector('.menu-overlay');

  // Создаем оверлей, если его нет
  if (!menuOverlay) {
    menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
  }

  // Для кнопки связи на мобильных
  const contactToggle = document.querySelector('.contact-toggle');
  const mobileContactBtn = document.querySelector('.mobile-contact-btn');

  // Открытие/закрытие мобильного меню
  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      
      // Закрываем меню контактов, если оно открыто
      if (mobileContactBtn && mobileContactBtn.classList.contains('active')) {
        mobileContactBtn.classList.remove('active');
      }
      
      // Переключаем мобильное меню
      this.classList.toggle('active');
      mobileNav.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      
      // Блокируем скролл на body при открытом меню
      if (mobileNav.classList.contains('active')) {
        body.classList.add('menu-open');
        body.style.overflow = 'hidden';
      } else {
        body.classList.remove('menu-open');
        body.style.overflow = '';
      }
    });
    
    // Закрытие меню при клике на ссылку в мобильном меню
    const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
        
        // Также закрываем меню контактов, если оно открыто
        if (mobileContactBtn && mobileContactBtn.classList.contains('active')) {
          mobileContactBtn.classList.remove('active');
        }
      });
    });
    
    // Закрытие меню при клике на оверлей
    menuOverlay.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      this.classList.remove('active');
      body.classList.remove('menu-open');
      body.style.overflow = '';
      
      // Также закрываем меню контактов, если оно открыто
      if (mobileContactBtn && mobileContactBtn.classList.contains('active')) {
        mobileContactBtn.classList.remove('active');
      }
    });
    
    // Закрытие меню при клике вне меню
    document.addEventListener('click', function(e) {
      if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target) && mobileNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
      }
    });
    
    // Закрытие меню при нажатии на ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
        
        if (mobileContactBtn && mobileContactBtn.classList.contains('active')) {
          mobileContactBtn.classList.remove('active');
        }
      }
    });
  }

  // Кнопка контактов для мобильных
  if (contactToggle && mobileContactBtn) {
    contactToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      
      // Закрываем меню навигации, если оно открыто
      if (menuToggle && mobileNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
      }
      
      // Открываем/закрываем меню контактов
      mobileContactBtn.classList.toggle('active');
    });
    
    // Закрытие меню контактов при клике вне
    document.addEventListener('click', function(e) {
      if (!mobileContactBtn.contains(e.target) && mobileContactBtn.classList.contains('active')) {
        mobileContactBtn.classList.remove('active');
      }
    });
    
    // Закрытие меню контактов при клике на ссылку
    const contactLinks = mobileContactBtn.querySelectorAll('.mobile-contact-link');
    contactLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileContactBtn.classList.remove('active');
      });
    });
  }
  
  // ==================== ПЛАВНЫЙ СКРОЛЛ ДЛЯ ВСЕХ ССЫЛОК ====================
  // Функция для плавного скролла
  function smoothScrollTo(targetId, e) {
    if (targetId === '#' || targetId.startsWith('http')) return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      if (e) e.preventDefault();
      
      // Закрываем мобильное меню, если оно открыто
      if (menuToggle && mobileNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
      }
      
      // Закрываем меню контактов, если оно открыто
      if (mobileContactBtn && mobileContactBtn.classList.contains('active')) {
        mobileContactBtn.classList.remove('active');
      }
      
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  // Обработчики для всех якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      smoothScrollTo(this.getAttribute('href'), e);
    });
  });
  
  // Обработчики для навигации в шапке
  const headerNavLinks = document.querySelectorAll('.header-nav .nav__link');
  headerNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      smoothScrollTo(this.getAttribute('href'), e);
    });
  });
  
  // ==================== ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА ====================
  if (document.querySelector('.works-slider')) {
    const worksSlider = new Swiper('.works-slider', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    });
  }
  
  // ==================== АНИМАЦИЯ ПРИ СКРОЛЛЕ ====================
  const fadeElements = document.querySelectorAll('.service-card, .team-member, .section-header, .contact-item, .onsite-feature');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(el => {
    if (el) observer.observe(el);
  });
  
  // ==================== ИЗМЕНЕНИЕ ШАПКИ ПРИ СКРОЛЛЕ ====================
  const header = document.querySelector('.header');
  
  function updateHeader() {
    if (!header) return;
    
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Показываем кнопку "Наверх"
    if (scrollToTopBtn) {
      if (scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
    
    // Подсветка активного раздела в навигации
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.header-nav .nav__link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });
    
    // Подсветка в десктопной навигации
    desktopNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
    
    // Подсветка в мобильной навигации
    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateHeader);
  updateHeader(); // Инициализация при загрузке
  
  // ==================== КНОПКА "НАВЕРХ" ====================
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.setAttribute('aria-label', 'Наверх');
  document.body.appendChild(scrollToTopBtn);
  
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // ==================== АДАПТИВНОСТЬ ГЛАВНОГО ЭКРАНА ====================
  function setHeroHeight() {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.height = '100vh';
    }
  }
  
  setHeroHeight();
  window.addEventListener('resize', setHeroHeight);
  
  // ==================== ОПТИМИЗАЦИЯ ИЗОБРАЖЕНИЙ ====================
  function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.loading = 'lazy';
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      
      img.onload = function() {
        this.style.opacity = '1';
      };
      
      if (img.complete) {
        img.style.opacity = '1';
      }
    });
  }
  
  preloadImages();
  
  // ==================== ИНИЦИАЛИЗАЦИЯ КАРТОЧЕК С АНИМАЦИЕЙ ====================
  setTimeout(() => {
    const serviceCards = document.querySelectorAll('.service-card');
    const teamMembers = document.querySelectorAll('.team-member');
    
    serviceCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 100);
    });
    
    teamMembers.forEach((member, index) => {
      setTimeout(() => {
        member.classList.add('visible');
      }, index * 150);
    });
  }, 300);
  
  // ==================== ПЛАВНОЕ ПОЯВЛЕНИЕ ВСЕГО КОНТЕНТА ====================
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
  
  // ==================== ОБРАБОТКА КАРТОЧЕК УСЛУГ ====================
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (!e.target.closest('a') && this.querySelector('a')) {
        const link = this.querySelector('a');
        if (link) {
          window.location.href = link.getAttribute('href');
        }
      }
    });
  });
  
  // ==================== ВИДЖЕТ TELEGRAM ====================
  const telegramWidget = document.querySelector('.telegram-widget');
  if (telegramWidget) {
    telegramWidget.addEventListener('click', function(e) {
      if (window.innerWidth <= 767) {
        // На мобильных сразу открываем ссылку
        return;
      }
      e.preventDefault();
      window.open('https://t.me/boostmarinegroup', '_blank');
    });
  }
  
  // ==================== АДАПТИВНОСТЬ НАВИГАЦИИ ====================
  function checkWindowSize() {
    const windowWidth = window.innerWidth;
    
    // Если ширина экрана больше 767px и мобильное меню открыто - закрываем его
    if (windowWidth > 767) {
      if (menuToggle && mobileNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
      }
      
      // Закрываем меню контактов на мобильных
      if (mobileContactBtn && mobileContactBtn.classList.contains('active')) {
        mobileContactBtn.classList.remove('active');
      }
    }
  }
  
  // Проверяем размер окна при загрузке и изменении размера
  window.addEventListener('resize', checkWindowSize);
  checkWindowSize();
  
  console.log('Boost Marine website loaded successfully!');
});