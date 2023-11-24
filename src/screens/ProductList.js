import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesom from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../helpers/axiosInstance';
import ItemProduct from './components/ItemProduct';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [totalProduct, setTotalProduct] = useState()
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getProduct();
    }, [])
    
    const getProduct = async () => {
        setLoading(true);
        await axiosInstance
            .get('/products')
            .then(res => {
                // console.log("result->", res.data);
                setProducts(res.data.products);
                setTotalProduct(res.data.total);
            }).catch(error => {
                console.error('error: ', error);
            }).finally(() => setLoading(false))
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesom name={'mobile-phone'} size={52} style={styles.phoneIcon} />
                <View style={styles.headerTitle}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Product List</Text>
                    <Text style={{ color: '#fff' }}>{`${products?.length} Products`}</Text>
                </View>
            </View>
            <ScrollView>
                {
                    products && products.map((product) => (
                        <ItemProduct product={product} key={product.id} />
                    ))
                }
            </ScrollView>
            <View style={styles.bottomSheet}>
                <View style={{ width: '45%', alignItems: 'flex-start', marginLeft: '5%', marginTop: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#3a4144' }}>Total:</Text>
                </View>
                <View style={{ width: '45%', alignItems: 'flex-end', marginRight: '5%', marginTop: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#3a4144' }}>$ 500</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton}
                // onPress={handleTransaction}
                >
                    <Text style={[styles.textPrice, { color: 'white', fontSize: 16 }]}>Checkout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.resetButton}
                // onPress={handleTransaction}
                >
                    <Text style={[styles.textPrice, { color: '#3a4144', fontSize: 16 }]}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    header: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: '#d81a3c',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    phoneIcon: {
        color: '#fff',
        margin: 10
    },
    headerTitle: {
        alignItems: "flex-start",
        justifyContent: 'center',
        paddingVertical: 15,
        marginHorizontal: 10
    },
    bottomSheet: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
    },
    checkoutButton: {
        backgroundColor: '#3a4144',
        width: '90%',
        marginLeft: '5%',
        marginTop: 15,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resetButton: {
        backgroundColor: '#fff',
        width: '90%',
        marginLeft: '5%',
        marginTop: 15,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#3a4144',
        borderWidth: 2,
        marginBottom: 10
    },
});

export default ProductList