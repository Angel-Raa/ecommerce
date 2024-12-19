import { useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useProducts } from "../../../hook";
import { Loading } from "../../shared/loading/Loading";
import { formatDateLong, formatPrice } from "../../../utils";
import { Pagination } from "../../shared/pagination/Pagination";
import { CellTableProduct } from "./CellTableProduct";

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
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: number;
  }>({});
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const { products, isLoading, totalProduct } = useProducts({ page });
  const handlerDeleteProduct = (values: string): void => {
    console.log(values);
  };
  const handlerMenuToggle = (value: number) => {
    if (openMenu === value) {
      setOpenMenu(null);
    } else {
      setOpenMenu(value);
    }
  };

  const handlerVariantChange = (productId: string, i: number) => {
    setSelectedVariants({
      ...selectedVariants,
      [productId]: i,
    });
  };

  if (isLoading || !products || !totalProduct) return <Loading />;
  return (
    <>
      <div className="flex flex-col flex-1 border border-gray-200 rounded-lg p-5 bg-white">
        <h1 className="font-bold text-xl">Productos</h1>

        <p className="text-sm mt-1 mb-8 font-serif text-gray-500">
          Gestiona tus productos y mira las estadísticas de tus ventas
        </p>

        {/* Tabla */}

        <div className="relative w-full h-full">
          <table className="text-sm w-full caption-bottom overflow-auto">
            <thead>
              <tr className="text-sm font-bold">
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="text-left p-2 border-b border-gray-200 h-12 px-4 pd-3 "
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => {
                const selectedVariantIndex = selectedVariants[product.id] ?? 0;
                const selectedVariant = product.variants[selectedVariantIndex];

                return (
                  <tr key={i}>
                    <td className="p-4 align-middle sm:table-cell">
                      <img
                        src={
                          product.images[0] ||
                          "https://ui.shadcn.com/placeholder.svg"
                        }
                        alt="Sample"
                        loading="lazy"
                        decoding="async"
                        className="w-16 h-16 aspect-square rounded-md object-contain"
                      />
                    </td>
                    <td className="p-4 font-medium tracking-tight">
                      {product.name}
                    </td>
                    <td className="p-4 font-medium tracking-tight">
                      <select
                        onChange={(e) =>
                          handlerVariantChange(
                            product.id,
                            Number(e.target.value)
                          )
                        }
                        value={selectedVariantIndex}
                        className="border border-gray-300 rounded-md p-1 w-full"
                        name="variants"
                        id="variants"
                      >
                        {product.variants.map((variant, i) => (
                          <option value={variant.id} key={i}>
                            {variant.color_name} - {variant.storage}
                          </option>
                        ))}
                      </select>
                    </td>
                    <CellTableProduct
                      content={formatPrice(selectedVariant.price)}
                    />

                    <CellTableProduct
                      content={selectedVariant.stock.toString()}
                    />

                    <CellTableProduct content={formatDateLong(product.created_at)} />
                    <td className="relative">
                      <button
                        onClick={() => handlerMenuToggle(i)}
                        className="text-slate-900"
                      >
                        <FaEllipsis size={20} />
                      </button>
                      {openMenu === i && (
                        <div
                          className="absolute right-0 mt-2 bg-white border-gray-200 rounded-md shadow-xl z-10 w-[120px]"
                          role="menu"
                        >
                          <Link
                            to={`/dashboard/productos/editar/${product.slug}`}
                            className="flex items-center gap-1 w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                          >
                            Editar
                            <HiOutlineExternalLink
                              size={15}
                              className="inline-block"
                            />
                          </Link>
                          <button
                            onClick={() => handlerDeleteProduct(product.id)}
                            className="blok w-full text-left px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Controles de paginación */}
        <Pagination page={page} setPage={setPage} totalItems={totalProduct} />
      </div>
    </>
  );
};
