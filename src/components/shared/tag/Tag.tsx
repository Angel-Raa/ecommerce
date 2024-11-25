import React from "react";

type  tagType = 'Nuevo' | 'Agotado';

interface Props {
    contentTag: tagType,
}

const getTagColor = (contentTag: tagType) => {
    const lowerContent = contentTag.toLowerCase();
    if (lowerContent === 'Nuevo') return 'bg-blue-500';
    if (lowerContent === 'Agotado') return 'bg-black';
    return 'bg-gray-500'
}
export const Tag = ({contentTag}: Props): React.JSX.Element => {
    return (
        <>
            <div className={`text-white w-fit px-2 ${getTagColor(contentTag)}`}>
                <p className="uppercase text-xs font-medium">
                    {contentTag}
                </p>
            </div>
        </>
    )
}