import React, {useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesom from 'react-native-vector-icons/FontAwesome';

const ItemProduct = ({product}) => {
    const [itemCount, setItemCount] = useState(0);

    const addItem = () => {
        if (itemCount >=  product.stock) {
            return;
        } else {
            setItemCount(itemCount + 1);
        }
    }

    const removeItem = () => {
        if (itemCount <=  0) {
            return;
        } else {
            setItemCount(itemCount - 1);
        }
    }
    
    return (
        <View style={styles.item}>
            <View style={styles.itemTitle}>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>{product.title}</Text>
                <Text>{`$ ${product.price}`}</Text>
            </View>
            <View style={styles.itemCount}>
                <TouchableOpacity onPress={() => removeItem()}>
                    <FontAwesom name={'minus-square'} size={34} style={{ color: (itemCount <=  0) ? '#cfcfcf' : '#394144' }} />
                </TouchableOpacity>
                <Text style={{ marginHorizontal: '10%', marginTop: 7 }}>{itemCount}</Text>
                <TouchableOpacity onPress={() => addItem()}>
                    <FontAwesom name={'plus-square'} size={34} style={{ color: (itemCount >=  product.stock) ? '#cfcfcf' :'#394144' }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        borderWidth: 0.1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    itemTitle: {
        // alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginHorizontal: 5,
        width: '45%',
        marginLeft: '2.5%'
    },
    itemCount: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#f6f6f6',
        paddingVertical: 5,
        marginLeft: '10%',
        marginTop: 10
    },
});

export default ItemProduct