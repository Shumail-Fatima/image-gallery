
type Props = {
    query: string;
    onChange: (term: string) => void;
}

const SearchBar = ({query, onChange}: Props) =>{
    return(
        <input 
            type="text"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search images..."
            className="search-input"
        />
    );
};

export default SearchBar;
