import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";

// Stores
import useUserStore from "@/app/stores/userStore";

// Libs
import { setCookie } from "@/app/actions/cookie";

// Components
import LoadingSpinner from "@/app/components/loading/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Fetcher
import { fetcher } from "@/app/utils/fetcher";

// Interfaces
import { UserInterface } from "@/app/interfaces/UserInterface";

interface LoginComponentProps {
  isLoading?: boolean;
  toggleLoading: (value: boolean) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({
  isLoading,
  toggleLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useUserStore();
  const router = useRouter();

  const { trigger } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/authenticate/`,
    async (
      url: string,
      { arg }: { arg: { email: string; password: string } }
    ) =>
      fetcher<{ token: string; user: UserInterface }>(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
      })
  );

  const handleLogin = async () => {
    try {
      toggleLoading(true);
      setErrorMessage(null);

      const data = await trigger({ email, password });

      if (data) {
        // Save token and login user
        localStorage.setItem("token", data.token);
        await setCookie("token", data.token);
        login(data.user);

        // Navigate to app
        router.push("/app");
      }
    } catch (error) {
      if (error instanceof Error) {
        // Handle the error as an instance of the Error object
        setErrorMessage(error.message || "Failed to log in.");
        toast.error("Quelque chose s'est mal passé.", {
          description: error.message || "Failed to log in.",

          action: {
            label: "Fermer",
            onClick: () => toast.dismiss(),
          },
        });
      } else {
        // Fallback for unknown error structures
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <div className="flex flex-col grow gap-2">
      <Input
        placeholder="Email"
        size={64}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button disabled={isLoading} onClick={handleLogin}>
        {isLoading ? <LoadingSpinner /> : "Me connecter"}
      </Button>
      {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
    </div>
  );
};

export default LoginComponent;
