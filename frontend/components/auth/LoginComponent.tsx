import InfoIcon from "../icons/InfoIcon";

const LoginComponent = () => {
  return (
    <div className="flex flex-col grow">
      <div className="flex justify-center py-4">
        <div className="flex gap-1 p-2 bg-blue-200 rounded">
          <div className="">
            <InfoIcon />
          </div>
          <span className="text-xs">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry{`'`}s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 grow">
        <label className="text-xs">Email</label>
        <input
          className="p-2 rounded outline-none"
          type="email"
          placeholder="Email"
        />
        <label className="text-xs">Mot de passe</label>
        <input
          className="p-2 rounded outline-none"
          type="password"
          placeholder="Password"
        />
      </div>
      <div className="flex pt-4">
        <button className="grow p-1.5 bg-primary-100 rounded">
          <span className="text-white">Me connecter</span>
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
