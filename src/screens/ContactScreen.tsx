import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Screen, Section, Field, Button, FaqItem } from '../components/ui';
import { AppHeader, CtaSection } from '../components/shell';
import { colors, radius, spacing, type } from '../theme';
import { CONTACT } from '../data/offerings';
import { TabParamList } from '../navigation';

const FAQS = [
  {
    question: 'Which experiences can I book?',
    answer:
      'Choose from Ultimate Gamer Pass, VIP Gaming Experience, Esports Training Package and Birthday Party Package at R1500 each. Virtual Reality Experience, Racing Simulator Challenge and Escape Room Challenge each have a fee of R750.',
  },
  {
    question: 'What is included in a birthday celebration?',
    answer:
      'The Birthday Party Package includes a reserved gaming area, multiplayer competition, party decorations, catering and tournament prizes.',
  },
  {
    question: 'Is there help for VR or competitive gaming?',
    answer:
      'Staff assistance is included in the Virtual Reality Experience. For competitive improvement, the Esports Training Package includes professional coaching, practice and performance feedback.',
  },
  {
    question: 'How do bulk booking discounts work?',
    answer:
      'Two bookings receive 5%, three bookings receive 10%, and more than three bookings receive 15%. Only the matching tier applies. The fee calculator shows the full quote breakdown.',
  },
];

export default function ContactScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const send = () => {
    if (!fullName.trim() || !email.trim()) {
      Alert.alert('Missing details', 'Please add your full name and email address so the team can reply.');
      return;
    }
    Alert.alert('Message sent', 'Thanks! The arena team will get back to you about your inquiry.');
    setFullName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Screen>
      <AppHeader />

      <Section
        eyebrow="LOCATIONS & SUPPORT"
        title="GET IN TOUCH WITH THE TEAM"
        lede="Planning a visit, a celebration or your next competitive step? Talk to the people behind the arena."
      />

      <View style={styles.visit}>
        <Text style={styles.visitEyebrow}>VISIT NEXT LEVEL</Text>
        <View style={styles.visitRow}>
          <Text style={styles.visitLabel}>HQ Address</Text>
          <Text style={styles.visitValue}>{CONTACT.city}</Text>
        </View>
        <View style={styles.visitRow}>
          <Text style={styles.visitLabel}>Hotline</Text>
          <Text style={styles.visitValue}>{CONTACT.hotline}</Text>
        </View>
        <View style={styles.visitRow}>
          <Text style={styles.visitLabel}>Operating Hours</Text>
          <Text style={styles.visitValue}>{CONTACT.hoursNote}</Text>
        </View>
        <View style={styles.visitRow}>
          <Text style={styles.visitLabel}> </Text>
          <Text style={styles.visitValue}>{CONTACT.hours}</Text>
        </View>
      </View>

      <Section
        eyebrow="START A CONVERSATION"
        title="WHAT'S YOUR NEXT LEVEL?"
        lede="Tell us which package or experience you are interested in and share your questions with the arena team."
      />

      <View style={styles.form}>
        <Field label="Full Name" placeholder="Enter your name" value={fullName} onChangeText={setFullName} />
        <Field label="Email Address" placeholder="Enter your email address" value={email} onChangeText={setEmail} />
        <Field
          label="Message Text"
          placeholder="Tell us about your gaming, coaching or birthday plans..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <Button label="Send Message" onPress={send} icon="arrow-forward" />
        <Text style={styles.formNote}>Prefer to talk? Call the hotline to discuss your inquiry.</Text>
      </View>

      <Section eyebrow="SUPPORT INTEL" title="FREQUENTLY ASKED QUESTIONS" />
      <View style={styles.faqs}>
        {FAQS.map((f) => (
          <FaqItem key={f.question} question={f.question} answer={f.answer} />
        ))}
      </View>

      <CtaSection
        title="NOT SURE WHERE TO START?"
        buttonLabel="Explore packages"
        onPress={() => navigation.navigate('Packages')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  visit: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    gap: 8,
  },
  visitEyebrow: { ...type.eyebrow, color: colors.teal },
  visitRow: { flexDirection: 'row' },
  visitLabel: { ...type.small, color: colors.muted, width: 120, fontWeight: '600' },
  visitValue: { ...type.small, color: colors.text, flex: 1 },
  form: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    gap: 12,
  },
  formNote: { ...type.small, color: colors.muted, textAlign: 'center' },
  faqs: { gap: 8 },
});
