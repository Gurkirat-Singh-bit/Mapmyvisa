/**
 * Dynamic Include System
 * Loads HTML content into elements with data-include attributes
 */

(function() {
    'use strict';

    // Function to load include content
    function loadIncludes() {
        const includeElements = document.querySelectorAll('[data-include]');
        
        if (includeElements.length === 0) {
            return;
        }

        // Counter to track completed loads
        let completedLoads = 0;
        const totalLoads = includeElements.length;

        includeElements.forEach(function(element) {
            const includePath = element.getAttribute('data-include');
            
            if (!includePath) {
                console.warn('Include element missing data-include attribute:', element);
                completedLoads++;
                if (completedLoads === totalLoads) {
                    onAllIncludesLoaded();
                }
                return;
            }

            // Use fetch API to load content
            fetch(includePath)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.statusText);
                    }
                    return response.text();
                })
                .then(function(html) {
                    element.innerHTML = html;
                    completedLoads++;
                    
                    // Trigger any necessary re-initialization after content is loaded
                    if (completedLoads === totalLoads) {
                        onAllIncludesLoaded();
                    }
                })
                .catch(function(error) {
                    console.error('Error loading include:', includePath, error);
                    element.innerHTML = '<p>Error loading content</p>';
                    completedLoads++;
                    
                    if (completedLoads === totalLoads) {
                        onAllIncludesLoaded();
                    }
                });
        });
    }

    // Function called when all includes are loaded
    function onAllIncludesLoaded() {
        // Re-initialize any JavaScript that might be needed for the loaded content
        initializeLoadedContent();
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
