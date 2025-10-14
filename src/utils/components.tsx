import Button from "@/components/Button";
import CardPost from "@/components/CardPost";
import Project from "@/components/CardProject";
import Code from "@/components/Code";
import Container from "@/components/Container";
import CustomLink from "@/components/CustomLink";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageView from "@/components/ImageView";
import Modal from "@/components/Modal";
import { Portal } from "@/components/Portal";
import Section from "@/components/Section";
import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import Technology from "@/components/Technology";
import Title from "@/components/Title";
import ToggleLanguage from "@/components/ToggleLanguage";
import ToggleTheme from "@/components/ToggleTheme";
import React, { ComponentPropsWithoutRef, HTMLElementType } from "react";

const Spacer = ({ height = 64 }: { height?: number }) => (
  <div className="w-full" style={{ height: `${height}px` }} />
);

const baseElements = {
  p: "animation-blur",
  strong: "animation-blur font-semibold",
  ul: "list-disc list-inside space-y-1",
  ol: "space-y-2 list-decimal",
  li: "ml-4 animation-blur",
};

const simpleElements = Object.fromEntries(
  Object.entries(baseElements).map(([tag, className]) => [
    tag,
    (props: ComponentPropsWithoutRef<HTMLElementType>) =>
      React.createElement(tag, { ...props, className }),
  ])
);

const headingBase =
  "font-semibold animation-blur text-brand-700 dark:text-white";

const headingSizes: Record<string, string> = {
  h1: "text-3xl font-bold",
  h2: "text-2xl",
  h3: "text-xl",
  h4: "text-lg",
  h5: "text-lg font-medium",
  h6: "text-lg font-medium",
};

const headings = Object.fromEntries(
  Object.entries(headingSizes).map(([tag, size]) => [
    tag,
    (props: React.HTMLAttributes<HTMLHeadingElement>) =>
      React.createElement(tag, {
        ...props,
        className: `${size} ${headingBase}`,
      }),
  ])
);

export const components = {
  Technology,
  CardPost,
  Container,
  Experience,
  Footer,
  Header,
  ImageView,
  Modal,
  Portal,
  Project,
  Setup,
  StaggedAnimation,
  Title,
  ToggleLanguage,
  ToggleTheme,
  Spacer,
  CustomLink,
  Button,
  Section,
  code: Code,
  ...simpleElements,
  ...headings,
};
