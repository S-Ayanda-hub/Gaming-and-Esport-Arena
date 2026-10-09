import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, money, radius, spacing, type } from '../theme';
import { Offering } from '../data/offerings';

// Compact offering card used on Home, Packages and "keep exploring" rows.
export function OfferingCard({
  offering,
  onPress,
  showIncludes = false,
}: {
  offering: Offering;
  onPress: () => void;
  showIncludes?: boolean;
}) {
  const isPackage = offering.category === 'package';
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <Image source={offering.image} style={styles.image} />
      <View style={styles.body}>
        <Text style={[styles.tagline, { color: isPackage ? colors.accent : colors.teal }]}>
          {offering.tagline}
        </Text>
        <Text style={[type.h3, styles.name]}>{offering.name}</Text>
        <Text style={styles.blurb}>{offering.blurb}</Text>

        {showIncludes ? (
          <View style={styles.includes}>
            <Text style={styles.includesTitle}>INCLUDES</Text>
            {offering.includes.map((item) => (
              <View key={item.title} style={styles.includesRow}>
                <Ionicons name="checkmark" size={14} color={isPackage ? colors.accent : colors.teal} />
                <Text style={styles.includesItem}>{item.title}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.footer}>
          <View>
            <Text style={styles.feeLabel}>{isPackage ? 'PACKAGE FEE' : 'FEE'}</Text>
            <Text style={styles.fee}>{money(offering.fee)}</Text>
          </View>
          <View style={styles.viewDetails}>
            <Text style={styles.viewDetailsLabel}>View details</Text>
            <Ionicons name="arrow-forward" size={14} color={colors.teal} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Row inside the "what is included" list on a detail page.
export function IncludedItem({
  title,
  description,
  accent,
}: {
  title: string;
  description: string;
  accent: string;
}) {
  return (
    <View style={styles.included}>
      <View style={styles.includedHead}>
        <Ionicons name="checkmark-circle" size={16} color={accent} />
        <Text style={[type.h3, { color: colors.text }]}>{title}</Text>
      </View>
      <Text style={styles.includedBody}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  image: { width: '100%', height: 120 },
  body: { padding: spacing.md, gap: spacing.sm },
  tagline: { ...type.eyebrow },
  name: { color: colors.text },
  blurb: { ...type.body, color: colors.muted },
  includes: { gap: spacing.xs, marginTop: spacing.xs },
  includesTitle: { ...type.eyebrow, color: colors.muted },
  includesRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  includesItem: { ...type.small, color: colors.text },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: spacing.md,
    marginTop: spacing.xs,
  },
  feeLabel: { ...type.eyebrow, color: colors.muted },
  fee: { fontSize: 20, fontWeight: '800', color: colors.text },
  viewDetails: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  viewDetailsLabel: { ...type.small, color: colors.teal, fontWeight: '700' },
  included: {
    gap: spacing.xs,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  includedHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  includedBody: { ...type.small, color: colors.muted },
});
