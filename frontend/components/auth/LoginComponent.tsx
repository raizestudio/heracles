import { useState } from "react";
import { useRouter } from "next/navigation";

// Icons
import InfoIcon from "../icons/InfoIcon";

// Stores
import useUserStore from "@/stores/userStore";

// Libs
import { setCookie } from "@/app/actions/cookie";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useUserStore();

  const router = useRouter();

  const handleLogin = async () => {
    "use client";
    fetch("http://localhost:8000/auth/authenticate", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        await setCookie("token", data.token);
        login();
      })
      .then(() => {
        router.push("/app");
      });
  };
  return (
    <div className="flex flex-col grow">
      <div className="flex justify-center py-4">
        <div className="flex gap-1 p-2 bg-blue-200 rounded">
          <div className="">
            <InfoIcon />
          </div>
          <span className="text-xs">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry{`'`}s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 grow">
        <label className="text-xs">Email</label>
        <input
          className="p-2 rounded outline-none text-center"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>{email}</span>
        <label className="text-xs">Mot de passe</label>
        <input
          className="p-2 rounded outline-none text-center"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>{password}</span>
      </div>
      <div className="flex pt-4">
        <button
          className="grow p-1.5 bg-primary-100 rounded"
          onClick={handleLogin}
        >
          <span className="text-white">Me connecter</span>
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
