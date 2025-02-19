export const validateRequiredFields = (data: any, requiredFields: string[]) => {
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`${field} is a required field`);
    }
  }
};
