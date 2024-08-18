import { useState } from 'react';

export default function TemplateSearch() {
  const [query, setQuery] = useState('');

  return (
    <input
      type="text"
      className="w-full p-2 border rounded mb-4"
      placeholder="Search Templates"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
