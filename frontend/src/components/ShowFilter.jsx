const ShowFilter = ({ sortBy, setSortBy }) => {
    return(
        <div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest</option>
                <option value="lowest">Lowest</option>
            </select>
        </div>
    )
}

export default ShowFilter