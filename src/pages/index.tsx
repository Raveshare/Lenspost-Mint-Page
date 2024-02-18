import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen flex items-center justify-center">
      <button
        className="bg-[#F0F0F8] px-3 py-2 rounded-lg"
        onClick={() => router.push("/1")}
      >
        Mint NFT
      </button>
    </div>
  );
}
