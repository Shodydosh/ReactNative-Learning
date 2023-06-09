import React from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    Text,
    StatusBar,
    Image,
} from 'react-native';
import { COLORS, SIZES, SHADOWS, FONTS, assets } from '../constants';
import {
    CircleButton,
    RectangleButton,
    SubInfo,
    FocusedStatusBar,
    DetailsDesc,
    DetailsBid,
} from '../components';

const DetailsHeader = ({ data, navigation }) => {
    // console.log('--------');
    // console.log(data.name);
    // console.log(data.image);
    // console.log(data);
    // console.log('--------');
    return (
        <View style={{ width: '100%', height: 373 }}>
            <Image
                source={data.image}
                resizeMode='cover'
                style={{ width: '100%', height: '100%' }}
            />

            <CircleButton
                imgUrl={assets.left}
                handlePress={() => navigation.goBack()}
                left={15}
                top={StatusBar.currentHeight + 10}
            />
            <CircleButton
                imgUrl={assets.heart}
                right={15}
                top={StatusBar.currentHeight + 10}
            />
        </View>
    );
};

const Detail = ({ route, navigation }) => {
    const { data } = route.params;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FocusedStatusBar
                barStyle='dark-content'
                backgroundColor='transparent'
                translucent={true}
            />
            <View
                style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    paddingVertical: SIZES.font,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    zIndex: 1,
                }}
            >
                <RectangleButton
                    minWidth={170}
                    fontSize={SIZES.large}
                    {...SHADOWS.dark}
                />
            </View>
            <FlatList
                data={data.bids}
                renderItem={({ item }) => <DetailsBid bid={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: SIZES.extraLarge * 3 }}
                ListHeaderComponent={() => (
                    /* `<React.Fragment>` is a built-in component in React that allows you to group a
                    list of children without adding extra nodes to the DOM. It is used in this code
                    to wrap the `<DetailsHeader>` and `<SubInfo>` components as the
                    `ListHeaderComponent` of the `<FlatList>`. This way, both components can be
                    rendered as a single header without adding any extra nodes to the DOM. */
                    <React.Fragment>
                        <DetailsHeader data={data} navigation={navigation} />
                        <SubInfo />
                        <View style={{ padding: SIZES.font }}>
                            <DetailsDesc data={data} />
                            {data.bids.length > 0 && (
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.semiBold,
                                        color: COLORS.primary,
                                    }}
                                >
                                    Current bids
                                </Text>
                            )}
                        </View>
                    </React.Fragment>
                )}
            />
        </SafeAreaView>
    );
};

export default Detail;
