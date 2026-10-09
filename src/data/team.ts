export type TeamMember = {
  name: string;
  role: string;
  avatar: number;
};

const avatars = {
  viper: require('../assets/avatar-viper.png'),
  glitch: require('../assets/avatar-glitch.png'),
  zero: require('../assets/avatar-zero.png'),
};

export const TEAM: TeamMember[] = [
  { name: "Marcus 'Viper' Vance", role: 'Arena Founder & Head Coach', avatar: avatars.viper },
  { name: "Sarah 'Glitch' Chen", role: 'Tournament Coordinator', avatar: avatars.glitch },
  { name: "Elena 'Zero' Rostova", role: 'Hardware Architect', avatar: avatars.zero },
];
