

const SideMenu = ({ onClick }: { onClick: () => void }) => {
    return (
        <button onClick={onClick} className="hamburger-menu">
            &#9776; {/* This is a simple hamburger icon */}
        </button>
    );
};

export default SideMenu;