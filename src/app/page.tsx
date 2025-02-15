import Container from "@/components/container";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Home() {
  return (
    <Container>
      <Header />
      <main className="flex-1">content</main>
      <Footer />
    </Container>
  );
}
