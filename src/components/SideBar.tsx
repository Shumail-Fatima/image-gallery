import { NavLink } from "react-router-dom";

const categories = ['nature', 'cars', 'cities'];

const SideBar = () =>{
    return(
        <aside className="w-64 p-4 border-r">
            <ul>
                {categories.map((cat) => (
                    <li key={cat}>
                        <NavLink to={`/category/${cat}`} className={({ isActive }) => isActive ? "active" : ""}>
                            {cat.charAt(0) .toUpperCase() + cat.slice(1)}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default SideBar;