export default function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) {
    const siblings = 1; // Number of sibling pages to show on each side of the current page
    const boundary = 1; // Number of pages to show at the beginning and end of the pagination
    const leftDot = currentPage - siblings - boundary > 1;
    const rightDot = currentPage + siblings + boundary < totalPages;
    const showAll = totalPages <= 2 * siblings + 2 * boundary + 1;

    

    const numbers = [];
    if (showAll) {
        for(let i = 1; i <= totalPages; i++) {
            numbers.push(i);
        }
    } else {
        if (totalPages > 0) {
            numbers.push(1);
        }
        if(leftDot) {
            numbers.push(-1); // -1 will represent the "..." in the UI
        }
        for(let i = Math.max(2, currentPage - siblings); i <= Math.min(totalPages - 1, currentPage + siblings); i++) {
            numbers.push(i);
        }
        if(rightDot) {
            numbers.push(-2); // -2 will represent the "..." in the UI
        }
        if (totalPages > 1) {
            numbers.push(totalPages);
        }
    }

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
            >
                Previous
            </button>
            {numbers.map(page => ( page > 0 ? (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    {page}
                </button>
            ) : (
                <span key={page} className="mx-1 px-3 py-1">
                    ...
                </span>
            )))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );

}