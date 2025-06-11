

type Props = {
    query: string;
    onChange: (term: string) => void;
}

//const options = ['nature', 'cars', 'mountains', 'cities', 'technology'];

const SearchBar = ({query, onChange}: Props) =>{
    return(
        <input 
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        />
    );
};

export default SearchBar;