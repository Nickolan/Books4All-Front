export default function BooksBlockBan ({banBooks}) {

    return (
        <div>
            <div class='container-fluid border border-dark border-3'>
                <div>
                    <h2>Books Blocked:</h2>
                </div>
                <div>
                    <h2>{banBooks.length}</h2>
                </div>
            </div>
        </div>
    )
}