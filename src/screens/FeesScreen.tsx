import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screen, Section, Field, Button } from '../components/ui';
import { AppHeader } from '../components/shell';
import { colors, money, radius, spacing, type } from '../theme';
import { OFFERINGS } from '../data/offerings';
import { discountRateFor, useBooking } from '../context/BookingContext';

const TIERS = [
  { label: '2 bookings', rate: 0.05 },
  { label: '3 bookings', rate: 0.10 },
  { label: 'More than 3 bookings', rate: 0.15 },
];

export default function FeesScreen() {
  const { selectedId, selectOffering, quantity, setQuantity, quote } = useBooking();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const activeRate = discountRateFor(quantity);
  const pct = (rate: number) => `${Math.round(rate * 100)}%`;

  const getQuote = () => {
    Alert.alert(
      'Quote inquiry sent',
      `${quote.offering.name}: ${quote.quantity} booking(s)\n` +
        `Subtotal ${money(quote.subtotal)}\n` +
        `Bulk discount ${pct(quote.discountRate)} (-${money(quote.discountAmount)})\n` +
        `Quoted total ${money(quote.total)}\n\n` +
        'Our arena team will confirm your visit.',
    );
  };

  return (
    <Screen>
      <AppHeader />

      <Section
        eyebrow="PLAN YOUR PLAY"
        title="ESTIMATE FEES INSTANTLY"
        lede="Choose an offering and your booking quantity. See the fee, the applicable bulk discount and your quoted total clearly."
      />

      <View style={styles.step}>
        <Text style={styles.stepTitle}>01 / YOUR CONTACT DETAILS</Text>
        <Field label="Full Name" placeholder="Enter your full name" value={fullName} onChangeText={setFullName} />
        <Field label="Email Address" placeholder="Enter your email address" value={email} onChangeText={setEmail} />
        <Field label="Phone Number" placeholder="Enter your contact number" value={phone} onChangeText={setPhone} />
      </View>

      <View style={styles.step}>
        <Text style={styles.stepTitle}>02 / CHOOSE YOUR OFFERING</Text>

        <Text style={styles.groupLabel}>Gaming Packages</Text>
        {OFFERINGS.filter((o) => o.category === 'package').map((o) => (
          <TouchableOpacity
            key={o.id}
            style={[styles.option, selectedId === o.id && styles.optionActive]}
            onPress={() => selectOffering(o.id)}
          >
            <Text style={styles.optionName}>{o.name}</Text>
            <Text style={styles.optionFee}>{money(o.fee)}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.groupLabel}>Individual Experiences</Text>
        {OFFERINGS.filter((o) => o.category === 'experience').map((o) => (
          <TouchableOpacity
            key={o.id}
            style={[styles.option, selectedId === o.id && styles.optionActive]}
            onPress={() => selectOffering(o.id)}
          >
            <Text style={styles.optionName}>{o.name}</Text>
            <Text style={styles.optionFee}>{money(o.fee)}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.groupLabel}>Booking quantity</Text>
        <Text style={styles.quantityNote}>Number of bookings, not players</Text>
        <View style={styles.stepper}>
          <TouchableOpacity style={styles.stepButton} onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Text style={styles.stepButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity style={styles.stepButton} onPress={() => setQuantity(Math.min(99, quantity + 1))}>
            <Text style={styles.stepButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.step}>
        <Text style={styles.stepTitle}>03 / BULK BOOKING DISCOUNT</Text>
        <Text style={styles.discountNote}>
          Only the tier matching your booking quantity applies. Discounts are not combined.
        </Text>
        {TIERS.map((tier) => (
          <View key={tier.label} style={[styles.tier, activeRate === tier.rate && styles.tierActive]}>
            <Text style={styles.tierLabel}>{tier.label}</Text>
            <Text style={[styles.tierRate, activeRate === tier.rate && styles.tierRateActive]}>
              {pct(tier.rate)}
              {activeRate === tier.rate ? ' - Applied' : ''}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.quoteCard}>
        <Text style={styles.quoteEyebrow}>YOUR TRANSPARENT QUOTE</Text>
        <Text style={[type.h3, { color: colors.text }]}>{quote.offering.name}</Text>
        <Text style={styles.quoteLine}>
          {`${quote.quantity} bookings x ${money(quote.offering.fee)}`}
        </Text>

        <View style={styles.quoteRow}>
          <Text style={styles.quoteLabel}>Subtotal</Text>
          <Text style={styles.quoteValue}>{money(quote.subtotal)}</Text>
        </View>
        <View style={styles.quoteRow}>
          <Text style={styles.quoteLabel}>{`Bulk discount - ${pct(quote.discountRate)}`}</Text>
          <Text style={styles.quoteValue}>{`-${money(quote.discountAmount)}`}</Text>
        </View>
        <View style={styles.quoteRowTotal}>
          <Text style={styles.quoteTotalLabel}>QUOTED TOTAL</Text>
          <Text style={styles.quoteTotal}>{money(quote.total)}</Text>
        </View>
        <Text style={styles.quoteEquation}>
          {`${money(quote.subtotal)} - ${money(quote.discountAmount)} = ${money(quote.total)}`}
        </Text>

        <Button label="Get quote" onPress={getQuote} />
        <Text style={styles.quoteNote}>
          This is a quote inquiry, not a booking confirmation. Contact the team to discuss your visit.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  step: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    gap: 12,
  },
  stepTitle: { ...type.eyebrow, color: colors.accent },
  groupLabel: { ...type.small, color: colors.text, fontWeight: '700', marginTop: 4 },
  quantityNote: { ...type.small, color: colors.muted },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.sm,
    padding: 10,
  },
  optionActive: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
  optionName: { ...type.small, color: colors.text, fontWeight: '600', flex: 1 },
  optionFee: { ...type.small, color: colors.teal, fontWeight: '700' },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  stepButton: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepButtonText: { color: colors.text, fontSize: 20, fontWeight: '700' },
  quantityValue: { fontSize: 22, fontWeight: '800', color: colors.text, minWidth: 40, textAlign: 'center' },
  discountNote: { ...type.small, color: colors.muted },
  tier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.sm,
    padding: 10,
  },
  tierActive: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
  tierLabel: { ...type.small, color: colors.text },
  tierRate: { ...type.small, color: colors.muted, fontWeight: '700' },
  tierRateActive: { color: colors.accent },
  quoteCard: {
    backgroundColor: colors.cardAlt,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accent,
    padding: spacing.lg,
    gap: 12,
  },
  quoteEyebrow: { ...type.eyebrow, color: colors.accent },
  quoteLine: { ...type.small, color: colors.muted, marginTop: -4 },
  quoteRow: { flexDirection: 'row', justifyContent: 'space-between' },
  quoteLabel: { ...type.body, color: colors.muted },
  quoteValue: { ...type.body, color: colors.text, fontWeight: '700' },
  quoteRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 12,
  },
  quoteTotalLabel: { ...type.eyebrow, color: colors.text },
  quoteTotal: { fontSize: 24, fontWeight: '800', color: colors.accent },
  quoteEquation: { ...type.small, color: colors.muted },
  quoteNote: { ...type.small, color: colors.muted },
});
