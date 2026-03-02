// Modern JavaScript for enhanced interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initSmoothScrolling();
    initAnimations();
    initInteractiveElements();
    initSearchFunctionality();
    initThemeToggle();
    initTooltips();
    initLazyLoading();
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize animations on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.item-card, .product, .tags-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Interactive elements functionality
function initInteractiveElements() {
    // Add ripple effect to buttons
    document.querySelectorAll('.nav a, .tag, .back').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add hover effects for cards
    document.querySelectorAll('.item-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Search functionality
function initSearchFunctionality() {
    // Create search bar if it doesn't exist
    if (!document.querySelector('.search-container')) {
        const searchHTML = `
            <div class="search-container">
                <input type="text" class="search-input" placeholder="Поиск товаров, категорий, тегов...">
                <button class="search-btn">🔍</button>
            </div>
        `;
        
        const header = document.querySelector('header');
        if (header) {
            header.insertAdjacentHTML('afterend', searchHTML);
        }
    }

    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput && searchBtn) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length > 2) {
                searchTimeout = setTimeout(() => {
                    performSearch(query);
                }, 300);
            } else {
                clearSearchResults();
            }
        });

        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    performSearch(query);
                }
            }
        });
    }
}

// Perform search
function performSearch(query) {
    const allItems = document.querySelectorAll('.item-card, .product, .tag');
    const results = [];
    
    allItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            results.push(item);
            item.style.display = '';
            item.classList.add('search-highlight');
        } else {
            item.style.display = 'none';
            item.classList.remove('search-highlight');
        }
    });

    // Show search results count
    showSearchResults(results.length, query);
}

// Clear search results
function clearSearchResults() {
    document.querySelectorAll('.item-card, .product, .tag').forEach(item => {
        item.style.display = '';
        item.classList.remove('search-highlight');
    });
    
    const resultsInfo = document.querySelector('.search-results');
    if (resultsInfo) {
        resultsInfo.remove();
    }
}

// Show search results info
function showSearchResults(count, query) {
    let resultsInfo = document.querySelector('.search-results');
    
    if (!resultsInfo) {
        resultsInfo = document.createElement('div');
        resultsInfo.className = 'search-results';
        document.querySelector('.container').insertBefore(resultsInfo, document.querySelector('.nav'));
    }
    
    resultsInfo.innerHTML = `
        <p>Найдено ${count} результатов по запросу "${query}"</p>
    `;
}

// Theme toggle functionality
function initThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.title = 'Переключить тему';
    
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '☀️';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        this.innerHTML = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Add transition effect
        document.body.style.transition = 'background 0.3s ease';
    });
}

// Tooltip functionality
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('title');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            this.removeAttribute('title');
            this.setAttribute('data-tooltip', 'active');
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
            this.setAttribute('title', this.getAttribute('data-original-title') || '');
        });
        
        element.addEventListener('mouseenter', function() {
            this.setAttribute('data-original-title', this.getAttribute('title'));
        });
    });
}

// Lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add CSS for dynamic elements
const dynamicStyles = `
    .search-container {
        padding: 20px 30px;
        background: white;
        border-bottom: 1px solid #e9ecef;
        display: flex;
        gap: 10px;
        align-items: center;
    }
    
    .search-input {
        flex: 1;
        padding: 12px 20px;
        border: 2px solid #e9ecef;
        border-radius: 25px;
        font-size: 16px;
        transition: border-color 0.3s ease;
    }
    
    .search-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .search-btn {
        padding: 12px 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-size: 16px;
        transition: transform 0.3s ease;
    }
    
    .search-btn:hover {
        transform: scale(1.05);
    }
    
    .search-results {
        padding: 15px 30px;
        background: #e3f2fd;
        border-left: 4px solid #667eea;
        margin: 0 30px 20px;
        border-radius: 5px;
    }
    
    .search-highlight {
        animation: highlight 0.5s ease;
    }
    
    @keyframes highlight {
        0% { background-color: transparent; }
        50% { background-color: rgba(255, 193, 7, 0.3); }
        100% { background-color: transparent; }
    }
    
    .theme-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .theme-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
    
    .dark-theme {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    }
    
    .dark-theme .container {
        background: rgba(30, 30, 46, 0.95);
        color: #e0e0e0;
    }
    
    .dark-theme .item-card {
        background: rgba(40, 40, 56, 0.9);
        border-color: #4a4a6a;
    }
    
    .dark-theme .search-container {
        background: rgba(30, 30, 46, 0.9);
        border-color: #4a4a6a;
    }
    
    .dark-theme .search-input {
        background: rgba(40, 40, 56, 0.9);
        border-color: #4a4a6a;
        color: #e0e0e0;
    }
    
    .tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 14px;
        z-index: 1000;
        pointer-events: none;
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loading {
        text-align: center;
        padding: 40px;
    }
    
    .spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #667eea;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Add dynamic styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance monitoring
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

// Initialize performance monitoring
logPerformance();
