const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mkt-pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ⬅ Anterior
      </button>

      <span>
        Página {currentPage} de {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Siguiente ➡
      </button>
    </div>
  );
};

export default Pagination;
