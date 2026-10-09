import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Screen, Section, StatRow } from '../components/ui';
import { AppHeader, CtaSection } from '../components/shell';
import { colors, radius, spacing, type } from '../theme';
import { TEAM } from '../data/team';
import { TabParamList } from '../navigation';

const WHY = [
  { title: 'Pro Equipment', body: 'RTX 4090 GPUs, AMD Ryzen 9 chips, 360Hz monitors and ultra low latency gear.' },
  { title: 'Expert Coaches', body: 'Learn from high-ranked radiant and challenger tier game specialists.' },
  { title: 'Tournament Ready', body: 'Dedicated broadcast booths, custom team rooms, zero-jitter gigabit lines.' },
  { title: 'Community Hub', body: 'Weekly esports viewings, casual LAN parties and friendly scrimmages.' },
];

export default function AboutScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  return (
    <Screen>
      <AppHeader />

      <Section
        eyebrow="BUILT BY PLAYERS, FOR PLAYERS"
        title="ABOUT OUR ESPORTS HAVEN"
        lede="A local sanctuary for players who want to connect, compete and reach their next level."
      />

      <Section eyebrow="OUR MISSION" title="EMPOWERING EVERY PLAYER TO REACH THEIR NEXT LEVEL." />
      <View style={styles.mission}>
        <Text style={styles.missionBody}>
          Next Level Arena was built by esports players, for esports players. We aim to break down
          limits by providing accessibility to tournament-grade hardware, expert coaching, and a
          local sanctuary.
        </Text>
      </View>

      <StatRow
        stats={[
          { value: '50+', label: 'Elite PC Rigs' },
          { value: '20+', label: 'Latest Consoles' },
          { value: '500+', label: 'Tournaments' },
        ]}
      />

      <Section eyebrow="MADE FOR YOUR NEXT LEVEL" title="WHY BATTLE WITH US?" />

      {WHY.map((item) => (
        <View key={item.title} style={styles.why}>
          <Text style={[type.h3, { color: colors.text }]}>{item.title}</Text>
          <Text style={styles.whyBody}>{item.body}</Text>
        </View>
      ))}

      <Section eyebrow="THE PEOPLE BEHIND THE PLAY" title="MEET THE LEADERSHIP" />

      {TEAM.map((member) => (
        <View key={member.name} style={styles.member}>
          <Image source={member.avatar} style={styles.avatar} />
          <View>
            <Text style={[type.h3, { color: colors.text }]}>{member.name}</Text>
            <Text style={styles.memberRole}>{member.role}</Text>
          </View>
        </View>
      ))}

      <CtaSection
        title="COME FIND YOUR COMMUNITY."
        buttonLabel="Explore arena packages"
        onPress={() => navigation.navigate('Packages')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  mission: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.lg,
  },
  missionBody: { ...type.body, color: colors.muted },
  why: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    gap: spacing.xs,
  },
  whyBody: { ...type.small, color: colors.muted },
  member: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
  },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  memberRole: { ...type.small, color: colors.muted },
});
