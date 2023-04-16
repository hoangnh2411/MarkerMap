import Map from "@/components/Map/Map";

import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/Map/Map'), {
  ssr: false,
});

const Home = () => {
  return (
    <div>
      <LeafletMap />
    </div>
  );
};

export default Home;