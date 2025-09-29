import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import ToggleTheme from "./ToggleTheme";

type SetupProps = {
  children: React.ReactNode;
  spaceElements?: number;
};

export default function Setup({ children, spaceElements = 0 }: SetupProps) {
  return (
    <>
      <Container>
        <Header />
        <main
          className="flex flex-col flex-1 my-20"
          style={{ gap: `${spaceElements}px` }}
        >
          {children}
        </main>
        <Footer />

        <div className="fixed left-90 top-48 size-112 bg-radial from-[#00ff55] to-white dark:to-brand-900 to-70% opacity-7 dark:opacity-5 pointer-events-none -z-20" />
        <div className="fixed left-70 top-28 size-112 bg-radial from-[#00D0FF] to-white dark:to-brand-900 to-70% opacity-7 dark:opacity-5 pointer-events-none -z-20" />
        <div className="hidden lg:block fixed right-44 size-112 bg-radial from-[#00ff55] to-white dark:to-brand-900 to-70% opacity-7 dark:opacity-5 pointer-events-none -z-20" />
      </Container>

      <ToggleTheme />
    </>
  );
}
