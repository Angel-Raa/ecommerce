// Función para formatear la fecha a formato 3 de enero de 2022
export const formatDateLong = (date: string): string => {
    const dateObject = new Date(date);

    return dateObject.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
