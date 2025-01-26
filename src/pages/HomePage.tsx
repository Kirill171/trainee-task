import Hero from '@/components/Hero';
import SearchBar from '@components/SearchBar';
import SearchResults from '@/components/SearchResults';
import TopicsForYou from '@/components/TopicsForYou';
import HereSomeMore from '@/components/HereSomeMore';

export default function HomePage() {
  return (
    <section className="container">
      <Hero />
      <SearchBar />
      <SearchResults />
      <TopicsForYou />
      <HereSomeMore />
    </section>
  );
}
