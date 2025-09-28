document.addEventListener("DOMContentLoaded", function () {
  // Initialize components
  initThemeToggle();
  initCustomizationPanel();
  initColorOptions();
  initSliders();
  initChips();
  initAlerts();
  initFormSubmission();
  initToggles();
  initToastNotifications();
});

// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  
  themeToggle.addEventListener("click", function() {
    const currentTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    changeTheme(newTheme);
    
    // Update toggle button text
    themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
    
    // Update theme select if it exists
    const themeSelect = document.getElementById("themeSelect");
    if (themeSelect) {
      themeSelect.value = newTheme;
    }
  });
}

// Customization Panel Functionality
function initCustomizationPanel() {
  const panel = document.getElementById("customPanel");
  const panelToggle = document.getElementById("panelToggle");
  const panelClose = document.getElementById("panelClose");
  
  panelToggle.addEventListener("click", function() {
    panel.classList.add("open");
  });
  
  panelClose.addEventListener("click", function() {
    panel.classList.remove("open");
  });
  
  // Close panel when clicking outside
  document.addEventListener("click", function(event) {
    if (!panel.contains(event.target) && !panelToggle.contains(event.target) && panel.classList.contains("open")) {
      panel.classList.remove("open");
    }
  });
  
  // Close panel with Escape key
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && panel.classList.contains("open")) {
      panel.classList.remove("open");
    }
  });
}

// Color Options Functionality
function initColorOptions() {
  const colorOptions = document.querySelectorAll(".color-option");
  
  colorOptions.forEach(option => {
    option.addEventListener("click", function() {
      const color = this.getAttribute("data-color");
      
      // Remove active class from all options
      colorOptions.forEach(opt => opt.classList.remove("active"));
      
      // Add active class to clicked option
      this.classList.add("active");
      
      // Update primary color
      document.documentElement.style.setProperty("--primary", color);
      
      showToast(`Primary color changed to ${color}`, "success");
    });
  });
}

// Sliders Functionality
function initSliders() {
  const fontSizeSlider = document.getElementById("fontSize");
  const borderRadiusSlider = document.getElementById("borderRadius");
  
  if (fontSizeSlider) {
    fontSizeSlider.addEventListener("input", function() {
      const fontSize = this.value + "px";
      document.documentElement.style.setProperty("--font-size", fontSize);
      document.getElementById("fontSizeValue").textContent = fontSize;
    });
  }
  
  if (borderRadiusSlider) {
    borderRadiusSlider.addEventListener("input", function() {
      const borderRadius = this.value + "px";
      document.documentElement.style.setProperty("--border-radius", borderRadius);
      document.getElementById("borderRadiusValue").textContent = borderRadius;
    });
  }
  
  // Theme Select
  const themeSelect = document.getElementById("themeSelect");
  if (themeSelect) {
    themeSelect.addEventListener("change", function() {
      changeTheme(this.value);
    });
  }
  
  // Reset Styles
  const resetButton = document.getElementById("resetStyles");
  if (resetButton) {
    resetButton.addEventListener("click", resetStyles);
  }
}

// Change Theme Function
function changeTheme(theme) {
  // Remove all theme classes
  document.body.classList.remove("dark-theme", "blue-theme", "green-theme");
  
  // Add selected theme class
  if (theme !== "light") {
    document.body.classList.add(theme + "-theme");
  }
  
  // Update theme toggle button
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  }
  
  showToast(`Theme changed to ${theme}`, "success");
}

// Reset Styles Function
function resetStyles() {
  // Reset CSS variables
  document.documentElement.style.setProperty("--primary", "#4361ee");
  document.documentElement.style.setProperty("--font-size", "16px");
  document.documentElement.style.setProperty("--border-radius", "8px");
  
  // Reset theme
  document.body.classList.remove("dark-theme", "blue-theme", "green-theme");
  
  // Reset sliders
  document.getElementById("fontSize").value = "16";
  document.getElementById("fontSizeValue").textContent = "16px";
  document.getElementById("borderRadius").value = "8";
  document.getElementById("borderRadiusValue").textContent = "8px";
  
  // Reset theme select
  document.getElementById("themeSelect").value = "light";
  
  // Reset color options
  document.querySelectorAll(".color-option").forEach(option => {
    option.classList.remove("active");
  });
  document.querySelector('.color-option[data-color="#4361ee"]').classList.add("active");
  
  // Reset theme toggle
  document.getElementById("themeToggle").textContent = "🌙";
  
  showToast("All styles reset to default", "success");
}

// Chips Functionality
function initChips() {
  const chips = document.querySelectorAll(".chip");
  
  chips.forEach(chip => {
    // Skip if chip already has close event listener
    if (chip.hasAttribute("data-initialized")) return;
    
    chip.setAttribute("data-initialized", "true");
    
    // Toggle active state on click
    chip.addEventListener("click", function(e) {
      if (!e.target.classList.contains("close")) {
        this.classList.toggle("active");
        const isActive = this.classList.contains("active");
        showToast(
          `Chip ${isActive ? "activated" : "deactivated"}`,
          isActive ? "success" : "info"
        );
      }
    });
    
    // Close functionality
    const closeBtn = chip.querySelector(".close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        chip.style.opacity = "0";
        chip.style.transform = "scale(0.8)";
        
        setTimeout(() => {
          chip.style.display = "none";
          showToast("Chip removed", "info");
        }, 300);
      });
    }
  });
}

// Alerts Functionality
function initAlerts() {
  const alertCloses = document.querySelectorAll(".alert-close");
  
  alertCloses.forEach(closeBtn => {
    closeBtn.addEventListener("click", function() {
      const alert = this.closest(".alert");
      alert.style.opacity = "0";
      alert.style.transform = "translateX(-20px)";
      
      setTimeout(() => {
        alert.style.display = "none";
      }, 300);
    });
  });
}

// Form Submission Functionality
function initFormSubmission() {
  const form = document.querySelector(".styled-form");
  
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      
      if (!name || !email) {
        showToast("Please fill in all required fields", "warning");
        return;
      }
      
      // Simulate form submission
      showToast("Form submitted successfully!", "success");
      
      // Reset form
      this.reset();
    });
  }
}

// Toggle Switches Functionality
function initToggles() {
  const toggles = document.querySelectorAll(".toggle input");
  
  toggles.forEach(toggle => {
    toggle.addEventListener("change", function() {
      const label = this.nextElementSibling.nextElementSibling.textContent;
      const isChecked = this.checked;
      
      showToast(
        `${label} ${isChecked ? "enabled" : "disabled"}`,
        isChecked ? "success" : "info"
      );
    });
  });
}

// Toast Notifications Functionality
function initToastNotifications() {
  // Function is available globally as showToast
}

// Global showToast function
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");
  
  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div>${message}</div>
    <span class="toast-close">&times;</span>
  `;
  
  // Add to container
  toastContainer.appendChild(toast);
  
  // Add show class after a brief delay
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);
  
  // Add close functionality
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", function() {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toast.parentNode) {
        toastContainer.removeChild(toast);
      }
    }, 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentNode) {
          toastContainer.removeChild(toast);
        }
      }, 300);
    }
  }, 5000);
}

// Card hover effects enhancement
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mouseenter", function() {
    this.style.transform = "translateY(-8px) scale(1.02)";
  });
  
  card.addEventListener("mouseleave", function() {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Button ripple effect
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function(e) {
    // Create ripple element
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    
    // Get click position
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    // Set styles
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    
    // Add to button
    this.appendChild(ripple);
    
    // Remove after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);
