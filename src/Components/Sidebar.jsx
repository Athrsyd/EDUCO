import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ handleLogout, icon1, icon2, icon3, icon4, link1, link2, link3 }) => {
    const { pathname } = useLocation();

    const isActive = (link) => {
        if (!link) return false;
        return pathname === link || pathname.startsWith(`${link}/`);
    };

    return (
        <aside
            className="hidden  z-999 md:flex flex-col items-center pt-4  gap-6"
            style={{
                width: "64px",
                minWidth: "64px",
                backgroundColor: "#EDEAE4",
                height: "calc(100vh - 64px)",
            }}
        >
            {/* Active: Graduation Cap */}
            <Link to={link1}>
                <div
                    className={`w-10 h-10 ${isActive(link1) ? 'bg-accent/30 opacity-100' : 'opacity-60'} rounded-xl flex items-center justify-center cursor-pointer hover:opacity-100 hover:scale-110 transition-all duration-150`}
                >
                    <div style={{ color: "#F7F0F0" }}>
                        {icon1}
                    </div>
                </div>
            </Link>

            {/* Inactive: ListChecks */}
            <Link to={link2}>
                <div
                    className={`w-10 h-10 ${isActive(link2) ? 'bg-accent/30 opacity-100' : 'opacity-60'} flex rounded-xl items-center justify-center cursor-pointer  hover:opacity-100 hover:scale-110 transition-all duration-150`}
                >
                    {icon2}
                </div>
            </Link>
            {/* Inactive: Gamepad2 */}
            <Link to={link3}>
                <div
                    className={`w-10 h-10 ${isActive(link3) ? 'bg-accent/30 opacity-100' : 'opacity-60'} flex rounded-xl items-center justify-center cursor-pointer  hover:opacity-100 hover:scale-110 transition-all duration-150`}
                >
                    {icon3}
                </div>
            </Link>


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