export const validateName = (name) => {
  if (!name.trim()) {
    return "Restaurant name is required";
  }
  if (name.length < 2) {
    return "Name must be at least 2 characters";
  }
  if (!/^[a-zA-Z0-9\s,'-]*$/.test(name)) {
    return "Name contains invalid characters";
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone.trim()) {
    return "Phone number is required";
  }
  // Supports various phone formats:
  // - (123) 456-7890
  // - 123-456-7890
  // - 123.456.7890
  // - +91 (123) 456-7890
  // - etc.
  const phoneRegex = /^[+]?[()]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  if (!phoneRegex.test(phone)) {
    return "Please enter a valid phone number";
  }
  return null;
};

export const validateAddress = (address) => {
  if (!address.trim()) {
    return "Address is required";
  }
  // Basic address validation - should contain at least a number and some text
  if (!/\d+/.test(address) || !/[a-zA-Z]/.test(address)) {
    return "Please enter a valid address (should include street number and name)";
  }
  if (address.length < 5) {
    return "Address is too short";
  }
  return null;
};

export const validateWebsite = (website) => {
  if (!website.trim()) {
    return "Website is required";
  }
  try {
    // Basic URL validation
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlRegex.test(website)) {
      return "Please enter a valid website URL (e.g., http://example.com)";
    }
    // If URL doesn't start with http/https, add it
    if (!website.startsWith("http://") && !website.startsWith("https://")) {
      return "URL must start with http:// or https://";
    }
  } catch (e) {
    return "Please enter a valid website URL";
  }
  return null;
};
// 验证菜系（必填）
export const validateCuisine = (cuisine) => {
  if (!cuisine || cuisine.trim() === "") {
    return "Cuisine is required";
  }
  return null;
};

// 验证价格（必填）
export const validatePrice = (price) => {
  if (price === "" || price === undefined) {
    return "Price is required";
  }
  return null;
};

// 验证评分（必填）
export const validateRating = (rating) => {
  if (rating === "" || rating === undefined) {
    return "Rating is required";
  }
  return null;
};

// 验证配送选项（必填）
export const validateDelivery = (delivery) => {
  if (!delivery || delivery.trim() === "") {
    return "Please specify delivery option";
  }
  return null;
};