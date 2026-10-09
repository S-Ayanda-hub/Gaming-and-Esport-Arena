import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, type } from '../theme';
import { CONTACT } from '../data/offerings';
import { Button } from './ui';

// Brand header shown at the top of every screen.
export function AppHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.logoDot} />
      <View>
        <Text style={styles.brand1}>{CONTACT.brandLine1}</Text>
        <Text style={styles.brand2}>{CONTACT.brandLine2}</Text>
      </View>
    </View>
  );
}

// Reusable "READY TO PLAY?" call-to-action block.
export function CtaSection({
  title,
  buttonLabel,
  onPress,
}: {
  title: string;
  buttonLabel: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.cta}>
      <Text style={styles.ctaEyebrow}>READY TO PLAY?</Text>
      <Text style={[type.h2, styles.ctaTitle]}>{title}</Text>
      <Text style={styles.ctaBody}>
        Tell us what you want to play. Our arena team will help with your booking inquiry.
      </Text>
      <Button label={buttonLabel} onPress={onPress} icon="arrow-forward" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  logoDot: { width: 34, height: 34, borderRadius: 10, backgroundColor: colors.accent },
  brand1: { fontSize: 13, fontWeight: '800', letterSpacing: 2, color: colors.text },
  brand2: { fontSize: 10, fontWeight: '600', letterSpacing: 3, color: colors.muted },
  cta: {
    backgroundColor: colors.cardAlt,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.lg,
    gap: spacing.md,
  },
  ctaEyebrow: { ...type.eyebrow, color: colors.accent },
  ctaTitle: { color: colors.text },
  ctaBody: { ...type.body, color: colors.muted },
});
