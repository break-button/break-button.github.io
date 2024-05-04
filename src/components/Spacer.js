import { View } from 'react-native';

function Spacer({ spacing }) {
    const calculatedPadding = spacing * 4;

    return <View style={{ padding: calculatedPadding / 2 }} />;
}

export default Spacer;
