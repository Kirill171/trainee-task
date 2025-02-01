import SearchBar from '@components/SearchBar';

import ErrorBoundary from '@/components/ErrorBoundary';
import HereSomeMore from '@/components/HereSomeMore';
import Hero from '@/components/Hero';
import SearchResults from '@/components/SearchResults';
import TopicsForYou from '@/components/TopicsForYou';

export default function HomePage() {
  return (
    <section className="container">
      <Hero />
      <ErrorBoundary>
        <SearchBar />
      </ErrorBoundary>
      <SearchResults />
      <TopicsForYou />
      <HereSomeMore />
    </section>
  );
}
