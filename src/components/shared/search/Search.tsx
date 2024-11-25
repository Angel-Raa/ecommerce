import {HiOutlineSearch} from "react-icons/hi";
import React, {useState} from "react";
import {IoMdClose} from "react-icons/io";
import {useGlobalStore} from "../../../store/global.store";
import {formatPrice, Product} from "../../../utils";
import {searchProduct} from "../../../actions/product/product";
import {useNavigate} from "react-router";

export const Search: React.FC = (): React.JSX.Element => {
    const [search, setSearch] = useState<string>("")
    const [searchResults, setSearchResults] = useState<Product[]>([])
    const navigate = useNavigate();

    const closeSheet = useGlobalStore(state => state.closeSheet);
    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        if (search.trim()) {
            // TODO; Busca Productos
            const products = await searchProduct(search);
            setSearchResults(products);

        }

    }
    return (
        <>
            <div className={"py-5 px-7 flex gap-10 items-center border-b border-slate-200"}>
                <form className={"flex gap-3 items-center flex-1"} onSubmit={handleSearch}>
                    <HiOutlineSearch size={25} className={""}/>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className={"outline-none w-full text-sm"}
                        placeholder="Search..."/>
                    <button type={"button"} onClick={closeSheet}>
                        <IoMdClose size={25} className={"text-black"}/>
                    </button>
                </form>
            </div>
            {/** TODO:  Mostra los resultado de una busqueda**/}
            <div className="p-5">
                {
                    searchResults.length > 0 ? (
                        <ul>
                            {
                                searchResults.map((item: Product) => (
                                    <li className={"py-2 items-center gap-3"} key={item.id}>
                                        <button
                                            onClick={() => {
                                                navigate(`/celulares/${item.slug}`);
                                                closeSheet()
                                            }}
                                            className={"flex items-center gap-3"}>
                                            <img className={"h-20 w-20 object-contain p-3"} alt={item.name}
                                                 src={item.images[0]}/>
                                            <div className={"flex flex-col gap-1"}>
                                                <p className={"text-sm font-medium group-hover:underline"}>
                                                    {item.name}
                                                </p>
                                                <p className={"text-[13px] text-gray-700"}>
                                                    {item.variants[0].storage} /{' '}
                                                    {item.variants[0].color_name}
                                                </p>
                                                <p className={"text-sm font-medium text-gray-700"}>
                                                    {formatPrice(item.variants[0].price)}
                                                </p>
                                            </div>

                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        <p className={"text-sm font-medium text-gray-700"}>
                            No se encontraron resultados .
                        </p>
                    )
                }

            </div>
        </>
    )
}