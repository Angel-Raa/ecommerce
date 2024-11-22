import {ImSpinner9} from "react-icons/im";

export const Loading = (): React.JSX.Element => {
    return (
        <>
            <div className="flex items-center justify-center h-screen bg-white">
                <ImSpinner9 size={80} className={"animate-spin"}/>
            </div>
        </>
    )
}