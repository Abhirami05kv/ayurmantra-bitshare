import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import NoDataAvailable from "@/app/_components/Nodata";
import useOrderList from "@/app/_hooks/useOrderList";
import { toast } from "@/hooks/use-toast";

type GiftCard = {
  giftCardPurchaseId: number;
  giftCardId: number;
  title: string;
  purchaseAmount: number;
  balance: string;
  uniqueCode: string;
  purchaseDate: string;
  isRedeemed: boolean;
};

export default function Giftcards() {
  const { data: orders } = useOrderList();
  const apiUrl = process.env.NEXT_PUBLIC_VITE_API_URL;
  console.log("apiUrl ==>", apiUrl);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "copied to clipboard!",
      description: `Code ${code} copied to clipboard!`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Giftcards</h1>

      {/* Gift card list */}
      <div className="space-y-4">
        {orders?.giftCards.map((card: GiftCard) => (
          <Card
            key={card.giftCardPurchaseId}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <Badge
                      className={
                        card.isRedeemed
                          ? "bg-[#f9c120] text-white"
                          : "bg-green-500 text-white"
                      }
                    >
                      {card.isRedeemed ? "Redeemed" : "Active"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    Purchased:{" "}
                    {new Date(card.purchaseDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">Balance:</p>
                    <p className="text-xl font-bold">${card?.balance}</p>
                  </div>

                  {card.uniqueCode ? (
                    <div className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                      <code className="text-sm">{card?.uniqueCode}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(card?.uniqueCode)}
                        className="h-8 w-8 p-0"
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  ) : (
                    <span className="text-amber-600 text-sm">Pending</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {orders?.giftCards?.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <NoDataAvailable />
          </div>
        )}
      </div>
    </div>
  );
}
