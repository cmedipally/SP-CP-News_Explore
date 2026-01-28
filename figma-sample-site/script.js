// Interactive functionality for the Figma sample site

document.addEventListener('DOMContentLoaded', () => {
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const closeTabBtn = document.querySelector('.close-tab');
    const newTabBtn = document.querySelector('.new-tab');

    closeTabBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        alert('Tab closed! (Demo)');
    });

    newTabBtn?.addEventListener('click', () => {
        alert('New tab opened! (Demo)');
    });

    // Toolbar buttons
    const toolbarBtns = document.querySelectorAll('.toolbar-btn');
    toolbarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Toolbar button clicked');
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput?.addEventListener('input', (e) => {
        console.log('Searching for:', e.target.value);
    });

    // Hero input
    const heroInput = document.querySelector('.hero-input');
    const submitBtn = document.querySelector('.submit-btn');

    submitBtn?.addEventListener('click', () => {
        const value = heroInput?.value;
        if (value) {
            alert(`You want to build: ${value}`);
        }
    });

    heroInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitBtn?.click();
        }
    });

    // Option cards
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.option-title').textContent;
            console.log(`Selected option: ${title}`);
            card.style.borderColor = 'var(--color-primary)';

            setTimeout(() => {
                card.style.borderColor = '';
            }, 1000);
        });
    });

    // Featured cards
    const featuredCards = document.querySelectorAll('.featured-card');
    featuredCards.forEach(card => {
        card.addEventListener('click', () => {
            const text = card.querySelector('.card-text strong').textContent;
            console.log(`Featured card clicked: ${text}`);
        });
    });

    // Tab navigation
    const tabNavBtns = document.querySelectorAll('.tab-nav-btn');
    tabNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            console.log('Tab switched to:', btn.textContent);
        });
    });

    // View controls
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            console.log('View changed');
        });
    });

    // Sidebar navigation
    const sidebarBtns = document.querySelectorAll('.sidebar-btn');
    sidebarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sidebarBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            console.log('Sidebar navigation:', btn.getAttribute('aria-label'));
        });
    });

    // Table row clicks
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', () => {
            const itemName = row.querySelector('.item-name').textContent;
            console.log('Selected item:', itemName);
            row.style.background = 'rgba(0, 120, 212, 0.1)';

            setTimeout(() => {
                row.style.background = '';
            }, 1000);
        });
    });

    // Star/favorite functionality
    const starBtn = document.querySelector('.star-btn');
    let isStarred = false;

    starBtn?.addEventListener('click', () => {
        isStarred = !isStarred;
        starBtn.textContent = isStarred ? '★' : '☆';
        console.log('Bookmark:', isStarred ? 'Added' : 'Removed');
    });

    // Header action buttons
    const headerActions = document.querySelectorAll('.header-actions .icon-btn');
    headerActions.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            console.log(`Header action ${index + 1} clicked`);
        });
    });

    // Create button
    const createBtn = document.querySelector('.create-btn');
    createBtn?.addEventListener('click', () => {
        alert('Create new item! (Demo)');
    });

    // Filter button
    const filterBtn = document.querySelector('.filter-btn');
    filterBtn?.addEventListener('click', () => {
        const filterName = prompt('Filter by name:');
        if (filterName) {
            console.log('Filtering by:', filterName);
            // In a real app, this would filter the table
        }
    });

    // Add subtle animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe cards for scroll animations
    document.querySelectorAll('.option-card, .featured-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });

    // Add ripple effect to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Log initialization
    console.log('Figma MCP Sample Site Initialized!');
    console.log('🎨 Design sourced from Figma MCP Server');
    console.log('✅ All interactive elements are ready');
});
