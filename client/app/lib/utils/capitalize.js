export function capitalize(str) {
    const lowerCaseStr = str.toLowerCase();
    const capitalizedStr = lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
    return capitalizedStr;
  }