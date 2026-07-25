import { useState } from 'react';
import Pagination from './components/common/Pagination';

export default function App() {
  const [page, setPage] = useState(1);

  return (
    <main>
      <h1>Pagination Test</h1>

      <p>Current page: {page}</p>

      <Pagination
        currentPage={page}
        totalPages={5}
        onPageChange={setPage}
      />
    </main>
  );
}