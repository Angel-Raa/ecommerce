import {IoSearch} from "react-icons/io5";
import {Link} from "react-router-dom";


export const CellNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
                <div className="mb-6">
                    <IoSearch className="mx-auto h-12 w-12 text-gray-400"/>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Célula no encontrada</h1>
                <p className="text-gray-600 mb-6">
                    Lo sentimos, no hemos podido encontrar la célula que buscas. Por favor, verifica la información e
                    inténtalo nuevamente.
                </p>
                <Link to={'/'}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out">
                    Volver a buscar
                </Link>
            </div>
        </div>
    )
}

