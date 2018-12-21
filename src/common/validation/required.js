export default function(object, requiredFields) {
  const failures = requiredFields.reduce((acc, field) => {
    const value = object[field];
    if (!value) {
      return [
        ...acc,
        field,
      ];
    }
    return acc;
  }, [])

  return {
    isValid: !failures.length,
    failures,
  }
}
