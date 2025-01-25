import HereSomeMore from '@/components/HereSomeMore';
import Hero from '@/components/Hero';
import SearchResults from '@/components/SearchResults';
import TopicsForYou from '@/components/TopicsForYou';
import SearchBar from '@components/SearchBar';

export default function HomePage() {
  return (
    <section>
      <div className="container">
        <Hero />
        <SearchBar />
        <SearchResults />
        <TopicsForYou />
        <HereSomeMore />
      </div>
    </section>
  );
}
