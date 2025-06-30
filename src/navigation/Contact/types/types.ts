import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export type StackContactParamList = {
    contacts: undefined;
    contactDetail: { id: string };
};

export type ContactStackNavigationProp = NativeStackNavigationProp<StackContactParamList>;