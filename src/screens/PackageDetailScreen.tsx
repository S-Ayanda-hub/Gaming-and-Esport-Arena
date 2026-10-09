import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen, Section, Button } from '../components/ui';
import { OfferingCard, IncludedItem } from '../components/cards';
import { AppHeader, CtaSection } from '../components/shell';
import { colors, money, radius, spacing, type } from '../theme';
import { findOffering } from '../data/offerings';
import { RootStackParamList } from '../navigation';

export default function PackageDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'PackageDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const offering = findOffering(route.params.offeringId);
  const isPackage = offering.category === 'package';
  const accent = isPackage ? colors.accent : colors.teal;

  return (
    <Screen>
      <AppHeader />

      <View style={styles.breadcrumb}>
        <Text style={styles.crumbRoot}>Packages</Text>
        <Text style={styles.crumbSep}> / </Text>
        <Text style={styles.crumbCurrent}>
          {isPackage ? 'Gaming Packages' : 'Individual Experiences'}
        </Text>
      </View>

      <View style={styles.head}>
        <Text style={[styles.tagline, { color: accent }]}>{offering.tagline}</Text>
        <Text style={[type.h1, styles.name]}>{offering.name}</Text>
        <Text style={styles.blurb}>{offering.blurb}</Text>

        <View style={styles.feeCard}>
          <Text style={styles.feeLabel}>{isPackage ? 'PACKAGE FEE' : 'FEE'}</Text>
          <Text style={styles.fee}>{money(offering.fee)}</Text>
        </View>

        <Button
          label="Make a booking inquiry"
          onPress={() => navigation.navigate('Tabs', { screen: 'Contact' })}
        />
        <Button
          label="Planning multiple bookings? Try the fee calculator"
          variant="outline"
          onPress={() => navigation.navigate('Tabs', { screen: 'Fees' })}
        />
      </View>

      <Section
        eyebrow={`${offering.includes.length} INCLUDED BENEFITS`}
        title="WHAT'S INCLUDED"
      />
      <View style={styles.includesCard}>
        {offering.includes.map((item) => (
          <IncludedItem
            key={item.title}
            title={item.title}
            description={item.description}
            accent={accent}
          />
        ))}
      </View>

      <Section
        eyebrow="BEFORE YOU VISIT"
        title="LET'S PLAN YOUR PLAY."
        lede="Share your preferred visit and any questions with the arena team. Contact us to confirm opening hours and experience arrangements."
      />
      <Text style={styles.hotline}>{'+27 9725682229'}</Text>

      <Section eyebrow="KNOW BEFORE YOU GO" title="YOUR QUESTIONS, ANSWERED." />
      <View style={styles.faqs}>
        {offering.faqs.map((f) => (
          <View key={f.question} style={styles.faq}>
            <Text style={[type.h3, { color: colors.text }]}>{f.question}</Text>
            <Text style={styles.faqAnswer}>{f.answer}</Text>
          </View>
        ))}
      </View>

      <Section eyebrow="KEEP EXPLORING" title="FIND YOUR NEXT CHALLENGE." />
      {offering.related.map((id) => (
        <OfferingCard
          key={id}
          offering={findOffering(id)}
          onPress={() => navigation.setParams({ offeringId: id })}
        />
      ))}

      <CtaSection
        title="YOUR NEXT LEVEL AWAITS."
        buttonLabel="Make a booking inquiry"
        onPress={() => navigation.navigate('Tabs', { screen: 'Contact' })}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  breadcrumb: { flexDirection: 'row', alignItems: 'center' },
  crumbRoot: { ...type.small, color: colors.muted },
  crumbSep: { ...type.small, color: colors.muted },
  crumbCurrent: { ...type.small, color: colors.teal, fontWeight: '700' },
  head: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.lg,
    gap: spacing.md,
  },
  tagline: { ...type.eyebrow },
  name: { color: colors.text },
  blurb: { ...type.body, color: colors.muted },
  feeCard: {
    backgroundColor: colors.cardAlt,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    gap: 2,
  },
  feeLabel: { ...type.eyebrow, color: colors.muted },
  fee: { fontSize: 26, fontWeight: '800', color: colors.text },
  includesCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
  },
  hotline: { fontSize: 18, fontWeight: '800', color: colors.teal },
  faqs: { gap: 12 },
  faq: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    gap: 4,
  },
  faqAnswer: { ...type.small, color: colors.muted },
});
