export function formatCardNumber(value) {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    // Limit to 16 digits
    const limited = digits.slice(0, 16);
    // Add spaces every 4 digits
    return limited.replace(/(\d{4})(?=\d)/g, '$1 ');
}

export function formatExpiry(value) {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
        // Format as MM/YY
        return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
}