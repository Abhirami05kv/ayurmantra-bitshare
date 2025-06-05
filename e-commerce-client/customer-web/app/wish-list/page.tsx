import React from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';

const Wishlist = () => {
  const wishlistProducts = [
    {
      id: 1,
      name: 'Smartphone',
      category: 'Electronics',
      price: '$699',
      image: '/massage.jpg'
    },
    {
      id: 2,
      name: 'Running Shoes',
      category: 'Sports & Outdoors',
      price: '$120',
      image: '/massage.jpg'
    }
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">Wishlist</h1>
          <p className="text-muted-foreground mt-1">
            {wishlistProducts.length} saved items
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlistProducts.map((product) => (
          <Card key={product.id} className="group relative bg-gray-50 border-0 rounded-xl overflow-hidden">
            <div className="aspect-square overflow-hidden">
            
              <Image src={product?.image} alt={product?.name} className="w-full h-full  object-cover" height={200} width={200}/>
            </div>
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                  <h3 className="text-sm font-medium mt-1">{product.name}</h3>
                  <p className="text-md font-semibold mt-1">{product.price}</p>
                </div>
                <Button size="sm" className="mt-1">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
