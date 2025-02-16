
import { useState } from "react";
import { DollarSign, Users, Percent, Copy, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Bill {
  total: number;
  people: number;
  tax: number;
  tip: number;
}

const BillSplitter = () => {
  const [bill, setBill] = useState<Bill>({
    total: 0,
    people: 1,
    tax: 0,
    tip: 0,
  });

  const calculateTotal = () => {
    const subtotal = bill.total;
    const taxAmount = (subtotal * bill.tax) / 100;
    const tipAmount = (subtotal * bill.tip) / 100;
    const total = subtotal + taxAmount + tipAmount;
    return total / bill.people;
  };

  const handleCopy = () => {
    const amountPerPerson = calculateTotal().toFixed(2);
    navigator.clipboard.writeText(`$${amountPerPerson}`);
    toast({
      title: "Copied to clipboard!",
      description: `$${amountPerPerson} per person`,
    });
  };

  const handleShare = async () => {
    const amountPerPerson = calculateTotal().toFixed(2);
    try {
      await navigator.share({
        title: "Split Bill",
        text: `Each person owes: $${amountPerPerson}`,
      });
    } catch (err) {
      handleCopy();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-3xl p-8 space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Split Bill
            </h1>
            <p className="text-gray-500">Simple bill splitting</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Bill Total
              </label>
              <input
                type="number"
                value={bill.total || ""}
                onChange={(e) =>
                  setBill({ ...bill, total: parseFloat(e.target.value) || 0 })
                }
                className="w-full p-4 text-3xl font-bold text-center rounded-xl bg-white/50 border-2 border-primary/20 focus:border-primary/40 focus:outline-none transition-all input-reset nice-shadow"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Number of People
              </label>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() =>
                    setBill({ ...bill, people: Math.max(1, bill.people - 1) })
                  }
                  className="w-12 h-12 rounded-full bg-white/50 border-2 border-primary/20 hover:bg-primary/10 transition-all flex items-center justify-center text-2xl"
                >
                  -
                </button>
                <span className="text-3xl font-bold w-16 text-center">
                  {bill.people}
                </span>
                <button
                  onClick={() => setBill({ ...bill, people: bill.people + 1 })}
                  className="w-12 h-12 rounded-full bg-white/50 border-2 border-primary/20 hover:bg-primary/10 transition-all flex items-center justify-center text-2xl"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Percent className="w-4 h-4" />
                  Tax (%)
                </label>
                <input
                  type="number"
                  value={bill.tax || ""}
                  onChange={(e) =>
                    setBill({ ...bill, tax: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full p-3 text-center rounded-xl bg-white/50 border-2 border-primary/20 focus:border-primary/40 focus:outline-none transition-all input-reset"
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Percent className="w-4 h-4" />
                  Tip (%)
                </label>
                <input
                  type="number"
                  value={bill.tip || ""}
                  onChange={(e) =>
                    setBill({ ...bill, tip: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full p-3 text-center rounded-xl bg-white/50 border-2 border-primary/20 focus:border-primary/40 focus:outline-none transition-all input-reset"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <div className="glass-card rounded-2xl p-6 text-center space-y-2">
                <p className="text-sm text-gray-500">Each person pays</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ${calculateTotal().toFixed(2)}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-all"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-secondary text-white font-medium hover:bg-secondary-hover transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillSplitter;
