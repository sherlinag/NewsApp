import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import newsCategoryList from '@/constants/Categories'
import { Colors } from '@/constants/Colors'

type Props = {}

const Categories = (props: Props) => {
  return (
    <View>
      <Text style={styles.title}>Trending Right Now</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.itemsWrapper}>
        {newsCategoryList.map((item, index)=>(
            <TouchableOpacity key={index} style={styles.item}>
                <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
    title:{
        fontSize: 20,
            fontWeight: 'bold',
            color: Colors.black,
            marginBottom: 10,
            marginLeft: 20,
    },
    itemsWrapper:{
        gap: 20,
        paddingVertical:10,
        paddingHorizontal:20,
        marginBottom:10,

    },
    item:{
        borderWidth:1,
        borderColor: Colors.darkGrey,
        paddingVertical:10,
        paddingHorizontal:16,
        borderRadius:10,
    },
    itemText:{
        fontSize:14,
        color: Colors.darkGrey,
        letterSpacing:0.5,
    }
})