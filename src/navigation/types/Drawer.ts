import { DrawerNavigationProp } from "@react-navigation/drawer";

export type RootDrawerParamList = {
    index: undefined;
    contactsMain: undefined;
    calendarMain: undefined;
    notificationsMain: undefined;
    settingsMain: undefined;
}

export type DrawerNavProp = DrawerNavigationProp<RootDrawerParamList>;
