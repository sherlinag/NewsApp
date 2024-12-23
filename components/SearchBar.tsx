import { View, TextInput , StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'


type Props = {}

const SearchBar = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name='search-outline' size={20} color={Colors.lightGrey} style={styles.searchIcon}/>
        <TextInput placeholder='Search' placeholderTextColor={Colors.lightGrey} style={styles.searchTxt} autoCapitalize='none'/>
      </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container:{
        marginHorizontal:15,
        marginBottom:10,
    },
    searchBar:{
        backgroundColor: '#E4E4E4',
        paddingHorizontal:8,
        paddingVertical:8,
        borderRadius:10,
        flexDirection:'row',
        gap:10
    },
    searchTxt:{
        fontSize:14,
        flex:1,
        color:Colors.darkGrey

    },
    searchIcon:{
        paddingTop:9,
    }
})