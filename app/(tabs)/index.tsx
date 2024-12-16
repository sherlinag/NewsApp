import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import BreakingNews from '@/components/BreakingNews'
import axios from 'axios'
import { NewsDataType } from '@/types'
import Categories from '@/components/Categories'
import WhatsAppIntegration from '@/components/WhatsAppIntegration'

type Props = {}

const Page = (props: Props) => {
  const {top:safeTop}= useSafeAreaInsets();
  const [breakingNews, setBreakingNews]=useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading]=useState(true);
  useEffect(()=>{
    getBreakingNews()
  },[]);

  const getBreakingNews = async()=>{
    try{
      const URL = 
      'https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json'
      const response =await axios.get(URL);
      // console.log(response.data);
      
      if(response&& response.data && response.data.articles){
        setBreakingNews(response.data.articles);
        setIsLoading(false);
      }
    }
    catch(err:any){
      console.log('Error Message: ',err.message);
    }
  }
  return (
    <View style={[styles.container, {paddingTop:safeTop}]}>
      <Header />
      <SearchBar />
      {isLoading?(
        <ActivityIndicator size={'large'}/>
      ):(
      <BreakingNews newsList={breakingNews}/>
    )}
    <Categories />
    <WhatsAppIntegration/>
    </View>
  )
}

export default Page 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
})