import { AvatarDisplay } from "../AvatarDisplay/AvatarDisplay";

interface ProfileDisplayProps {
  profile: Profile;
}

function ProfileDisplay(props: ProfileDisplayProps) {
  const { avatar, username, level, experience } = props.profile;

  return (
    <div>
      <AvatarDisplay
        avatar={avatar}
        username={username}
        level={level}
        experience={experience}
      />
      {/* Avatar broder Image */}
      {/* Current Level */}
      {/* Stats */}
    </div>
  );
}

export { ProfileDisplay };
