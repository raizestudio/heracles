"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import { version } from "@/package.json";
import { toast } from "sonner";

// Stores
import useUserStore from "@/app/stores/userStore";

// Libs
import { fetcher } from "@/app/utils/fetcher"; // Assuming you have a fetcher function

// Interfaces
import { ISession } from "@/app/interfaces/SessionInterface";

interface FooterLandingProps {
  t?: string;
}

const detectIpType = (ip: string) => (ip.includes(":") ? "ipv6" : "ipv4");

const FooterLanding: React.FC<FooterLandingProps> = () => {
  const { session, setSession } = useUserStore();

  const { trigger } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/session/`,
    async (url: string, { arg }: { arg: { ip_v4?: string; ip_v6?: string } }) =>
      fetcher<{ session: ISession }>(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
      })
  );

  useEffect(() => {
    toast("Votre vie privée est importante", {
      description: `Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser notre trafic. En continuant votre navigation sur le site, vous consentez à l'utilisation de cookies.`,
      action: {
        label: "Fermer",
        onClick: () => toast.dismiss(),
      },
    })
    const fetchSession = async () => {
      try {
        const response = await fetch("https://freeipapi.com/api/json");
        const data = await response.json();

        const body =
          detectIpType(data.ipAddress) === "ipv4"
            ? { ip_v4: data.ipAddress }
            : { ip_v6: data.ipAddress };

        const result = await trigger(body);
        setSession(result.session);
      } catch (error) {
        console.error("Failed to fetch session:", error);
      }
    };

    fetchSession();
  }, [trigger, setSession]);

  return (
    <footer className="flex bg-gray-50 dark:bg-black p-4 shadow">
      <div className="flex flex-col">
        <span className="text-primary-100 text-sm font-semibold">
          Heracles - {new Date().getFullYear()}
        </span>
        <span className="text-xs">Lorem ipsum dolor sit amet.</span>
      </div>
      <div className="grow"></div>
      <div className="flex flex-col">
        <div className="flex justify-end gap-2">
          <Link href="/documentation" className="text-sm">
            Documentation
          </Link>
          <Link
            href="https://github.com/raizestudio/heracles"
            target="_blank"
            className="text-sm"
          >
            Le projet
          </Link>
        </div>
        <div className="flex justify-end gap-1.5">
          <span className="text-xs text-gray-700 dark:text-gray-300">{session?.id}</span>
          <span className="text-xs text-gray-700 dark:text-gray-300">v{version}</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterLanding;
