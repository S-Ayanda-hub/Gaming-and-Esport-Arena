import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, type } from '../theme';

// Base page wrapper: safe area + scroll container used by every screen.
export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

// Eyebrow + heading + optional lead paragraph, used for every section.
export function Section({
  eyebrow,
  title,
  lede,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: 'left' | 'center';
}) {
  return (
    <View style={[styles.section, align === 'center' && styles.center]}>
      {eyebrow ? (
        <Text style={[styles.eyebrow, align === 'center' && styles.centerText]}>{eyebrow}</Text>
      ) : null}
      <Text style={[type.h1, align === 'center' && styles.centerText]}>{title}</Text>
      {lede ? <Text style={[styles.lede, align === 'center' && styles.centerText]}>{lede}</Text> : null}
    </View>
  );
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <TouchableOpacity
      style={[styles.button, variant === 'outline' && styles.buttonOutline]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={[styles.buttonLabel, variant === 'outline' && styles.buttonOutlineLabel]}>
        {label}
      </Text>
      {icon ? (
        <Ionicons name={icon} size={16} color={variant === 'outline' ? colors.text : '#fff'} />
      ) : null}
    </TouchableOpacity>
  );
}

export function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
      <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

export function Field({
  label,
  placeholder,
  value,
  onChangeText,
  multiline,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
      />
    </View>
  );
}

// Expandable question / answer row.
export function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.faq}>
      <TouchableOpacity style={styles.faqHead} onPress={() => setOpen(!open)}>
        <Text style={[type.h3, styles.faqQuestion]}>{question}</Text>
        <Ionicons name={open ? 'remove' : 'add'} size={18} color={colors.muted} />
      </TouchableOpacity>
      {open ? <Text style={styles.faqAnswer}>{answer}</Text> : null}
    </View>
  );
}

export function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <View style={styles.statRow}>
      {stats.map((s) => (
        <View key={s.label} style={styles.stat}>
          <Text style={styles.statValue}>{s.value}</Text>
          <Text style={styles.statLabel}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xl, gap: spacing.lg },
  section: { gap: spacing.sm },
  center: { alignItems: 'center' },
  centerText: { textAlign: 'center' },
  eyebrow: { ...type.eyebrow, color: colors.teal },
  lede: { ...type.body, color: colors.muted },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
  },
  buttonOutline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.line },
  buttonLabel: { color: '#fff', fontWeight: '700', fontSize: 15 },
  buttonOutlineLabel: { color: colors.text },
  chip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipActive: { backgroundColor: colors.accentSoft, borderColor: colors.accent },
  chipLabel: { ...type.small, color: colors.muted, fontWeight: '600' },
  chipLabelActive: { color: colors.text },
  field: { gap: spacing.xs },
  fieldLabel: { ...type.small, color: colors.muted, fontWeight: '600' },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radius.sm,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  inputMultiline: { minHeight: 110, textAlignVertical: 'top' },
  faq: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
  },
  faqHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  faqQuestion: { flex: 1, color: colors.text },
  faqAnswer: { ...type.body, color: colors.muted, paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  statRow: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
  },
  stat: { flex: 1, alignItems: 'center', paddingVertical: spacing.md, gap: 2 },
  statValue: { fontSize: 20, fontWeight: '800', color: colors.teal },
  statLabel: { ...type.small, color: colors.muted, textAlign: 'center' },
});
