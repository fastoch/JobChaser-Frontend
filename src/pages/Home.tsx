/**
 * This is our Dashboard component
 */
import { BottomNav } from '../components/BottomNav';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../pages/SearchResults';

const Home = () => {
  return (
    <div>
      <SearchBar /> {/* Fabrice */}
      <SearchResults /> {/* Fabrice */}
      <BottomNav /> {/* Nordine */}
    </div>
  )
}

export default Home