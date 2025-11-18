import { getShops } from '@/lib/api';
import Link from 'next/link';
import DeleteShopButton from '@/components/DeleteShopButton';
import LogoutButton from '@/components/LogoutButton';

export default async function AdminPage() {
  const shops = await getShops(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Panel</h1>
        <div className="flex gap-4 items-center">
          <Link
            href="/admin/shops/new"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold"
          >
            Add New Shop
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Name</th>
              <th className="px-6 py-4 text-left font-semibold">Location</th>
              <th className="px-6 py-4 text-left font-semibold">Phone</th>
              <th className="px-6 py-4 text-left font-semibold">Rating</th>
              <th className="px-6 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shops.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No shops found. Add your first shop!
                </td>
              </tr>
            ) : (
              shops.map((shop) => (
                <tr key={shop.id} className="border-t">
                  <td className="px-6 py-4 font-semibold">{shop.name}</td>
                  <td className="px-6 py-4">
                    {shop.suburb}, {shop.state}
                  </td>
                  <td className="px-6 py-4">{shop.phone}</td>
                  <td className="px-6 py-4">⭐ {shop.rating}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/shops/${shop.id}`}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </Link>
                    <DeleteShopButton shopId={shop.id} shopName={shop.name} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
