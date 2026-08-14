import React, { useState } from "react";
import {
  Wallet as WalletIcon,
  LineChart,
  Clock,
  User,
  Settings,
  Moon,
  Sun,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownToLine,
  RefreshCw,
  X,
  Copy,
  Check,
  ChevronDown,
  QrCode,
  ArrowLeft,
} from "lucide-react";

// ---- Mock data ------------------------------------------------------------

const TRANSACTIONS = [
  {
    id: 1,
    type: "sent",
    address: "0x8a7d...4f2b",
    date: "May 20, 2024 · 10:45 AM",
    amount: "-150.00",
    status: "pending",
  },
  {
    id: 2,
    type: "received",
    address: "0x3c2e...9a1d",
    date: "May 19, 2024 · 08:30 PM",
    amount: "+300.00",
    status: "successful",
  },
  {
    id: 3,
    type: "sent",
    address: "0x7b1f...d9c3",
    date: "May 19, 2024 · 02:15 PM",
    amount: "-75.50",
    status: "failed",
  },
  {
    id: 4,
    type: "received",
    address: "0x9d8e...2b7a",
    date: "May 18, 2024 · 11:20 AM",
    amount: "+500.00",
    status: "successful",
  },
];

const NAV_ITEMS = [
  { key: "wallet", label: "Wallet", icon: WalletIcon },
  { key: "markets", label: "Markets", icon: LineChart },
  { key: "activity", label: "Activity", icon: Clock },
  { key: "profile", label: "Profile", icon: User },
  { key: "settings", label: "Settings", icon: Settings },
];

const WALLET_ADDRESS = "0x3c2e9a1d4b7f6c8e5d2a1b9c0e87d6a5b4c3d2e";

// ---- Status badge -----------------------------------------------------------

function StatusBadge({ status }) {
  const map = {
    pending: { label: "Pending", ring: "ring-black/15", dot: "bg-neutral-400" },
    successful: { label: "Successful", ring: "ring-black/15", dot: "bg-black" },
    failed: { label: "Failed", ring: "ring-black/15", dot: "bg-neutral-300" },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-medium tracking-wide text-neutral-700`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function TxRow({ tx }) {
  const isReceived = tx.type === "received";
  return (
    <div className="flex items-center justify-between border-b border-neutral-100 py-4 last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
            isReceived ? "border-black bg-black" : "border-neutral-300 bg-white"
          }`}
        >
          {isReceived ? (
            <ArrowDownToLine size={15} className="text-white" strokeWidth={2} />
          ) : (
            <ArrowUpRight size={15} className="text-black" strokeWidth={2} />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-black">
            {isReceived ? "Received from " : "Sent to "}
            <span className="font-mono text-neutral-500">{tx.address}</span>
          </p>
          <p className="mt-0.5 text-xs text-neutral-400">{tx.date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-semibold ${isReceived ? "text-black" : "text-neutral-500"}`}>
          {tx.amount} QUAI
        </p>
        <div className="mt-1 flex justify-end">
          <StatusBadge status={tx.status} />
        </div>
      </div>
    </div>
  );
}

// ---- Send panel -------------------------------------------------------------

function SendPanel({ onClose }) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black">
          <Check size={26} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-lg font-semibold text-black">Transaction submitted</p>
          <p className="mt-1 text-sm text-neutral-500">
            Sending {amount || "0.00"} QUAI to {recipient || "recipient"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-2 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Back to wallet
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-black"
          >
            <ArrowLeft size={17} />
          </button>
          <h2 className="text-lg font-semibold text-black">Send QUAI</h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-black"
        >
          <X size={17} />
        </button>
      </div>

      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">
        Recipient address
      </label>
      <input
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="0x..."
        className="mb-5 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 font-mono text-sm text-black placeholder-neutral-400 outline-none transition focus:border-black"
      />

      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">
        Amount
      </label>
      <div className="mb-5 flex items-center rounded-xl border border-neutral-200 bg-white px-4 py-3 transition focus-within:border-black">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full bg-transparent text-sm text-black placeholder-neutral-400 outline-none"
        />
        <span className="mx-2 text-sm text-neutral-400">QUAI</span>
        <button
          onClick={() => setAmount("1250.75")}
          className="text-xs font-semibold text-black underline underline-offset-2"
        >
          Max
        </button>
      </div>

      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">
        Network / Asset
      </label>
      <button className="mb-6 flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-black">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-black" />
          Quai Network (QUAI)
        </span>
        <ChevronDown size={16} className="text-neutral-400" />
      </button>

      <div className="mb-6 space-y-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-neutral-500">Network fee (est.)</span>
          <span className="font-medium text-black">0.10 QUAI</span>
        </div>
        <div className="flex items-center justify-between border-t border-neutral-200 pt-2">
          <span className="text-neutral-500">Total</span>
          <span className="font-semibold text-black">
            {amount ? (parseFloat(amount) + 0.1).toFixed(2) : "0.00"} QUAI
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 rounded-xl border border-neutral-200 bg-white py-3 text-sm font-medium text-black transition hover:bg-neutral-50"
        >
          Cancel
        </button>
        <button
          onClick={() => setConfirmed(true)}
          disabled={!recipient || !amount}
          className="flex-1 rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

// ---- Receive panel ----------------------------------------------------------

function QRPlaceholder() {
  // Deterministic pseudo-QR pattern, purely decorative
  const size = 21;
  const cells = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const inFinder =
        (x < 7 && y < 7) ||
        (x > size - 8 && y < 7) ||
        (x < 7 && y > size - 8);
      const on = inFinder
        ? (x < 7 && y < 7 && (x === 0 || x === 6 || y === 0 || y === 6 || (x > 1 && x < 5 && y > 1 && y < 5))) ||
          (x > size - 8 && y < 7 && ((x - (size - 7)) === 0 || (x - (size - 7)) === 6 || y === 0 || y === 6 || ((x - (size - 7)) > 1 && (x - (size - 7)) < 5 && y > 1 && y < 5))) ||
          (x < 7 && y > size - 8 && (x === 0 || x === 6 || (y - (size - 7)) === 0 || (y - (size - 7)) === 6 || (x > 1 && x < 5 && (y - (size - 7)) > 1 && (y - (size - 7)) < 5)))
        : rand() > 0.58;
      cells.push(on);
    }
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
      <rect width={size} height={size} fill="white" />
      {cells.map((on, i) =>
        on ? (
          <rect
            key={i}
            x={i % size}
            y={Math.floor(i / size)}
            width={1}
            height={1}
            fill="black"
          />
        ) : null
      )}
    </svg>
  );
}

function ReceivePanel({ onClose }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(WALLET_ADDRESS);
    } catch (e) {
      // clipboard unavailable — ignore
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-black"
          >
            <ArrowLeft size={17} />
          </button>
          <h2 className="text-lg font-semibold text-black">Receive QUAI</h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-black"
        >
          <X size={17} />
        </button>
      </div>

      <div className="mb-5 flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-black w-fit">
        <span className="h-2 w-2 rounded-full bg-black" />
        Quai Network
      </div>

      <div className="mb-5 flex items-center justify-center rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="h-48 w-48">
          <QRPlaceholder />
        </div>
      </div>

      <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-neutral-500">
        Your wallet address
      </p>
      <div className="mb-4 flex items-center justify-between gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
        <span className="truncate font-mono text-xs text-neutral-700">{WALLET_ADDRESS}</span>
      </div>

      <button
        onClick={copy}
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
        {copied ? "Copied" : "Copy address"}
      </button>

      <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-center text-xs text-neutral-500">
        Only send QUAI to this address via Quai Network.
      </div>
    </div>
  );
}

// ---- Main wallet view --------------------------------------------------------

function WalletView({ onNavigate }) {
  const [showBalance, setShowBalance] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1400);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-black">Wallet</h1>
        <button className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-sm font-medium text-black">
          <span className="h-2 w-2 rounded-full bg-black" />
          Quai Network
          <ChevronDown size={14} className="text-neutral-400" />
        </button>
      </div>

      <div className="mb-6 overflow-hidden rounded-2xl bg-black p-7 text-white">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => setShowBalance((s) => !s)}
              className="flex items-center gap-1.5 text-sm text-neutral-400 transition hover:text-white"
            >
              Your balance
              {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
            {refreshing ? (
              <div className="mt-3 flex items-center gap-2 text-2xl font-semibold">
                <RefreshCw size={20} className="animate-spin text-neutral-400" />
              </div>
            ) : (
              <>
                <p className="mt-2 text-4xl font-semibold tracking-tight">
                  {showBalance ? "1,250.75" : "••••••"}{" "}
                  <span className="text-xl font-medium text-neutral-400">QUAI</span>
                </p>
                <p className="mt-1 text-sm text-neutral-400">
                  ≈ {showBalance ? "$2,187.45" : "••••••"} USD
                </p>
              </>
            )}
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 text-2xl font-bold text-white/80">
            Q
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-3">
        <button
          onClick={() => onNavigate("send")}
          className="flex items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          <ArrowUpRight size={16} />
          Send
        </button>
        <button
          onClick={() => onNavigate("receive")}
          className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white py-3 text-sm font-medium text-black transition hover:bg-neutral-50"
        >
          <ArrowDownToLine size={16} />
          Receive
        </button>
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white py-3 text-sm font-medium text-black transition hover:bg-neutral-50"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-black">Recent transactions</h3>
        <button className="text-xs font-medium text-neutral-500 hover:text-black">View all</button>
      </div>
      <div className="mt-1">
        {TRANSACTIONS.map((tx) => (
          <TxRow key={tx.id} tx={tx} />
        ))}
      </div>
    </div>
  );
}

// ---- App shell ----------------------------------------------------------------

export default function Q4Wallet() {
  const [active, setActive] = useState("wallet");
  const [panel, setPanel] = useState(null); // null | 'send' | 'receive'

  return (
    <div className="flex min-h-[720px] w-full bg-neutral-50 font-sans text-black">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-neutral-200 bg-white p-5 sm:flex">
        <div className="mb-8 flex items-center gap-2 px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
            Q4
          </div>
          <span className="text-sm font-semibold tracking-tight text-black">Q4 Wallet</span>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActive(item.key);
                  setPanel(null);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-black text-white"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-black"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button className="mt-4 flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50">
          <Moon size={15} />
          Dark mode
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 sm:p-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
          {active !== "wallet" ? (
            <div className="flex h-96 flex-col items-center justify-center text-center text-neutral-400">
              <p className="text-sm">
                {NAV_ITEMS.find((n) => n.key === active)?.label} isn't part of this preview.
              </p>
              <button
                onClick={() => setActive("wallet")}
                className="mt-3 text-sm font-medium text-black underline underline-offset-2"
              >
                Back to wallet
              </button>
            </div>
          ) : panel === "send" ? (
            <SendPanel onClose={() => setPanel(null)} />
          ) : panel === "receive" ? (
            <ReceivePanel onClose={() => setPanel(null)} />
          ) : (
            <WalletView onNavigate={setPanel} />
          )}
        </div>
      </main>
    </div>
  );
}
