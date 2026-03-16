import {useState} from 'react'

const Sidebar = ({ handleLogout,icon1, icon2, icon3, icon4, link1, link2, link3 }) => {
    const [activeItem, setActiveItem] = useState(0);

    return (
        <aside
            className="hidden fixed z-999 h-screen md:flex flex-col items-center pt-4 gap-6"
            style={{
                width: "64px",
                minWidth: "64px",
                backgroundColor: "#EDEAE4",
                height: "calc(100vh - 64px)",
            }}
        >
            {/* Active: Graduation Cap */}
            <div
                className={`w-10 h-10 ${activeItem === 0 ? 'bg-accent/30 opacity-100' : 'opacity-60'} rounded-xl flex items-center justify-center cursor-pointer hover:opacity-100 hover:scale-110 transition-all duration-150`}
                onClick={() => setActiveItem(0)}
            >
                <div style={{ color: "#F7F0F0" }}>
                    {icon1}
                </div>
            </div>

            {/* Inactive: ListChecks */}
            <div 
                className={`w-10 h-10 ${activeItem === 1 ? 'bg-accent/30 opacity-100' : 'opacity-60'} flex rounded-xl items-center justify-center cursor-pointer  hover:opacity-100 hover:scale-110 transition-all duration-150`}
                onClick={() => setActiveItem(1)}
            >
                {icon2}
            </div>

            {/* Inactive: Gamepad2 */}
            <div 
                className={`w-10 h-10 ${activeItem === 2 ? 'bg-accent/30 opacity-100' : 'opacity-60'} flex rounded-xl items-center justify-center cursor-pointer hover:opacity-100 hover:scale-110 transition-all duration-150`}
                onClick={() => setActiveItem(2)}
            >
                {icon3}
            </div>

            {/* Logout at bottom */}
            <div 
            onClick={handleLogout} 
            className="mt-auto mb-6 w-10 h-10 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-150">
                {icon4}
            </div>
        </aside>
    )
}

export default Sidebar