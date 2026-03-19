// screens/people/validators.js
export const validateFirstName = (firstName) => {
  if (!firstName.trim()) return "First name is required";
  if (firstName.length < 2) return "First name must be at least 2 characters";
  return null;
};

export const validateLastName = (lastName) => {
  if (!lastName.trim()) return "Last name is required";
  if (lastName.length < 2) return "Last name must be at least 2 characters";
  return null;
};

export const validateRelationship = (relationship) => {
  if (!relationship) return "Please select a relationship";
  return null;
};