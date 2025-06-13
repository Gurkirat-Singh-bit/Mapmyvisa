/**
 * Dynamic Include System
 * Loads HTML content into elements with data-include attributes
 */

(function() {
    'use strict';

    // Helper: Get current page filename
    function getCurrentPage() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        return page.split('?')[0];
    }

    // Helper: Cache fetch with localStorage
    async function fetchWithCache(url, cacheKey, maxAgeMinutes = 60) {
        const now = Date.now();
        try {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                const { timestamp, content } = JSON.parse(cached);
                if (now - timestamp < maxAgeMinutes * 60 * 1000) {
                    return content;
                }
            }
        } catch (e) {}
        const response = await fetch(url, { cache: 'force-cache' });
        if (!response.ok) throw new Error('Network response was not ok');
        const content = await response.text();
        try {
            localStorage.setItem(cacheKey, JSON.stringify({ timestamp: now, content }));
        } catch (e) {}
        return content;
    }

    // Pre-allocate header/footer space
    function preallocateSpace(selector, minHeightPx) {
        const el = document.querySelector(selector);
        if (el) el.style.minHeight = minHeightPx + 'px';
    }

    // Main loader
    async function loadIncludes() {
        // Pre-allocate header/footer space to prevent layout shift
        preallocateSpace('[data-include="header.html"]', 90); // adjust as needed
        preallocateSpace('[data-include="footer.html"]', 350); // adjust as needed

        const includeElements = document.querySelectorAll('[data-include]');
        if (includeElements.length === 0) return;
        let completedLoads = 0;
        const totalLoads = includeElements.length;

        includeElements.forEach(async function(element) {
            const includePath = element.getAttribute('data-include');
            if (!includePath) {
                completedLoads++;
                if (completedLoads === totalLoads) onAllIncludesLoaded();
                return;
            }
            try {
                const html = await fetchWithCache(includePath, 'cache_' + includePath);
                element.innerHTML = html;
            } catch (error) {
                element.innerHTML = '<p>Error loading content</p>';
            }
            completedLoads++;
            if (completedLoads === totalLoads) onAllIncludesLoaded();
        });
    }

    // Set active nav link underline
    function setActiveNavLink() {
        const page = getCurrentPage();
        const navLinks = document.querySelectorAll('.nav__item-link');
        navLinks.forEach(link => {
            // Remove active from all
            link.classList.remove('active', 'underline');
            // Add active if href matches current page
            const href = link.getAttribute('href');
            if (href && href.split('?')[0] === page) {
                link.classList.add('active', 'underline');
            }
        });
    }

    // Navbar click event for underline
    function setupNavUnderline() {
        // Remove previous listeners
        document.querySelectorAll('.nav__item-link').forEach(link => {
            link.removeEventListener('click', navClickHandler);
            link.addEventListener('click', navClickHandler);
        });
    }
    function navClickHandler(e) {
        // Only handle left click
        if (e.button !== 0) return;
        document.querySelectorAll('.nav__item-link').forEach(link => link.classList.remove('active', 'underline'));
        this.classList.add('active', 'underline');
    }

    // Function called when all includes are loaded
    function onAllIncludesLoaded() {
        setActiveNavLink();
        setupNavUnderline();
        initializeLoadedContent();
        // Remove minHeight after load for smoothness
        setTimeout(() => {
            const header = document.querySelector('[data-include="header.html"]');
            if (header) header.style.minHeight = '';
            const footer = document.querySelector('[data-include="footer.html"]');
            if (footer) footer.style.minHeight = '';
        }, 200);
    }

    // Function to initialize content that was dynamically loaded
    function initializeLoadedContent() {
        // Re-initialize Bootstrap dropdowns if they exist
        if (typeof bootstrap !== 'undefined' && bootstrap.Dropdown) {
            const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
            dropdownElementList.forEach(function(dropdownToggleEl) {
                new bootstrap.Dropdown(dropdownToggleEl);
            });
        }

        // Re-initialize any jQuery plugins if jQuery is available
        if (typeof $ !== 'undefined') {
            // Re-initialize navbar functionality
            $('.navbar-toggler').off('click').on('click', function() {
                $('.navbar-collapse').toggleClass('show');
            });

            // Re-initialize search functionality
            $('.module__btn-search').off('click').on('click', function(e) {
                e.preventDefault();
                $('.module__search-container').addClass('active');
            });

            $('.close-search').off('click').on('click', function() {
                $('.module__search-container').removeClass('active');
            });
        }

        // Dispatch a custom event to notify that includes are loaded
        document.dispatchEvent(new CustomEvent('includesLoaded', {
            detail: { message: 'All includes have been loaded' }
        }));
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadIncludes);
    } else {
        loadIncludes();
    }

    // Export for manual initialization if needed
    window.loadIncludes = loadIncludes;
})();
