//validators for common data types 


export const validators = {
    //email validation
    isValidEmail: (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);

    },

    // Password VAlidation (min 8 chars and 1 uppercase and 1 number )
    isValidPassword: (password: string): boolean => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    },

    //UUId validation 
    isValidUUID: (uuid: string): boolean => {
        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    },

    // Workspace slug validation (alphanumeric + hyphen)
    isValidSlug: (slug: string): boolean => {
      const slugRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
      return slugRegex.test(slug);
    },

     // Check if number is in valid range
    isInRange: (value: number, min: number, max: number): boolean => {
      return value >= min && value <= max;
    },
    // Validate JWT format
    isValidJWT: (token: string): boolean => {
      const parts = token.split('.');
      return parts.length === 3;
    },
}