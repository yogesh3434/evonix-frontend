import Button from './Button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    disabled = false,
}: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    return (
        <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-8">
            <Button
                onClick={goToPreviousPage}
                disabled={disabled || currentPage === 1}
                aria-label="Go to previous page"
                variant="outline"
                size="sm"
            >
                Previous
            </Button>

            <div className="flex items-center gap-1">
                {pageNumbers.map((pageNumber) => (
                    <Button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        disabled={disabled || pageNumber === currentPage}
                        aria-current={
                            pageNumber === currentPage ? 'page' : undefined
                        }
                        aria-label={`Go to page ${pageNumber}`}
                        variant={pageNumber === currentPage ? "primary" : "outline"}
                        size="sm"
                        className="w-10 h-10 p-0 rounded-full"
                    >
                        {pageNumber}
                    </Button>
                ))}
            </div>

            <Button
                onClick={goToNextPage}
                disabled={disabled || currentPage === totalPages}
                aria-label="Go to next page"
                variant="outline"
                size="sm"
            >
                Next
            </Button>
        </nav>
    );
}