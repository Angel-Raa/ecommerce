export const formatUuidWithPrefix = (uuid: string) => {
    const base64 = btoa(uuid.replace(/-/g, '')); // Codificar en base64 sin guiones
    return `PED-${base64.slice(0, 10)}`; // Tomar solo los primeros 10 caracteres
}