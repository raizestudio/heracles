interface ProfilePageProps {
  t?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ t }) => {
  return (
    <div>
      <h1>Profil {t}</h1>
    </div>
  );
};

export default ProfilePage;