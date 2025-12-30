// Load fonts and configure Tailwind immediately (before DOMContentLoaded)
// This ensures fonts are available for all pages that load this script
// Fonts are now self-hosted in /assets/fonts/ to avoid FOUT (Flash of Unstyled Text)

// Helper function to get base path based on current location
function getBasePath() {
  const path = window.location.pathname;
  // Remove filename and leading slash, filter out empty strings and HTML files
  const pathParts = path.split('/').filter(p => p && !p.endsWith('.html'));
  // If we're at root (no path parts), return './'
  // Otherwise, go up one level for each directory
  return pathParts.length > 0 ? '../'.repeat(pathParts.length) : './';
}

// Add styles.css link if not already present

if (!document.querySelector('link[href*="styles.css"]')) {
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = getBasePath() + 'styles.css';
  document.head.appendChild(styleLink);
}

// Configure Tailwind to use Inter font (works even if Tailwind loads after)
window.tailwindConfig = window.tailwindConfig || {};
window.tailwindConfig.theme = window.tailwindConfig.theme || {};
window.tailwindConfig.theme.extend = window.tailwindConfig.theme.extend || {};
window.tailwindConfig.theme.extend.fontFamily = window.tailwindConfig.theme.extend.fontFamily || {};
window.tailwindConfig.theme.extend.fontFamily.sans = ['Inter', 'sans-serif'];

// Also set if tailwind is already loaded
if (typeof tailwind !== 'undefined') {
  tailwind.config = tailwind.config || window.tailwindConfig;
  if (tailwind.config.theme && tailwind.config.theme.extend) {
    tailwind.config.theme.extend.fontFamily = window.tailwindConfig.theme.extend.fontFamily || {};
    tailwind.config.theme.extend.fontFamily.sans = ['Inter', 'sans-serif'];
  }
}

// Function to create and load footer
function loadFooter() {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (!footerPlaceholder) {
    console.error('Footer placeholder not found');
    return;
  }

  // Add footer styles
  if (!document.getElementById('footer-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'footer-styles';
    styleElement.textContent = `
      footer .footer-grid {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 2rem !important;
      }
      @media (min-width: 768px) {
        footer .footer-grid {
          grid-template-columns: repeat(3, 1fr) !important;
          display: grid !important;
        }
        footer .footer-grid > div {
          display: block !important;
          visibility: visible !important;
        }
      }
      @media (max-width: 767px) {
        footer {
          padding: 2rem 0 !important;
        }
        footer .container {
          padding-left: 1rem !important;
          padding-right: 1rem !important;
        }
        footer .footer-grid {
          gap: 1.5rem !important;
        }
        footer .footer-grid > div {
          text-align: center !important;
        }
        footer h3 {
          margin-bottom: 1rem !important;
          text-align: center !important;
        }
        footer .space-y-3 {
          align-items: center !important;
        }
        footer .flex.items-start {
          justify-content: center !important;
          text-align: center !important;
        }
        footer .social-media-section .flex {
          justify-content: center !important;
        }
      }
    `;
    document.head.appendChild(styleElement);
  }

  // Create footer HTML
  const basePath = getBasePath();
  const footerHTML = `
    <footer class="border-t border-gray-200 bg-white py-12 md:py-16">
      <div class="container mx-auto px-4">
        <div class="footer-grid grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
          <!-- About -->
          <div>
            <h3 class="text-xl font-bold mb-4 bg-gradient-to-r from-[#AB7E31] to-[#BE8F2B] bg-clip-text text-transparent">
              NDP
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              <span class="bg-gradient-to-r from-[#AB7E31] to-[#BE8F2B] bg-clip-text text-transparent font-semibold">Nông Dân Phát</span>
              là nền tảng đồng hành cùng nông dân và cộng đồng nông nghiệp, kết nối
              con người – tri thức – nguồn lực để tạo ra giá trị bền vững.
            </p>
          </div>

          <!-- Contact -->
          <div style="display: block !important; visibility: visible !important">
            <h3 class="text-lg font-semibold mb-4 text-gray-900" style="display: block !important">
              Thông tin liên hệ
            </h3>
            <div class="space-y-3" style="display: block !important">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="text-gray-600 text-sm">contact@ndp.com</span>
              </div>
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="text-gray-600 text-sm">+84 123 456 7890</span>
              </div>
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-gray-600 text-sm">123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="social-media-section" style="min-height: 100px !important; display: block !important; visibility: visible !important; opacity: 1 !important; width: 100% !important;">
            <h3 class="text-lg font-semibold mb-4 text-gray-900" style="display: block">
              Theo dõi chúng tôi
            </h3>
            <div class="flex gap-4 items-center flex-wrap" style="display: flex; gap: 1rem; align-items: center">
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition inline-block" aria-label="Facebook" title="Facebook" style="display: inline-block">
                <img src="${basePath}assets/icons/fb.webp" alt="Facebook" class="w-8 h-8 object-contain" style="width: 2rem; height: 2rem; object-fit: contain; display: block;" />
              </a>
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition inline-block" aria-label="Instagram" title="Instagram" style="display: inline-block">
                <img src="${basePath}assets/icons/ig.webp" alt="Instagram" class="w-8 h-8 object-contain" style="width: 2rem; height: 2rem; object-fit: contain; display: block;" />
              </a>
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition inline-block" aria-label="YouTube" title="YouTube" style="display: inline-block">
                <img src="${basePath}assets/icons/youtube.png" alt="YouTube" class="w-8 h-8 object-contain" style="width: 2rem; height: 2rem; object-fit: contain; display: block;" />
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200 pt-8 text-center">
          <p class="text-sm text-gray-600">
            © 2026 Nông Dân Phát. Mọi quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  `;

  footerPlaceholder.innerHTML = footerHTML;

  // Process social media links
  setTimeout(() => {
    const footer = footerPlaceholder.querySelector('footer');
    if (footer) {
      const socialSection = footer.querySelector('.social-media-section');
      if (socialSection) {
        processSocialMediaLinks(socialSection);
      }
    }
  }, 50);
}

// Helper function to update header links to be relative to current page
function updateHeaderLinks(headerElement) {
  const basePath = getBasePath();
  const currentPath = window.location.pathname;
  const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
  
  const links = headerElement.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
      // If href is already relative (starts with ../ or ./), keep it
      if (href.startsWith('../') || href.startsWith('./')) {
        return;
      }
      
      // Map standard paths to relative paths based on current location
      let targetPath = href;
      
      // Handle paths like "insights/index.html" - need to check if we're already in that directory
      if (href === 'index.html') {
        // If we're in a subdirectory, go up; if at root, stay
        link.setAttribute('href', basePath + 'index.html');
      } else if (href === 'insights/index.html') {
        // If we're in insights/, use './index.html', otherwise use '../insights/index.html' or './insights/index.html'
        if (currentPath.includes('/insights/')) {
          link.setAttribute('href', './index.html');
        } else {
          link.setAttribute('href', basePath + 'insights/index.html');
        }
      } else if (href === 'campaigns/index.html') {
        if (currentPath.includes('/campaigns/')) {
          link.setAttribute('href', './index.html');
        } else {
          link.setAttribute('href', basePath + 'campaigns/index.html');
        }
      } else if (href === 'join-us/index.html') {
        if (currentPath.includes('/join-us/')) {
          link.setAttribute('href', './index.html');
        } else {
          link.setAttribute('href', basePath + 'join-us/index.html');
        }
      } else if (href === 'contact/index.html') {
        if (currentPath.includes('/contact/')) {
          link.setAttribute('href', './index.html');
        } else {
          link.setAttribute('href', basePath + 'contact/index.html');
        }
      } else {
        // For any other path, make it relative to base
        link.setAttribute('href', basePath + href.replace(/^\//, ''));
      }
    }
  });
}

// Load header and footer dynamically
document.addEventListener('DOMContentLoaded', function() {
  // Load header
  fetch(getBasePath() + 'header.html')
    .then(response => response.text())
    .then(data => {
      const placeholder = document.getElementById('header-placeholder');
      placeholder.innerHTML = data;
      updateHeaderLinks(placeholder);
      initMobileMenu();
      highlightActiveMenuItem();
    })
    .catch(error => console.error('Error loading header:', error));

  // Load footer - create with JavaScript
  loadFooter();
});

// Process social media links to ensure they open in new tab
function processSocialMediaLinks(socialSection) {
  // Use setTimeout to ensure this runs after all other scripts
  setTimeout(() => {
    const socialLinks = socialSection.querySelectorAll('a[href]');
    socialLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Only process external links (http/https)
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        // Store original href from HTML in a data attribute
        const originalHref = href;
        link.setAttribute('data-original-href', originalHref);
        
        // Force set attributes
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('href', originalHref);
        
        // Use MutationObserver to watch for href changes and restore it
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'href') {
              const currentHref = link.getAttribute('href');
              if (currentHref !== originalHref && !currentHref.startsWith('http')) {
                link.setAttribute('href', originalHref);
              }
            }
          });
        });
        observer.observe(link, { attributes: true, attributeFilter: ['href'] });
        
        // Add click handler to open in new tab with correct URL
        link.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          // Always use the original href stored in data attribute
          const urlToOpen = this.getAttribute('data-original-href') || originalHref;
          window.open(urlToOpen, '_blank', 'noopener,noreferrer');
          return false;
        }, true); // Use capture phase to ensure it runs first
      }
    });
  }, 100); // Run after 100ms to ensure other scripts have run
}

// Initialize mobile menu functionality
function initMobileMenu() {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

// Highlight active menu item based on current URL
function highlightActiveMenuItem() {
  const currentPath = window.location.pathname.toLowerCase();
  
  // Map URL patterns to menu keys (excluding index - it's the default)
  const urlToKeyMap = [
    { key: 'join-us', patterns: ['join-us', 'apply'] },
    { key: 'insights', patterns: ['insights'] },
    { key: 'campaigns', patterns: ['campaigns'] },
    { key: 'contact', patterns: ['contact', 'lien-he'] }
  ];
  
  // Find which menu key matches the current URL
  let activeKey = null;
  for (const { key, patterns } of urlToKeyMap) {
    if (patterns.some(pattern => currentPath.includes(pattern))) {
      activeKey = key;
      break;
    }
  }
  
  // If no match found, default to index (Trang chủ)
  if (!activeKey) {
    activeKey = 'index';
  }
  
  // Highlight the active menu item
  if (activeKey) {
    const activeLinks = document.querySelectorAll(`[data-menu-key="${activeKey}"]`);
    activeLinks.forEach(link => {
      // Desktop: change text color to brand color and add font weight
      // Check if link is in desktop menu (not in mobile menu)
      if (!link.closest('#mobile-menu')) {
        link.classList.remove('text-gray-700');
        link.classList.add('text-[#AB7E31]', 'font-semibold');
      }
      // Mobile: add background color
      if (link.closest('#mobile-menu')) {
        link.classList.remove('text-gray-700');
        link.classList.add('text-[#AB7E31]', 'bg-[#FADC7C]', 'font-semibold');
      }
    });
  }
}
