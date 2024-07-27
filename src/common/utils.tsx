export const getGroupInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};


export const validateUsername = (value: string) => {
  const usernameRegex = /^[a-z]+$/;
  if (!usernameRegex.test(value)) {
    return "Username must contain only lowercase letters without spaces";
  }
  return true;
};


export const validatePassword = (value: string) => {
  if (value.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (/\s/.test(value)) {
    return "Password should not contain spaces";
  }
  return true;
};