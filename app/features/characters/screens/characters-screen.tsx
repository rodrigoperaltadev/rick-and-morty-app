import { useCharacters } from '@app/features/characters/hooks/use-characters'
import { DefaultLayout } from '@app/shared/layout/default-layout'
import { ErrorLayout } from '@app/shared/layout/error-layout'
import { useNavigation } from '@react-navigation/native'
import { CharacterList } from '../components/character-list/character-list'
import type { CharactersStackNavigationProp } from '../navigation/characters-stack'

export const CharactersScreen = () => {
  const {
    characters,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    error
  } = useCharacters()
  const navigation = useNavigation<CharactersStackNavigationProp>()
  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  if (error && !isLoading)
    return <ErrorLayout onRetryButtonPress={() => fetchNextPage()} />

  return (
    <DefaultLayout isLoading={isLoading}>
      <CharacterList
        data={characters}
        onPress={(id) => navigation.navigate('characterDetail', { id })}
        isFetchingNextPage={isFetchingNextPage}
        error={error}
        fetchNextPage={fetchNextPage}
        onEndReached={handleLoadMore}
      />
    </DefaultLayout>
  )
}
