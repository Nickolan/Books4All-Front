export default function BooksBlock ({books}) {

    return (
        <div>
            <div class='container-fluid border border-dark border-3'>
                <div>
                    <h2>Books Active:</h2>
                </div>
                <div>
                    <h2>{books.length}</h2>
                </div>
            </div>
        </div>
    )
}