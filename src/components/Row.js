import { View } from 'react-native';

export default function Row({ children, style: styleProps, ...otherProps }) {
    return (
        <View
            style={[styleProps, { flexDirection: 'row' }]}
            {...otherProps}
        >
            {children}
        </View>
    )
};