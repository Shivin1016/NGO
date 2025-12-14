// mobile nav toggle
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", function () {
  if (!mainNav) return;

  mainNav.classList.toggle("active");
});


// form validation
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form-container');
  
  // Form submission handler
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    if (validateForm()) {
      // If validation passes, submit form
      submitForm();
    }
  });

  // Real-time validation on input change
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      clearError(this);
    });
  });

  // Special validation for date inputs
  const dobInput = form.querySelector('input[name="dob"]');
  if (dobInput) {
    dobInput.addEventListener('change', function() {
      validateDateOfBirth(this);
    });
  }

  // Special validation for email
  const emailInput = form.querySelector('input[name="email"]');
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      validateEmail(this);
    });
  }

  // Special validation for phone
  const phoneInput = form.querySelector('input[name="phone"]');
  if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
      validatePhone(this);
    });
  }
});

// Main validation function
function validateForm() {
  const form = document.querySelector('.form-container');
  let isValid = true;
  
  // Clear all previous errors
  clearAllErrors();
  
  // Validate required fields
  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  
  // Validate specific fields with custom rules
  if (!validateEmail(form.querySelector('input[name="email"]'))) {
    isValid = false;
  }
  
  if (!validatePhone(form.querySelector('input[name="phone"]'))) {
    isValid = false;
  }
  
  if (!validateDateOfBirth(form.querySelector('input[name="dob"]'))) {
    isValid = false;
  }
  
  // Validate file types
  const idProof = form.querySelector('input[name="idproof"]');
  if (idProof && idProof.files.length > 0) {
    if (!validateFile(idProof, ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'])) {
      isValid = false;
    }
  }
  
  const resume = form.querySelector('input[name="resume"]');
  if (resume && resume.files.length > 0) {
    if (!validateFile(resume, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])) {
      isValid = false;
    }
  }
  
  // Validate textarea lengths
  const address = form.querySelector('textarea[name="address"]');
  if (address && address.value.trim().length < 10) {
    showError(address, 'Please enter a valid address (minimum 10 characters)');
    isValid = false;
  }
  
  const skills = form.querySelector('textarea[name="skills"]');
  if (skills && skills.value.trim().length < 10) {
    showError(skills, 'Please describe your skills (minimum 10 characters)');
    isValid = false;
  }
  
  const motivation = form.querySelector('textarea[name="motivation"]');
  if (motivation && motivation.value.trim().length < 20) {
    showError(motivation, 'Please explain your motivation (minimum 20 characters)');
    isValid = false;
  }
  
  // Validate date fields
  const availableDate = form.querySelector('input[name="available-date"]');
  if (availableDate && !availableDate.value.trim()) {
    showError(availableDate, 'Please enter your available dates');
    isValid = false;
  }
  
  const availableHours = form.querySelector('input[name="available-hours"]');
  if (availableHours) {
    const hours = parseInt(availableHours.value);
    if (isNaN(hours) || hours < 1 || hours > 168) {
      showError(availableHours, 'Please enter valid hours (1-168 hours per week)');
      isValid = false;
    }
  }
  
  return isValid;
}

// Validate individual field
function validateField(field) {
  const fieldName = field.getAttribute('name');
  const value = field.value.trim();
  
  // Skip validation for non-required fields if empty
  if (!field.hasAttribute('required') && value === '') {
    clearError(field);
    return true;
  }
  
  // Check for required fields
  if (field.hasAttribute('required') && value === '') {
    const fieldLabel = field.parentElement.querySelector('.form-sub-label')?.textContent || 
                      field.parentElement.parentElement.querySelector('.form-label label')?.textContent || 
                      fieldName;
    showError(field, `This field is required`);
    return false;
  }
  
  // Field-specific validation
  switch(fieldName) {
    case 'email':
      return validateEmail(field);
    case 'phone':
      return validatePhone(field);
    case 'dob':
      return validateDateOfBirth(field);
    case 'first-name':
    case 'last-name':
      if (value.length < 2) {
        showError(field, 'Name must be at least 2 characters');
        return false;
      }
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        showError(field, 'Name can only contain letters and spaces');
        return false;
      }
      break;
    case 'qualification':
    case 'profession':
      if (value.length < 2) {
        showError(field, 'Please enter valid information');
        return false;
      }
      break;
    case 'gender':
    case 'interested_area':
      if (value === '' || value === 'Select') {
        showError(field, 'Please select an option');
        return false;
      }
      break;
    case 'available-date':
      if (value.length < 3) {
        showError(field, 'Please enter valid dates (e.g., "Weekends", "Mon-Fri")');
        return false;
      }
      break;
  }
  
  clearError(field);
  return true;
}

// Email validation
function validateEmail(emailField) {
  const email = emailField.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    showError(emailField, 'Please enter a valid email address');
    return false;
  }
  
  clearError(emailField);
  return true;
}

// Phone validation (supports international numbers)
function validatePhone(phoneField) {
  const phone = phoneField.value.trim();
  // Supports: +1234567890, 123-456-7890, (123) 456-7890, 123.456.7890
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$|^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  
  if (!phoneRegex.test(phone.replace(/[\s\-\(\)\.]/g, ''))) {
    showError(phoneField, 'Please enter a valid phone number');
    return false;
  }
  
  clearError(phoneField);
  return true;
}

// Date of Birth validation
function validateDateOfBirth(dobField) {
  const dob = new Date(dobField.value);
  const today = new Date();
  const minAge = 18; // Minimum age to volunteer
  const maxAge = 100; // Maximum age
  
  if (!dobField.value) {
    showError(dobField, 'Date of birth is required');
    return false;
  }
  
  if (isNaN(dob.getTime())) {
    showError(dobField, 'Please enter a valid date');
    return false;
  }
  
  // Calculate age
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  let actualAge = age;
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    actualAge--;
  }
  
  if (actualAge < minAge) {
    showError(dobField, `You must be at least ${minAge} years old to volunteer`);
    return false;
  }
  
  if (actualAge > maxAge) {
    showError(dobField, `Please enter a valid date of birth`);
    return false;
  }
  
  // Check if date is in future
  if (dob > today) {
    showError(dobField, 'Date of birth cannot be in the future');
    return false;
  }
  
  clearError(dobField);
  return true;
}

// File validation
function validateFile(fileInput, allowedTypes) {
  const file = fileInput.files[0];
  
  if (!file) return true;
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    const fileType = fileInput.getAttribute('name');
    const allowedExtensions = allowedTypes.map(type => {
      if (type.includes('image/')) return 'image (JPEG, PNG)';
      if (type.includes('pdf')) return 'PDF';
      if (type.includes('msword')) return 'DOC';
      if (type.includes('wordprocessingml')) return 'DOCX';
      return type;
    }).join(', ');
    
    showError(fileInput, `Invalid file type. Allowed: ${allowedExtensions}`);
    return false;
  }
  
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    showError(fileInput, `File size must be less than 5MB`);
    return false;
  }
  
  clearError(fileInput);
  return true;
}

// Show error message
function showError(field, message) {
  clearError(field);
  
  // Create error element
  const errorElement = document.createElement('div');
  errorElement.className = 'form-error';
  errorElement.textContent = message;
  errorElement.style.cssText = `
    color: #d32f2f;
    font-size: 12px;
    margin-top: 4px;
    font-weight: 500;
  `;
  
  // Add red border to field
  field.style.borderColor = '#d32f2f';
  field.style.borderWidth = '2px';
  
  // Insert error after field
  if (field.parentElement.classList.contains('form-sub-label-container')) {
    field.parentElement.appendChild(errorElement);
  } else {
    field.parentElement.appendChild(errorElement);
  }
}

// Clear error for a specific field
function clearError(field) {
  field.style.borderColor = '';
  field.style.borderWidth = '';
  
  // Remove existing error message
  const container = field.parentElement.classList.contains('form-sub-label-container') 
    ? field.parentElement 
    : field.parentElement;
  
  const existingError = container.querySelector('.form-error');
  if (existingError) {
    existingError.remove();
  }
}

// Clear all errors
function clearAllErrors() {
  const errors = document.querySelectorAll('.form-error');
  errors.forEach(error => error.remove());
  
  const fields = document.querySelectorAll('.form-container input, .form-container textarea, .form-container select');
  fields.forEach(field => {
    field.style.borderColor = '';
    field.style.borderWidth = '';
  });
}

// Form submission (AJAX example)
function submitForm() {
  const form = document.querySelector('.form-container');
  const submitBtn = form.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  
  // Disable button and show loading
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';
  submitBtn.style.opacity = '0.7';
  
  // Collect form data
  const formData = new FormData(form);
  
  // Simulate API call (replace with actual endpoint)
  setTimeout(() => {
    // console.log('Form data:', Object.fromEntries(formData));
    
    // Show success message
    alert('Thank you! Your volunteer application has been submitted successfully.');
    
    // Reset form
    form.reset();
    clearAllErrors();
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    submitBtn.style.opacity = '1';
    
  }, 1500);
  
  // For actual submission, use:
  /*
  fetch('your-api-endpoint', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Handle success
    alert('Application submitted successfully!');
    form.reset();
    clearAllErrors();
  })
  .catch(error => {
    // Handle error
    alert('Error submitting form. Please try again.');
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    submitBtn.style.opacity = '1';
  });
  */
}

// Optional: Add CSS for better error display
const style = document.createElement('style');
style.textContent = `
  .form-error {
    color: #d32f2f;
    font-size: 12px;
    margin-top: 4px;
    font-weight: 500;
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .form-container input:invalid,
  .form-container textarea:invalid,
  .form-container select:invalid {
    border-color: #ffebee;
  }
  
  .submit-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
document.head.appendChild(style);
