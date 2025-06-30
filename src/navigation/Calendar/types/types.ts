import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackCalendarParamList = {
    calendar: undefined;
    eventDetail: { id: string };
}

export type CalendarStackNavigationProp = NativeStackNavigationProp<StackCalendarParamList>;