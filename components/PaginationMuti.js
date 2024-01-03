import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import {
    Skeleton, VStack, Box, Text, Button
} from 'native-base';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react-native';
import RenderHtml from 'react-native-render-html';
import { PressableOpacity } from 'react-native-pressable-opacity';
const PaginationMuti = ({ data, changePage }) => {
    const { width } = useWindowDimensions();
    // return links.length > 3 ? (

    //     <Box className="mt-8 mb-10">
    //         <Box className="flex flex-wrap -mb-1">
    //             {links.map((link, key) =>
    //                 <Box key={key}>
    //                     <Box >
    //                         {link.url === null ? <Box className={link.active ? "bg-blue-700 text-white mr-1 mb-1 px-2 py-1 text-xs leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500" : 'mr-1 mb-1 px-2 py-1 text-xs leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500 '}
    //                         ><RenderHtml source={{
    //                             html: link?.label
    //                         }} contentWidth={width} /></Box> : <PressableOpacity onPress={() => {
    //                             changePage(link.url)

    //                         }} ><Box
    //                             className="mr-1 mb-1 px-2 py-1 text-xs leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500"
    //                         ><RenderHtml source={{
    //                             html: link?.label
    //                         }} contentWidth={width} /></Box></PressableOpacity>}

    //                     </Box>
    //                 </Box>

    //             )}

    //         </Box>
    //     </Box>
    // ) : <View></View>;
    return data.links.length > 0 ? (
        <Box className="flex flex-wrap justify-between bg-white rounded-b-lg px-4 py-2 ">
            <Box>
                <Text className="text-[12px] font-roboto font-bold">Tổng {data.total} kết quả</Text>
            </Box>
            {data.links.length > 3 ?
                (<Box className="flex">
                    <Box className="mx-3">
                        <PressableOpacity onPress={() => {
                            changePage(data.current_page - 1)

                        }} disabled={data.current_page === 1 ? true : false} >
                            <Box className="px-2 py-2" isDisabled={data.current_page === 1 ? true : false}>
                                <ArrowLeft2 className="text-[#AEAEAE] text-[12px]"
                                    size="25"
                                    color="#FF8A65"
                                    variant="Bold"
                                />

                            </Box>
                        </PressableOpacity>
                        <Text>{data.current_page}/{data.last_page}</Text>
                        <PressableOpacity onPress={() => {
                            changePage(data.current_page + 1)

                        }} disabled={data.current_page === data.last_page ? true : false}>
                            <Box className="px-2 py-1" isDisabled={data.current_page === data.last_page ? true : false}>
                                <ArrowRight2 className="text-[#AEAEAE] text-[12px]"
                                    size="25"
                                    color="#FF8A65"
                                    variant="Bold"
                                />

                            </Box>
                        </PressableOpacity>

                    </Box>
                </Box>) : <View></View>
            }
        </Box >
    ) : <View></View >;
}

const styles = StyleSheet.create({})

export default PaginationMuti;