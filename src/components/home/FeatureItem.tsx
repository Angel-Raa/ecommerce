interface Props {
    icon: React.JSX.Element;
    title: string,
    description: string,
}
export  const FeatureItem = ({description, title, icon}:Props) => {
    return (
        <>
            <div className="group p-6 rounded-xl transition-all duration-300 hover:bg-gray-50 hover:shadow-lg w-full">
                <div className="flex items-start gap-4">
                    <div
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors duration-300">
                        {icon}
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}