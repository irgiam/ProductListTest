import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import axiosInstance from '../helpers/axiosInstance';
import ItemProduct from './components/ItemProduct';
import LoadingScreen from './LoadingScreen';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [totalProduct, setTotalProduct] = useState();
    const [totalPrice, setTotalPrice] = useState(0)
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [openSortOption, setOpenSortOption] = useState(false);
    const [valueSortOption, setValueSortOption] = useState();
    const [sortOption, setSortOption] = useState([
        { label: 'Highest Price', value: 'highPrice' },
        { label: 'Lowest Price', value: 'lowPrice' },
        { label: 'Name', value: 'name' }
    ]);
    const lowestSort = true;

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

    const resetPrice = () => {
        setTotalPrice(0);
        getProduct();
    }

    const checkout = () => {
        if (totalPrice <= 0){
            return;
        } else {
            setModalVisible(true);
        }
    }

    const closeCheckout = () => {
        setModalVisible(false);
        resetPrice();
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome name={'mobile-phone'} size={52} style={styles.phoneIcon} />
                <View style={styles.headerTitle}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Product List</Text>
                    <Text style={{ color: '#fff' }}>{`${products?.length} Products`}</Text>
                </View>
            </View>
            {
                (loading) ? <LoadingScreen /> :
                    <>
                        <ScrollView>
                            <View style={styles.sortHeader}>
                                <View style={{ width: '55%', flexDirection: 'row', marginBottom: 5 }}>
                                    <MaterialIcons name={'sort'} size={24} style={{ marginLeft: '2.5%', marginTop: 15 }} />
                                    <Text style={{ marginLeft: '2.5%', marginTop: 15 }}>
                                        Sort By:
                                    </Text>
                                </View>
                                <View style={{ width: '40%', marginBottom: 5 }}>
                                    <DropDownPicker
                                        zIndex={5}
                                        placeholder=""
                                        open={openSortOption}
                                        value={valueSortOption}
                                        items={sortOption}
                                        setOpen={setOpenSortOption}
                                        setValue={setValueSortOption}
                                        setItems={setSortOption}
                                        listMode="SCROLLVIEW"
                                        scrollViewProps={{
                                            nestedScrollEnabled: true,
                                        }}
                                        style={styles.dropDownStyle}
                                        containerStyle={{
                                            zIndex: 1000,
                                            flex: 1,
                                        }}
                                        dropDownContainerStyle={styles.dropDownContainerStyle}
                                    />
                                </View>
                            </View>
                            {
                                products && 
                                products
                                // .sort((a, b) => (valueSortOption === 'lowPrice') ? a.price - b.price : b.price - a.price)
                                .sort((valueSortOption === 'name') ? (a, b) => a.title.localeCompare(b.title) : (a, b) => (valueSortOption === 'lowPrice') ? a.price - b.price : b.price - a.price)
                                .map((product) => (
                                    <ItemProduct
                                        product={product}
                                        key={product.id}
                                        addTotalPrice={() => setTotalPrice(totalPrice + product.price)}
                                        removeTotalPrice={() => setTotalPrice(totalPrice - product.price)}
                                    />
                                ))
                            }
                        </ScrollView>
                        <View style={styles.bottomSheet}>
                            <View style={{ width: '45%', alignItems: 'flex-start', marginLeft: '5%', marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#3a4144' }}>Total:</Text>
                            </View>
                            <View style={{ width: '42.5%', alignItems: 'flex-end', marginRight: '7.5%', marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#3a4144' }}>{`$ ${totalPrice}`}</Text>
                            </View>
                            <TouchableOpacity style={[styles.checkoutButton, { backgroundColor: (totalPrice <= 0) ? '#cfcfcf' : '#3a4144' }]}
                                onPress={() => checkout()}
                            >
                                <Text style={[styles.textPrice, { color: 'white', fontSize: 16 }]}>Checkout</Text>
                            </TouchableOpacity>
                            {
                                (totalPrice > 0) ?
                                    <TouchableOpacity style={styles.resetButton}
                                        onPress={() => resetPrice()}
                                    >
                                        <Text style={[styles.textPrice, { color: '#3a4144', fontSize: 16 }]}>Reset</Text>
                                    </TouchableOpacity> : <></>
                            }
                        </View>
                    </>

            }
            <Modal
                backdropOpacity={(modalVisible) ? 0.7 : 0}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                    <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        paddingVertical: 16,
                        paddingHorizontal: 14,
                        maxHeight: '90%',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#3a4144'}}>
                        Success!
                    </Text>
                    <Text style={{marginTop: 5, width: '90%', color: '#3a4144', textAlign: 'center'}}>
                        {`You have purchased product with total $ ${totalPrice}. Click close to buy another item`}
                    </Text>
                    <TouchableOpacity
                        style={[styles.checkoutButton, {marginLeft: 0}]}
                        onPress={() => closeCheckout()}
                    >
                        <Text style={{color: '#fff'}}>
                            Close
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
        borderTopWidth: 0.15
    },
    checkoutButton: {
        backgroundColor: '#3a4144',
        width: '90%',
        marginLeft: '5%',
        marginVertical: 15,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resetButton: {
        backgroundColor: '#fff',
        width: '90%',
        marginLeft: '5%',
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#3a4144',
        borderWidth: 2,
        marginBottom: 10
    },
    sortHeader: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        zIndex: 5,
        width: '100%'
    },
    dropDownStyle: {
        marginRight: '5%',
        borderWidth: 0,
        backgroundColor: '#f6f6f6'
    },
    dropDownContainerStyle: {
        borderWidth: 0.1,
        marginRight: '5%',
        borderRadius: 0,
        zIndex: 1000,
        elevation: 1000,
    }
});

export default ProductList;