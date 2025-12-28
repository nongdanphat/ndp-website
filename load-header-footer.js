// Load fonts and configure Tailwind immediately (before DOMContentLoaded)
// This ensures fonts are available for all pages that load this script
// Fonts are now self-hosted in /assets/fonts/ to avoid FOUT (Flash of Unstyled Text)

// Add styles.css link if not already present
if (!document.querySelector('link[href="/styles.css"]')) {
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = '/styles.css';
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

// Load header and footer dynamically
document.addEventListener('DOMContentLoaded', function() {
  // Load header
  fetch('/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
      initMobileMenu();
      highlightActiveMenuItem();
    })
    .catch(error => console.error('Error loading header:', error));

  // Load footer
  fetch('/footer.html', {
    cache: 'no-cache',
    headers: {
      'Cache-Control': 'no-cache'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      // Strategy: Extract only the footer content, ignoring everything else
      // First, remove Live Server injected code - be more aggressive
      const liveServerPatterns = [
        /<script[^>]*>[\s\S]*?Live[\s\S]*?reload[\s\S]*?<\/script>/gi,
        /<script[^>]*>[\s\S]*?LiveServer[\s\S]*?<\/script>/gi,
        /<script[^>]*>[\s\S]*?WebSocket[\s\S]*?<\/script>/gi
      ];
      let cleanedData = data;
      liveServerPatterns.forEach(pattern => {
        cleanedData = cleanedData.replace(pattern, '');
      });
      // Also remove any script tags at the very end
      cleanedData = cleanedData.replace(/<script[\s\S]*$/gi, '');
      
      // Find the start of footer tag
      const footerStartIndex = cleanedData.indexOf('<footer');
      
      if (footerStartIndex !== -1) {
        // Extract from footer start
        let footerContent = cleanedData.substring(footerStartIndex);
        
        // Try to find </footer> tag
        const footerEndIndex = footerContent.indexOf('</footer>');
        if (footerEndIndex !== -1) {
          footerContent = footerContent.substring(0, footerEndIndex + 9);
        } else {
          // No </footer> tag - just add closing tag
          footerContent += '</footer>';
        }
        
        data = footerContent;
      }
      
      const footerPlaceholder = document.getElementById('footer-placeholder');
      if (footerPlaceholder) {
        // Extract and inject style tag to head if present
        const styleMatch = data.match(/<style>([\s\S]*?)<\/style>/);
        if (styleMatch) {
          const styleContent = styleMatch[1];
          const styleElement = document.createElement('style');
          styleElement.textContent = styleContent;
          document.head.appendChild(styleElement);
          // Remove style tag from data
          data = data.replace(/<style>[\s\S]*?<\/style>/, '');
        }
        
        footerPlaceholder.innerHTML = data;
        
        // Check if social media section exists and ensure it's visible
        const footer = footerPlaceholder.querySelector('footer');
        
        if (footer) {
          const gridContainer = footer.querySelector('.footer-grid') || footer.querySelector('.grid');
          
          // Find social media section by text content
          const allDivs = footer.querySelectorAll('.footer-grid > div, .grid > div');
          
          // Fallback: Inject Social Media section if missing (workaround for Live Server cutting footer.html)
          // TODO: Remove this when using a proper server that doesn't cut HTML files
          const hasSocialMedia = Array.from(allDivs).some(div => 
            div.textContent?.includes('Theo dõi chúng tôi') || 
            div.classList.contains('social-media-section')
          );
          
          if (!hasSocialMedia && gridContainer && allDivs.length < 3) {
            // This HTML should ideally come from footer.html, but Live Server cuts the file
            // Consider moving to a proper server or fixing Live Server configuration
            const socialMediaHTML = `
      <!-- Social Media -->
      <div
        class="social-media-section"
        style="
          min-height: 100px !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: 100% !important;
        "
      >
        <h3
          class="text-lg font-semibold mb-4 text-gray-900"
          style="display: block !important"
        >
          Theo dõi chúng tôi
        </h3>
        <div
          class="flex gap-4 items-center flex-wrap"
          style="display: flex !important; gap: 1rem !important; align-items: center !important;"
        >
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:opacity-80 transition inline-block"
            aria-label="Facebook"
            title="Facebook"
            style="display: inline-block !important;"
          >
            <img
              src="/assets/icons/fb.webp"
              alt="Facebook"
              class="w-8 h-8 object-contain"
              style="
                width: 2rem !important;
                height: 2rem !important;
                object-fit: contain !important;
                display: block !important;
              "
            />
          </a>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:opacity-80 transition inline-block"
            aria-label="Instagram"
            title="Instagram"
            style="display: inline-block !important;"
          >
            <img
              src="/assets/icons/ig.webp"
              alt="Instagram"
              class="w-8 h-8 object-contain"
              style="
                width: 2rem !important;
                height: 2rem !important;
                object-fit: contain !important;
                display: block !important;
              "
            />
          </a>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:opacity-80 transition inline-block"
            aria-label="YouTube"
            title="YouTube"
            style="display: inline-block !important;"
          >
            <img
              src="/assets/icons/youtube.png"
              alt="YouTube"
              class="w-8 h-8 object-contain"
              style="
                width: 2rem !important;
                height: 2rem !important;
                object-fit: contain !important;
                display: block !important;
              "
            />
          </a>
        </div>
      </div>`;
            
            // Insert before the closing </div> of grid
            gridContainer.insertAdjacentHTML('beforeend', socialMediaHTML);
            
            // Process the newly injected social media links
            setTimeout(() => {
              const newSocialSection = footer.querySelector('.social-media-section');
              if (newSocialSection) {
                processSocialMediaLinks(newSocialSection);
              }
            }, 50);
          }
          
          // Ensure grid has 3 columns on desktop
          if (window.innerWidth >= 768 && gridContainer) {
            gridContainer.style.cssText = 'display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 2rem !important;';
          }
          
          // Find and style social media section
          const socialSection = footer.querySelector('.social-media-section');
          if (socialSection) {
            socialSection.style.cssText = 'min-height: 100px !important; display: block !important; visibility: visible !important; opacity: 1 !important; width: 100% !important; position: relative !important;';
            
            const h3 = socialSection.querySelector('h3');
            if (h3) {
              h3.style.cssText = 'display: block !important; visibility: visible !important;';
            }
            
            const iconContainer = socialSection.querySelector('.flex');
            if (iconContainer) {
              iconContainer.style.cssText = 'display: flex !important; gap: 1rem !important; align-items: center !important; visibility: visible !important;';
            }
            
            const images = socialSection.querySelectorAll('img');
            images.forEach(img => {
              img.style.cssText = 'width: 2rem !important; height: 2rem !important; object-fit: contain !important; display: block !important; visibility: visible !important;';
            });
            
            // Process social media links
            if (socialSection) {
              processSocialMediaLinks(socialSection);
            }
          }
        }
      } else {
        console.error('Footer placeholder not found');
      }
    })
    .catch(error => console.error('Error loading footer:', error));
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
    { key: 'join-us', patterns: ['join-us'] },
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
      if (link.closest('.hidden.md\\:flex')) {
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
