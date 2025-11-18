'use client';

import { useRouter } from 'next/navigation';

export default function DeleteShopButton({ shopId, shopName }: { shopId: string; shopName: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete ${shopName}?`)) return;

    try {
      const response = await fetch(`/api/shops/${shopId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete shop');
      }
    } catch (error) {
      console.error('Error deleting shop:', error);
      alert('Error deleting shop');
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:underline"
    >
      Delete
    </button>
  );
}

