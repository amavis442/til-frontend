const base = import.meta.env.VITE_API_BASE_URL;

export interface TIL {
  id?: number;
  title: string;
  content: string;
  category: string;
  created_at?: string | null;
  html?: string | null;
}

export async function getTILs(): Promise<TIL[]> {
  const res = await fetch(`${base}/api/tils`);
  if (!res.ok) throw new Error('Failed to load TILs');
  return res.json();
}

export async function createTIL(data: TIL): Promise<void> {
  const res = await fetch(`${base}/api/tils`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create TIL');
}

export async function getTIL(id: number): Promise<TIL> {
  const res = await fetch(`${base}/api/tils/${id}`);
  if (!res.ok) throw new Error('Failed to fetch TIL');
  return res.json();
}

export async function updateTIL(id: number, til: Partial<TIL>): Promise<TIL> {
  const res = await fetch(`${base}/api/tils/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(til)
  });
  if (!res.ok) throw new Error('Failed to update TIL');
  return res.json();
}

export async function searchTILs(params: URLSearchParams) {
  const res = await fetch(`${base}/api/tils/search?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to load TILs');
  return res.json();
}

export async function post<T>(url: string, data: any): Promise<T> {
	const res = await fetch(`${base}${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	if (!res.ok) throw new Error(await res.text());
	return res.json();
}