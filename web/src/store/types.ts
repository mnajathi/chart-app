export interface DateState {
    fromValue: string;
    toValue: string;

    setFromValue: (from: string) => void;
    setToValue: (to: string) => void;
}