export async function downloadWithAuth(url, filename) {
  const access = localStorage.getItem('access');
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${access}` },
  });
  if (!res.ok) throw new Error('No se pudo generar el PDF');
  const blob = await res.blob();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  link.remove();
}
