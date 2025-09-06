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
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
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
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            header.style.height = '70px';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.height = '80px';
        }
    });

    // Course filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    if (filterButtons.length > 0 && courseCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                courseCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Testimonial slider
    const testimonials = [
        {
            content: "WebAura Learn transformed my career. The web development bootcamp was comprehensive and practical. I landed a job as a front-end developer within a month of completing the course!",
            author: "Alex Thompson",
            position: "Front-end Developer",
            image: "https://via.placeholder.com/80x80",
            rating: 5
        },
        {
            content: "The business strategy course was exactly what I needed to take my startup to the next level. The instructor was knowledgeable and the course materials were excellent.",
            author: "Jessica Williams",
            position: "Startup Founder",
            image: "https://via.placeholder.com/80x80",
            rating: 5
        },
        {
            content: "I've tried many online learning platforms, but WebAura Learn stands out with its high-quality content and supportive community. The UI/UX design course helped me transition into a new career.",
            author: "Michael Rodriguez",
            position: "UX Designer",
            image: "https://via.placeholder.com/80x80",
            rating: 4
        }
    ];

    const testimonialContainer = document.querySelector('.testimonial-slider');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;

    if (testimonialContainer && dotsContainer) {
        // Initialize testimonial slider
        updateTestimonial();

        // Set up dots functionality
        document.querySelectorAll('.testimonial-dots .dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                updateTestimonial();
                updateDots();
            });
        });

        // Auto rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
            updateDots();
        }, 5000);
    }

    function updateTestimonial() {
        const testimonial = testimonials[currentTestimonial];
        
        // Create rating stars
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < testimonial.rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        testimonialContainer.innerHTML = `
            <div class="testimonial">
                <div class="testimonial-content">
                    <p>${testimonial.content}</p>
                </div>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.author}">
                    <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.position}</p>
                    </div>
                    <div class="testimonial-rating">
                        ${stars}
                    </div>
                </div>
            </div>
        `;
    }

    function updateDots() {
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        dots.forEach((dot, index) => {
            if (index === currentTestimonial) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Video modal functionality
    const videoBtn = document.querySelector('.btn.video');
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.querySelector('.close-modal');
    const videoIframe = document.querySelector('.video-container iframe');

    if (videoBtn && videoModal && closeModal && videoIframe) {
        videoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            videoIframe.setAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ'); // Example video URL
            videoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        closeModal.addEventListener('click', function() {
            videoModal.style.display = 'none';
            videoIframe.setAttribute('src', '');
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.style.display = 'none';
                videoIframe.setAttribute('src', '');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for subscribing to our newsletter!';
                successMessage.style.color = '#fff';
                successMessage.style.backgroundColor = 'rgba(40, 167, 69, 0.8)';
                successMessage.style.padding = '10px 20px';
                successMessage.style.borderRadius = '5px';
                successMessage.style.marginTop = '15px';
                successMessage.style.display = 'flex';
                successMessage.style.alignItems = 'center';
                successMessage.style.justifyContent = 'center';
                
                // Add success message after the form
                newsletterForm.after(successMessage);
                
                // Reset form
                emailInput.value = '';
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
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
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! We will get back to you soon.';
                successMessage.style.color = '#fff';
                successMessage.style.backgroundColor = 'rgba(40, 167, 69, 0.8)';
                successMessage.style.padding = '10px 20px';
                successMessage.style.borderRadius = '5px';
                successMessage.style.marginTop = '15px';
                successMessage.style.display = 'flex';
                successMessage.style.alignItems = 'center';
                successMessage.style.justifyContent = 'center';
                
                // Add success message after the form
                contactForm.after(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }

    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        if (statNumbers.length > 0 && !animated) {
            const statsSection = document.querySelector('.hero-stats');
            if (!statsSection) return;
            
            const sectionPosition = statsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const interval = Math.floor(duration / target);
                    
                    const counter = setInterval(() => {
                        count += 1;
                        if (count >= target) {
                            clearInterval(counter);
                            stat.textContent = stat.textContent; // Keep the original format (e.g., 10K+)
                        } else {
                            // Keep the format (e.g., add K+ or + if present)
                            if (stat.textContent.includes('K+')) {
                                stat.textContent = count + 'K+';
                            } else if (stat.textContent.includes('+')) {
                                stat.textContent = count + '+';
                            } else {
                                stat.textContent = count;
                            }
                        }
                    }, interval);
                });
                animated = true;
            }
        }
    }

    // Call animateStats on scroll
    window.addEventListener('scroll', animateStats);
    // Call once on page load
    animateStats();

    // Add hover effect to course cards
    const courseImages = document.querySelectorAll('.course-card .course-image');
    courseImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add to cart functionality
    const cartButtons = document.querySelectorAll('.btn-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get course information
            const courseCard = this.closest('.course-card');
            const courseName = courseCard.querySelector('h3').textContent;
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.innerHTML = `<i class="fas fa-check-circle"></i> ${courseName} added to cart!`;
            notification.style.position = 'fixed';
            notification.style.top = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = 'rgba(40, 167, 69, 0.9)';
            notification.style.color = '#fff';
            notification.style.padding = '15px 20px';
            notification.style.borderRadius = '5px';
            notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            notification.style.zIndex = '9999';
            notification.style.display = 'flex';
            notification.style.alignItems = 'center';
            notification.style.transform = 'translateX(100%)';
            notification.style.transition = 'transform 0.3s ease';
            notification.style.fontSize = '14px';
            
            // Add notification to body
            document.body.appendChild(notification);
            
            // Animate notification
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        });
    });

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '20px';
    backToTopBtn.style.right = '20px';
    backToTopBtn.style.width = '40px';
    backToTopBtn.style.height = '40px';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.backgroundColor = 'var(--primary-color)';
    backToTopBtn.style.color = '#fff';
    backToTopBtn.style.border = 'none';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.display = 'flex';
    backToTopBtn.style.alignItems = 'center';
    backToTopBtn.style.justifyContent = 'center';
    backToTopBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.visibility = 'hidden';
    backToTopBtn.style.transition = 'all 0.3s ease';
    backToTopBtn.style.zIndex = '999';
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
});