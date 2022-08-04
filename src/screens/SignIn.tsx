import { useState } from 'react'
import { VStack, Heading, Icon, useTheme } from 'native-base'
import { Envelope, Key } from 'phosphor-react-native'
import { useGetUserQuery } from '../generated/graphql'

import Logo from '../assets/logo_primary.svg'

import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'

export function SignIn() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const { colors } = useTheme()
  const navigation = useNavigation()
  const { data } = useGetUserQuery({
    variables: {
      email: name
    }
  })
  function handleSignIn() {
    console.log(name, password)

    if (data) {
      Alert.alert('Alert Title', 'My Alert Msg', [
        {
          text: 'Cancel',
          onPress: () => console.log(data),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => console.log(data.usuario?.name) }
      ])
    }
    //navigation.navigate('home');
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setName}
      />

      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" w="full" onPress={handleSignIn} />
    </VStack>
  )
}
