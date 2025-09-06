document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // Property filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            propertyCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Featured property slider
    let currentSlide = 0;
    const slides = [
        {
            image: 'https://via.placeholder.com/600x400',
            price: '$1,250,000',
            title: 'Luxury Beachfront Villa',
            address: '123 Coastal Drive, Malibu, CA',
            beds: 5,
            baths: 4,
            area: '4,200 sqft',
            description: 'Stunning beachfront villa with panoramic ocean views, private pool, and direct beach access. Modern architecture with high-end finishes throughout.'
        },
        {
            image: 'https://via.placeholder.com/600x400',
            price: '$850,000',
            title: 'Modern Mountain Retreat',
            address: '456 Alpine Way, Aspen, CO',
            beds: 4,
            baths: 3,
            area: '3,800 sqft',
            description: 'Luxurious mountain home with breathtaking views, gourmet kitchen, spa-like bathrooms, and a large outdoor entertaining area with fire pit.'
        },
        {
            image: 'https://via.placeholder.com/600x400',
            price: '$2,100,000',
            title: 'Exclusive Penthouse Suite',
            address: '789 Skyline Blvd, San Francisco, CA',
            beds: 3,
            baths: 3.5,
            area: '3,200 sqft',
            description: 'Stunning penthouse with floor-to-ceiling windows, private terrace, chef\'s kitchen, and panoramic city views from every room.'
        }
    ];

    const featuredSlider = document.querySelector('.featured-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    function updateSlider() {
        const slide = slides[currentSlide];
        
        featuredSlider.innerHTML = `
            <div class="featured-property">
                <div class="property-tag">Featured</div>
                <div class="property-image">
                    <img src="${slide.image}" alt="${slide.title}">
                    <div class="property-price">${slide.price}</div>
                </div>
                <div class="property-details">
                    <h3>${slide.title}</h3>
                    <p class="property-address"><i class="fas fa-map-marker-alt"></i> ${slide.address}</p>
                    <div class="property-features">
                        <span><i class="fas fa-bed"></i> ${slide.beds} Beds</span>
                        <span><i class="fas fa-bath"></i> ${slide.baths} Baths</span>
                        <span><i class="fas fa-ruler-combined"></i> ${slide.area}</span>
                    </div>
                    <p class="property-description">${slide.description}</p>
                    <a href="#" class="btn secondary">View Details</a>
                </div>
            </div>
        `;
    }

    if (featuredSlider && prevBtn && nextBtn) {
        updateSlider();

        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        });

        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        });

        // Auto rotate slides every 5 seconds
        setInterval(function() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }, 5000);
    }

    // Testimonial slider
    const testimonials = [
        {
            content: "WebAura Estates helped me find my dream home in just two weeks! Their knowledge of the local market and attention to my specific needs made the process smooth and enjoyable. I couldn't be happier with my new home.",
            author: "Robert Williams",
            position: "Homeowner",
            image: "https://via.placeholder.com/80x80"
        },
        {
            content: "I was impressed by the professionalism and dedication of the WebAura Estates team. They made selling my property a stress-free experience and got me a better price than I expected. Highly recommended!",
            author: "Jennifer Thompson",
            position: "Property Seller",
            image: "https://via.placeholder.com/80x80"
        },
        {
            content: "As a first-time homebuyer, I was nervous about the process, but the team at WebAura Estates guided me through every step. Their patience and expertise were invaluable, and I'm now happily settled in my perfect first home.",
            author: "Michael Chen",
            position: "First-time Buyer",
            image: "https://via.placeholder.com/80x80"
        }
    ];

    let currentTestimonial = 0;
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const dots = document.querySelectorAll('.testimonial-dots .dot');

    function updateTestimonial() {
        const testimonial = testimonials[currentTestimonial];
        
        testimonialSlider.innerHTML = `
            <div class="testimonial">
                <div class="testimonial-content">
                    <p>"${testimonial.content}"</p>
                </div>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.author}">
                    <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.position}</p>
                    </div>
                    <div class="testimonial-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
            </div>
        `;

        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
    }

    if (testimonialSlider && dots.length > 0) {
        updateTestimonial();

        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentTestimonial = index;
                updateTestimonial();
            });
        });

        // Auto rotate testimonials every 6 seconds
        setInterval(function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        }, 6000);
    }

    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        if (animated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = Math.ceil(target / (duration / 20)); // Update every 20ms
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    stat.textContent = count.toLocaleString();
                }
            }, 20);
        });
        
        animated = true;
    }

    // Trigger animation when stats section is in viewport
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        window.addEventListener('scroll', function() {
            const rect = statsSection.getBoundingClientRect();
            const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
            
            if (isInViewport) {
                animateStats();
            }
        });
    }

    // Property search form submission
    const propertySearchForm = document.getElementById('property-search');
    if (propertySearchForm) {
        propertySearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const propertyType = document.getElementById('property-type').value;
            const location = document.getElementById('location').value;
            const priceRange = document.getElementById('price-range').value;
            const bedrooms = document.getElementById('bedrooms').value;
            const bathrooms = document.getElementById('bathrooms').value;
            
            // In a real application, you would send these values to a server
            // For now, we'll just scroll to the properties section
            const propertiesSection = document.getElementById('properties');
            if (propertiesSection) {
                window.scrollTo({
                    top: propertiesSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Show a message to indicate search was performed
                alert(`Search performed with the following criteria:\nProperty Type: ${propertyType}\nLocation: ${location}\nPrice Range: ${priceRange}\nBedrooms: ${bedrooms}\nBathrooms: ${bathrooms}`);
            }
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const inquiryType = document.getElementById('inquiry-type').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send these values to a server
            // For now, we'll just show a success message
            alert(`Thank you for contacting us, ${name}! We will get back to you shortly.`);
            contactForm.reset();
        });
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email value
            const email = document.getElementById('newsletter-email').value;
            
            // In a real application, you would send this value to a server
            // For now, we'll just show a success message
            alert(`Thank you for subscribing to our newsletter with email: ${email}`);
            newsletterForm.reset();
        });
    }

    // Add hover effect to property cards
    const propertyImages = document.querySelectorAll('.property-card .property-image');
    propertyImages.forEach(image => {
        const overlay = image.querySelector('.property-overlay');
        if (overlay) {
            image.addEventListener('mouseenter', function() {
                overlay.style.opacity = '1';
            });
            
            image.addEventListener('mouseleave', function() {
                overlay.style.opacity = '0';
            });
        }
    });

    // Add to favorites functionality
    const saveButtons = document.querySelectorAll('.btn-save');
    saveButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                alert('Property added to favorites!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                alert('Property removed from favorites!');
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});