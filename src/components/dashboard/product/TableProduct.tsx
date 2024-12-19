const tableHeaders = [
  "",
  "Nombre",
  "Variante",
  "Precio",
  "Stock",
  "Fecha de creación",
  "",
];
export const TableProduct = () => {
  return (
    <>
      <div className="flex flex-col flex-1 border border-gray-200 rounded-lg p-5 bg-white">
        <h1 className="font-bold text-xl">Productos</h1>

        <p className="text-sm mt-1 mb-8 font-serif text-gray-500">
          Gestiona tus productos y mira las estadísticas de tus ventas
        </p>
        {/* Tabla */}


        {/* Controles de paginación */}
      </div>
    </>
  );
};
