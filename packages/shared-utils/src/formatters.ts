export const Formatters = {
    // format data to ISO string 
    formatDate: (date: Date): string => {
        return date.toISOString();
    },
    toSlug: (text: string): string => {
        return text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
            .replace(/-+/g, '-');
    },

    formatFullName: (firstName: string, lastName: string): string => {
        return `${firstName} ${lastName}`.trim();
    },

    // amsk emails for privacy (show onkly first two characters )
    maskEmail: (email: string): string => {
        const [name, domain] = email.split('@');
        if (name.length <= 2) return `${name}@${domain}`;
        return `${name.substring(0, 2)}***@${domain}`;
    },

    // format phoen numbeer r
    formatPhone: (phone: string): string => {
        // Remove all non-diogits 
        const digits = phone.replace(/\D/g, '');
        if (digits.length !== 10) return phone;
        return `(${digits.substring(0, 3)}) ${digits.substring(
            3,
            6
        )}-${digits.substring(6)}`;
    },
    // Convert bytes to human readable size
    formatBytes: (bytes: number): string => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    },
    // Format currency
    formatCurrency: (amount: number, currency: string = 'USD'): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
      }).format(amount);
    },


}