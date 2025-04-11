import SearchBar from "./SearchBar";

export default function SearchResult() {
    const params = new URLSearchParams(document.location.search);
    const query = params.get("query") || "";
    
    return (<>
        <SearchBar defaultValue={query}></SearchBar>
    </>)
}
