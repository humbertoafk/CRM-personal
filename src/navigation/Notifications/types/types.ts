import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export type StackNotificationsParamsList = {
    notifications: undefined;
    notificationDetail: { id: string };
}

export type NotificationStackNavigationProp = NativeStackNavigationProp<StackNotificationsParamsList>;