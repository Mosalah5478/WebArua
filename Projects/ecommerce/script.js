// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Product Cards Hover Effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Add to Cart Button Click Event
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart span');
    let count = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            count++;
            cartCount.textContent = count;
            
            // Animation for button
            this.textContent = 'Added to Cart!';
            this.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '';
            }, 1500);
            
            // Show notification
            showNotification('Product added to cart!');
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // In a real application, you would send this to a server
                showNotification('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Notification Function
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateY(-20px)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Add CSS for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #4a6cf7;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            transform: translateY(-20px);
            opacity: 0;
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Simple Image Slider for Testimonials
    const testimonials = [
        {
            content: "I'm extremely satisfied with the quality of products and the excellent customer service. Will definitely shop here again!",
            author: "Sarah Johnson",
            role: "Loyal Customer",
            image: "images/customer.svg"
        },
        {
            content: "The shipping was incredibly fast, and the product exceeded my expectations. This is now my go-to online shop!",
            author: "Michael Chen",
            role: "Verified Buyer",
            image: "images/customer.svg"
        },
        {
            content: "Great prices and amazing selection. I've recommended WebAura Shop to all my friends and family.",
            author: "Emily Rodriguez",
            role: "Regular Customer",
            image: "images/customer.svg"
        }
    ];
    
    const testimonialSlider = document.querySelector('.testimonial-slider');
    let currentTestimonial = 0;
    
    function updateTestimonial() {
        if (testimonialSlider) {
            const testimonial = testimonials[currentTestimonial];
            
            testimonialSlider.innerHTML = `
                <div class="testimonial">
                    <div class="testimonial-content">
                        <p>"${testimonial.content}"</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-image">
                            <img src="${testimonial.image}" alt="${testimonial.author}">
                        </div>
                        <div class="author-info">
                            <h4>${testimonial.author}</h4>
                            <p>${testimonial.role}</p>
                        </div>
                    </div>
                </div>
            `;
            
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }
    }
    
    // Change testimonial every 5 seconds
    setInterval(updateTestimonial, 5000);
    
    // Initialize first testimonial
    updateTestimonial();
    
    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('nav a, .footer-column a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            if (nameInput.value && emailInput.value && messageInput.value) {
                // In a real application, you would send this to a server
                showNotification('Thank you for your message! We will get back to you soon.');
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';
                this.querySelector('input[placeholder="Subject"]').value = '';
            }
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    // Add CSS for back to top button
    const backToTopStyle = document.createElement('style');
    backToTopStyle.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 999;
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background-color: #3a5bd9;
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(backToTopStyle);
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});