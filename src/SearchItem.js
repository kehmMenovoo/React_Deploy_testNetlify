const SearchItem = ({search, setSearch}) => {
    return (
        <form className="searchForm" onChange={(e)=>e.preventDefault()} style={{marginBottom: "15px", paddingBottom: "15px", borderBottom: "1px dashed gray"}}>
            <input 
                type="text" 
                id="search" 
                role="searchbox"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{height: "40px"}}
            />
        </form>
    )
}

export default SearchItem
