import { NativeBaseProvider, StatusBar } from 'native-base'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import { THEME } from './src/styles/theme'

import { Routes } from './src/routes'
import { Loading } from './src/components/Loading'

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api-sa-east-1.hygraph.com/v2/cl6ck165j15tn01t9hya5go25/master',
  cache: new InMemoryCache()
})

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider theme={THEME}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </NativeBaseProvider>
    </ApolloProvider>
  )
}
