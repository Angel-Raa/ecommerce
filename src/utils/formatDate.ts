export const formatDate = (date: string): string => {
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
    });
};