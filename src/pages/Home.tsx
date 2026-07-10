import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
import SuccessStories from "@/components/home/SuccessStories";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ProblemSection />
      <SuccessStories />
    </Layout>
  );
}