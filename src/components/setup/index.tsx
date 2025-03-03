import Container from "../container";
import Footer from "../footer";
import Header from "../header";

type SetupProps = {
  children: React.ReactNode;
  spaceElements?: number;
};

export default function Setup({ children, spaceElements = 0 }: SetupProps) {
  return (
    <Container>
      <Header />
      <main
        className="flex flex-col flex-1 my-20"
        style={{ gap: `${spaceElements}px` }}
      >
        {children}
      </main>
      <Footer />
    </Container>
  );
}
