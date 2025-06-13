import { NavLink } from "react-router-dom";

const categories = ['nature', 'cars', 'cities'];

const SideBar = () =>{
    return(
        <aside className="app-sidebar">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li>
                    <NavLink to="/"
                        style={({isActive}) => (
                            {
                            display: 'block',
                            padding: '12px 24px',
                            color: isActive ? '#fff' : '#333',
                            background: isActive ? '#007bff' : 'none',
                            textDecoration: 'none',
                            borderRadius: 4,
                            marginBottom: 12,
                            fontWeight: 700
                            }
                        )}
                    >
                        Home
                    </NavLink>
                </li>
                {categories.map((cat) => (
                    <li key={cat}>
                        <NavLink
                            to={`/category/${cat}`}
                            style={({ isActive }) => ({
                                display: 'block',
                                padding: '12px 24px',
                                color: isActive ? '#fff' : '#333',
                                background: isActive ? '#007bff' : 'none',
                                textDecoration: 'none',
                                borderRadius: 4,
                                marginBottom: 4,
                                fontWeight: 500
                            })}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default SideBar;