import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";

// Icons
import InfoIcon from "@/app/components/icons/InfoIcon";

// Stores
import useUserStore from "@/app/stores/userStore";

// Libs
import { setCookie } from "@/app/actions/cookie";

// Components
import LoadingSpinner from "@/app/components/loading/LoadingSpinner";

// Fetcher
import { fetcher } from "@/app/utils/fetcher";

// Interfaces
import { UserInterface } from "@/app/interfaces/UserInterface";

interface LoginComponentProps {
  isLoading?: boolean;
  toggleLoading: (value: boolean) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ isLoading, toggleLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useUserStore();
  const router = useRouter();

  const { trigger } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/authenticate`,
    async (url: string, { arg }: { arg: { email: string; password: string } }) =>
      fetcher<{ token: string; user: UserInterface }>(url, {
        method: "POST",
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
      } else {
        // Fallback for unknown error structures
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <div className="flex flex-col grow">
      <div className="flex justify-center py-4">
        <div className="flex gap-1 p-2 bg-blue-200 rounded">
          <div>
            <InfoIcon />
          </div>
          <span className="text-xs">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry{`'`}s standard dummy
            text ever since the 1500s.
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 grow">
        <label className="text-xs">Email</label>
        <input
          className="p-2 rounded outline-none text-center"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-xs">Password</label>
        <input
          className="p-2 rounded outline-none text-center"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
      <div className="flex pt-4">
        <button
          className="grow p-1.5 bg-primary-100 rounded disabled:bg-gray-200"
          disabled={isLoading}
          onClick={handleLogin}
        >
          {isLoading ? (
            <div>
              <LoadingSpinner width="20" height="20" />
            </div>
          ) : (
            <span className="text-white">Me connecter</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
