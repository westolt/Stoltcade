const NameFilter = ({ filteredName, setFilteredName }) => {
    return(
        <input type="text" onChange={(e) => setFilteredName(e.target.value)} value={filteredName} placeholder="Search by name"/>
    )
}

export default NameFilter