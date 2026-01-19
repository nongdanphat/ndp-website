// Load fonts and configure Tailwind immediately (before DOMContentLoaded)
// This ensures fonts are available for all pages that load this script
// Fonts are now self-hosted in /assets/fonts/ to avoid FOUT (Flash of Unstyled Text)

// Note: Using absolute paths (starting with /) for Cloudflare Pages compatibility
// All assets and links now use absolute paths from root

// Add styles.css link if not already present
if (!document.querySelector('link[href="/styles.css"]')) {
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = '/styles.css';
  document.head.appendChild(styleLink);
}

// Add favicon if not already present
if (!document.querySelector('link[rel="icon"]') && !document.querySelector('link[rel="shortcut icon"]')) {
  const faviconLink = document.createElement('link');
  faviconLink.rel = 'icon';
  faviconLink.type = 'image/x-icon';
  faviconLink.href = '/assets/images/favicon.ico';
  document.head.appendChild(faviconLink);
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
        footer .social-media-section {
          display: none !important;
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
  const footerHTML = `
    <footer class="border-t border-gray-200 bg-white py-12 md:py-16">
      <div class="container mx-auto px-4">
        <div class="footer-grid grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
          <!-- About -->
          <div class="text-center md:text-left">
            <div class="mb-4">
              <img
                src="/assets/images/logo.png"
                alt="Nông Dân Phát"
                class="h-[4rem] w-auto inline-block"
              />
            </div>
            <p class="text-gray-600 text-sm leading-relaxed mb-3">
              <span class="bg-gradient-to-r from-[#AB7E31] to-[#BE8F2B] bg-clip-text text-transparent font-semibold">Nông Dân Phát</span>
              là nền tảng đồng hành cùng nông dân và cộng đồng nông nghiệp, kết nối
              con người – tri thức – nguồn lực để tạo ra giá trị bền vững.
            </p>
            <p class="text-gray-600 text-sm leading-relaxed">
              Website ndphat.vn là trang thông tin giới thiệu về dự án Nông Dân Phát.
              Website không thực hiện mua bán, không phát sinh giao dịch. Các hoạt động kết nối và dịch vụ (nếu có) được triển khai trên Ứng dụng di động Nông Dân Phát.
            </p>
          </div>

          <!-- Contact -->
          <div class="text-center md:text-left" style="display: block !important; visibility: visible !important">
            <h3 class="text-lg font-semibold mb-4 text-gray-900" style="display: block !important">
              Chủ thể chịu trách nhiệm
            </h3>
            <div class="space-y-3" style="display: block !important">
              <div class="flex gap-1">
                <p class="text-gray-600 text-sm font-semibold mb-1">Tên dự án:</p>
                <p class="text-gray-700 text-sm">Nông Dân Phát</p>
              </div>
              <div class="flex items-center justify-center md:justify-start gap-3">
                <svg class="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="text-gray-600 text-sm">info@ndphat.vn</span>
              </div>
              <div class="flex items-center justify-center md:justify-start gap-3">
                <svg class="w-5 h-5 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-gray-600 text-sm">Số 546, Thôn Minh Hòa, Xã Hàm Thuận Nam, Tỉnh Lâm Đồng, Việt Nam</span>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="social-media-section text-center md:text-left" style="display: none !important;">
            <h3 class="text-lg font-semibold mb-4 text-gray-900" style="display: block">
              Theo dõi chúng tôi
            </h3>
            <div class="flex gap-4 items-center justify-center md:justify-start flex-wrap" style="display: flex; gap: 1rem; align-items: center">
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition inline-block" aria-label="Facebook" title="Facebook" style="display: inline-block">
                <img src="/assets/icons/fb.webp" alt="Facebook" class="w-8 h-8 object-contain" style="width: 2rem; height: 2rem; object-fit: contain; display: block;" />
              </a>
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition inline-block" aria-label="Instagram" title="Instagram" style="display: inline-block">
                <img src="/assets/icons/ig.webp" alt="Instagram" class="w-8 h-8 object-contain" style="width: 2rem; height: 2rem; object-fit: contain; display: block;" />
              </a>
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition inline-block" aria-label="YouTube" title="YouTube" style="display: inline-block">
                <img src="/assets/icons/youtube.png" alt="YouTube" class="w-8 h-8 object-contain" style="width: 2rem; height: 2rem; object-fit: contain; display: block;" />
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="text-center md:text-left" style="display: block !important; visibility: visible !important">
            <h3 class="text-lg font-semibold mb-4 text-gray-900" style="display: block !important">
              Liên kết nhanh
            </h3>
            <div class="space-y-3" style="display: block !important">
              <div>
                <a href="/index.html" class="text-gray-600 text-sm hover:text-[#AB7E31] transition block">
                  Trang chủ
                </a>
              </div>
              <div>
                <a href="/insights/index.html" class="text-gray-600 text-sm hover:text-[#AB7E31] transition block">
                  Chia sẻ & Xin ý kiến
                </a>
              </div>
              <div>
                <a href="/campaigns/index.html" class="text-gray-600 text-sm hover:text-[#AB7E31] transition block">
                  Chiến dịch & Chương trình
                </a>
              </div>
              <div>
                <a href="/join-us/index.html" class="text-gray-600 text-sm hover:text-[#AB7E31] transition block">
                  Tuyển dụng & Đồng hành
                </a>
              </div>
              <div>
                <a href="/contact/index.html" class="text-gray-600 text-sm hover:text-[#AB7E31] transition block">
                  Liên hệ
                </a>
              </div>
              <div>
                <a href="/chinh-sach-bao-mat.html" class="text-gray-600 text-sm hover:text-[#AB7E31] transition block">
                  Chính sách bảo mật
                </a>
              </div>
              <div>
                <a href="/dieu-khoan-su-dung.html" class="text-gray-600 text-sm hover:text-[#AB7E31] transition block">
                  Điều khoản sử dụng
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200 pt-8 text-center">
          <p class="text-sm text-gray-400 mb-2">
            Website hoạt động theo quy định pháp luật Việt Nam.
          </p>
          <p class="text-sm text-gray-600">
            © 2026 Nông Dân Phát. Mọi quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  `;

  footerPlaceholder.innerHTML = footerHTML;

  // Update links in footer after insertion
  setTimeout(() => {
    const footer = footerPlaceholder.querySelector('footer');
    if (footer) {
      // Update footer links
      updateFooterLinks(footer);
      
      const socialSection = footer.querySelector('.social-media-section');
      if (socialSection) {
        processSocialMediaLinks(socialSection);
      }
    }
  }, 50);
}

// Helper function to update footer links to use absolute paths
function updateFooterLinks(footerElement) {
  const links = footerElement.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('/')) {
      // Convert relative paths to absolute paths
      if (href === 'index.html') {
        link.setAttribute('href', '/index.html');
      } else if (href === 'insights/index.html') {
        link.setAttribute('href', '/insights/index.html');
      } else if (href === 'campaigns/index.html') {
        link.setAttribute('href', '/campaigns/index.html');
      } else if (href === 'join-us/index.html') {
        link.setAttribute('href', '/join-us/index.html');
      } else if (href === 'contact/index.html') {
        link.setAttribute('href', '/contact/index.html');
      } else {
        // For any other path, ensure it starts with /
        link.setAttribute('href', '/' + href.replace(/^\//, ''));
      }
    }
  });
}

// Helper function to update header links to use absolute paths
function updateHeaderLinks(headerElement) {
  const links = headerElement.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('/')) {
      // Convert relative paths to absolute paths
      if (href === 'index.html') {
        link.setAttribute('href', '/index.html');
      } else if (href === 'insights/index.html') {
        link.setAttribute('href', '/insights/index.html');
      } else if (href === 'campaigns/index.html') {
        link.setAttribute('href', '/campaigns/index.html');
      } else if (href === 'join-us/index.html') {
        link.setAttribute('href', '/join-us/index.html');
      } else if (href === 'contact/index.html') {
        link.setAttribute('href', '/contact/index.html');
      } else {
        // For any other path, ensure it starts with /
        link.setAttribute('href', '/' + href.replace(/^\//, ''));
      }
    }
  });
}

// Helper function to load header with fallback
function loadHeader() {
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) {
    console.error('Header placeholder not found');
    return;
  }
  
  const headerPath = '/header.html';
  
  function tryLoadHeader(path, attempt = 1) {
    fetch(path)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load header: ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(data => {
        placeholder.innerHTML = data;
        updateHeaderLinks(placeholder);
        initMobileMenu();
        highlightActiveMenuItem();
      })
      .catch(error => {
        console.error(`Error loading header from ${path} (attempt ${attempt}):`, error);
        
        // Try alternative paths as fallback
        const altPaths = [
          '/header.html'
        ];
        
        if (attempt <= altPaths.length) {
          const altPath = altPaths[attempt - 1];
          if (altPath !== path) {
            tryLoadHeader(altPath, attempt + 1);
          } else if (attempt < altPaths.length) {
            tryLoadHeader(altPaths[attempt], attempt + 1);
          }
        } else {
          console.error('All attempts to load header failed');
        }
      });
  }
  
  tryLoadHeader(headerPath);
}

// Load header and footer dynamically
document.addEventListener('DOMContentLoaded', function() {
  // Load header
  loadHeader();

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
