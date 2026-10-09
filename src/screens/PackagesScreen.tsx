import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen, Section, Chip } from '../components/ui';
import { OfferingCard } from '../components/cards';
import { AppHeader, CtaSection } from '../components/shell';
import { OFFERINGS, Offering, OfferingCategory } from '../data/offerings';
import { RootStackParamList, TabParamList } from '../navigation';

type Filter = 'all' | OfferingCategory;

export default function PackagesScreen() {
  // Two navigators meet here: the bottom tabs and the root stack that holds
  // the detail pages, so detail navigation uses the composite type.
  const navigation = useNavigation<
    CompositeNavigationProp<
      BottomTabNavigationProp<TabParamList>,
      NativeStackNavigationProp<RootStackParamList>
    >
  >();
  const [filter, setFilter] = useState<Filter>('all');

  const packages = OFFERINGS.filter((o) => o.category === 'package');
  const experiences = OFFERINGS.filter((o) => o.category === 'experience');
  const visible = (list: Offering[]) =>
    filter === 'all' ? list : list.filter((o) => o.category === filter);

  const openDetail = (id: string) => navigation.navigate('PackageDetail', { offeringId: id });

  return (
    <Screen>
      <AppHeader />

      <Section
        eyebrow="SEVEN WAYS TO REACH YOUR NEXT LEVEL"
        title="CHOOSE YOUR EXPERIENCE"
        lede="Four gaming packages. Three individual experiences. Explore every inclusion and find the right fit for your next visit."
      />

      <View style={styles.filters}>
        <Chip label="All offerings - 7" active={filter === 'all'} onPress={() => setFilter('all')} />
        <Chip label="Gaming - 4" active={filter === 'package'} onPress={() => setFilter('package')} />
        <Chip label="Experiences - 3" active={filter === 'experience'} onPress={() => setFilter('experience')} />
      </View>

      {filter !== 'experience' ? (
        <>
          <Section
            eyebrow="GAMING PACKAGES / 04"
            title="BIG PLANS. COMPLETE PACKAGES."
            lede="Full-day gaming, premium facilities, competitive coaching and gaming-themed celebrations. Each package has a fee of R1500."
          />
          {visible(packages).map((o) => (
            <OfferingCard key={o.id} offering={o} onPress={() => openDetail(o.id)} showIncludes />
          ))}
        </>
      ) : null}

      {filter !== 'package' ? (
        <>
          <Section
            eyebrow="INDIVIDUAL EXPERIENCES / 03"
            title="A DIFFERENT KIND OF CHALLENGE."
            lede="Explore virtual worlds, race for the leaderboard or solve puzzles together. Each experience has a fee of R750."
          />
          {visible(experiences).map((o) => (
            <OfferingCard key={o.id} offering={o} onPress={() => openDetail(o.id)} showIncludes />
          ))}
        </>
      ) : null}

      <CtaSection
        title="PLANNING MORE THAN ONE BOOKING?"
        buttonLabel="Use fee calculator"
        onPress={() => navigation.navigate('Fees')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
