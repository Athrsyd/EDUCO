import React from 'react'

const ListKelas = ({ cls}) => {
    return (
        <div
            
            className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer shrink-0"
            style={{ width: "192px" }}
        >
            <div
                className="h-32"
                style={{ backgroundColor: "#D9D9D9" }}
            />
            <div className="p-3" style={{ backgroundColor: "#F2B50B" }}>
                <p
                    className="font-semibold text-sm"
                    style={{ color: "#F7F0F0" }}
                >
                    {cls.name}
                </p>
                <p
                    className="font-normal text-xs"
                    style={{ color: "#F7F0F0", opacity: 0.9 }}
                >
                    {cls.teacher}
                </p>
            </div>
        </div>
    )
}

export default ListKelas