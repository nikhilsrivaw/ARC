"use strict";
//validators for common data types 
Object.defineProperty(exports, "__esModule", { value: true });
exports.validators = void 0;
exports.validators = {
    //email validation
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    // Password VAlidation (min 8 chars and 1 uppercase and 1 number )
    isValidPassword: (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    },
    //UUId validation 
    isValidUUID: (uuid) => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    },
    // Workspace slug validation (alphanumeric + hyphen)
    isValidSlug: (slug) => {
        const slugRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
        return slugRegex.test(slug);
    },
    // Check if number is in valid range
    isInRange: (value, min, max) => {
        return value >= min && value <= max;
    },
    // Validate JWT format
    isValidJWT: (token) => {
        const parts = token.split('.');
        return parts.length === 3;
    },
};
//# sourceMappingURL=validators.js.map