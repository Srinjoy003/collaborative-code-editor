"use client";

import IDE from "@/app/components/IDE";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Home() {
	const searchParams = useSearchParams();
	const type = searchParams.get("type");

	return (
		<main className="w-screen h-screen overflow-hidden">
			{type === "web" ? <WebDev /> : <IDE type={type}/>}
		</main>
	);
}
