import { getShop } from '@/lib/api';
import { notFound } from 'next/navigation';
import ShopForm from '@/components/ShopForm';

interface EditShopPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditShopPage({ params }: EditShopPageProps) {
  const { id } = await params;
  const shop = await getShop(id);

  if (!shop) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Edit Shop</h1>
      <ShopForm shop={shop} />
    </div>
  );
}



