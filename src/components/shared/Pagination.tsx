interface PaginationProps {
    curPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    curPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const prevPageHandler = () => {
        if (curPage > 1) onPageChange(curPage - 1);
    };
    const nextPageHandler = () => {
        if (curPage < totalPages) onPageChange(curPage + 1);
    };

    return (
        <div className="pagination position" >
            <div className="actions">

                <button
                    className="btn"
                    title="Previous Page"
                    onClick={prevPageHandler}
                    disabled={curPage === 1}
                >
                    <i className="fa-solid fa-angles-left"></i>
                </button>
                <span style={{color: "#234465"}}>Page { curPage } of { totalPages }</span>
                <button
                    className="btn"
                    title="Next Page"
                    onClick={nextPageHandler}
                    disabled={curPage === totalPages || totalPages === 0}
                >
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
        </div>
    );
}
