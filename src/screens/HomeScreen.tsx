import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Screen, Section, StatRow, Button } from '../components/ui';
import { OfferingCard } from '../components/cards';
import { AppHeader, CtaSection } from '../components/shell';
import { colors, radius, spacing, type } from '../theme';
import { CONTACT, findOffering } from '../data/offerings';
import { TabParamList } from '../navigation';

const HERO = CONTACT.heroImage;

export default function HomeScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  // Cards navigate to the Packages tab; the tab holds the stack that opens
  // each offering's detail page.
  const openOffering = () => navigation.navigate('Packages');
  const featured = ['ultimate-gamer-pass', 'vip-gaming-experience', 'esports-training-package'].map(findOffering);
  const experiences = ['virtual-reality-experience', 'racing-simulator-challenge', 'escape-room-challenge'].map(findOffering);

  return (
    <Screen>
      <AppHeader />

      <ImageBackground source={HERO} style={styles.hero} imageStyle={styles.heroImage}>
        <View style={styles.heroOverlay}>
          <Text style={styles.heroBrand}>{CONTACT.brandLine1} / {CONTACT.city.toUpperCase()}</Text>
          <Text style={[type.h1, styles.heroTitle]}>LEVEL UP{'\n'}YOUR GAME</Text>
          <Text style={styles.heroBody}>
            Step into the next generation of competitive gaming. 50+ high-end rigs, premium
            virtual reality setups, and custom pro esports stations.
          </Text>
          <View style={styles.heroButtons}>
            <Button label="Book your session" onPress={() => navigation.navigate('Contact')} />
            <Button label="Explore packages" variant="outline" onPress={() => navigation.navigate('Packages')} />
          </View>
          <Text style={styles.heroTag}>PLAY. COMPETE. CONNECT.</Text>
        </View>
      </ImageBackground>

      <StatRow
        stats={[
          { value: '50+', label: 'Elite PC Rigs' },
          { value: '20+', label: 'Latest Consoles' },
          { value: '500+', label: 'Tournaments' },
        ]}
      />

      <Section
        eyebrow="FIND YOUR PLAY STYLE"
        title="ONE ARENA. YOUR WAY TO PLAY."
        lede="From a full day of gaming to private play, professional coaching and birthday celebrations."
      />

      {featured.map((o) => (
        <OfferingCard key={o.id} offering={o} onPress={openOffering} />
      ))}

      <TouchableOpacity onPress={() => navigation.navigate('Packages')}>
        <Text style={styles.seeAll}>See all seven offerings</Text>
      </TouchableOpacity>

      <Section eyebrow="INDIVIDUAL EXPERIENCES" title="GO BEYOND THE EVERYDAY." />

      {experiences.map((o) => (
        <OfferingCard key={o.id} offering={o} onPress={openOffering} />
      ))}

      <Section eyebrow="FROM OUR COMMUNITY" title="WHAT OUR SQUAD SAYS" />
      <View style={styles.testimonial}>
        <Text style={styles.quoteMark}>"</Text>
        <Text style={styles.quote}>
          Absolute best hardware in town. Zero packet loss, 360Hz monitors, and the peripheral
          selection is unmatched.
        </Text>
        <Text style={styles.quoteBy}>Alex K. (Pro Valorant)</Text>
      </View>

      <Section eyebrow="READY TO PLAY?" title="YOUR SQUAD'S NEXT HOME." align="center" />
      <View style={styles.homeCta}>
        <Button label="Make a booking inquiry" onPress={() => navigation.navigate('Contact')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: radius.lg, overflow: 'hidden' },
  heroImage: { resizeMode: 'cover' },
  heroOverlay: { backgroundColor: 'rgba(11,14,20,0.72)', padding: spacing.lg, gap: spacing.md },
  heroBrand: { ...type.eyebrow, color: colors.teal },
  heroTitle: { color: colors.text },
  heroBody: { ...type.body, color: colors.muted },
  heroButtons: { gap: spacing.sm },
  heroTag: { ...type.eyebrow, color: colors.muted, marginTop: spacing.sm },
  seeAll: { ...type.small, color: colors.teal, fontWeight: '700', textAlign: 'center' },
  testimonial: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  quoteMark: { color: colors.accent, fontSize: 34, fontWeight: '800', lineHeight: 34 },
  quote: { ...type.body, color: colors.text },
  quoteBy: { ...type.small, color: colors.muted, fontWeight: '700' },
  homeCta: { gap: spacing.sm },
});
