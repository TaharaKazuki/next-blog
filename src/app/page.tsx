import Container from '@/components/Container';
import LatestPosts from '@/components/home/latest-posts';
import { MainNav } from '@/components/main-nav';

export default function Home() {
  return (
    <Container>
      <MainNav />
      <main className="mt-16 flex flex-col items-start justify-evenly md:flex-row">
        <div>
          <LatestPosts />
        </div>
        <div className="h-screen space-y-10">
          <div>
            <h1 className="mb-4 font-bold">TOP CATEGORIES</h1>
            {/* <TopCatagories /> */}
          </div>
          <div className="sticky top-0">
            <h1 className="mb-4 font-bold">POPULAR POSTS</h1>
            {/* <PopularPosts /> */}
          </div>
        </div>
      </main>
    </Container>
  );
}
