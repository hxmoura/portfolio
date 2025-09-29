import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import { components } from "@/utils/components";
import readMarkdown from "@/utils/readMarkdown";
import { MDXRemote } from "next-mdx-remote-client/rsc";

type ContentsProps = {
  params: Promise<{ slug: string }>;
};

export default async function ContentsPage({ params }: ContentsProps) {
  const { slug } = await params;
  const content = readMarkdown(slug, "content/posts");

  return (
    <Setup spaceElements={40}>
      <StaggedAnimation />

      <MDXRemote source={content} components={components} />
    </Setup>
  );
}
