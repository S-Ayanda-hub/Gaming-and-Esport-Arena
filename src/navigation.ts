import { NavigatorScreenParams } from '@react-navigation/native';

// Route names and types shared by every screen.
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  PackageDetail: { offeringId: string };
};

export type TabParamList = {
  Home: undefined;
  About: undefined;
  Packages: undefined;
  Fees: undefined;
  Contact: undefined;
};
