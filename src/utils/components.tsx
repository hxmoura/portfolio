import BackButton from "@/components/BackButton";
import Badge from "@/components/Badge";
import CardPost from "@/components/CardPost";
import Container from "@/components/Container";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageView from "@/components/ImageView";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import { Portal } from "@/components/Portal";
import PrimaryButton from "@/components/PrimaryButton";
import Project from "@/components/Project";
import SecondaryButton from "@/components/SecondaryButton";
import Setup from "@/components/Setup";
import StaggedAnimation from "@/components/StaggedAnimation";
import Status from "@/components/Status";
import Title from "@/components/Title";
import ToggleLanguage from "@/components/ToggleLanguage";
import ToggleTheme from "@/components/ToggleTheme";
import { HTMLAttributes } from "react";

export const components = {
  BackButton,
  Badge,
  CardPost,
  Container,
  Experience,
  Footer,
  Header,
  ImageView,
  Input,
  Loading,
  Modal,
  Portal,
  PrimaryButton,
  Project,
  SecondaryButton,
  Setup,
  StaggedAnimation,
  Status,
  Title,
  ToggleLanguage,
  ToggleTheme,
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="animation-blur" {...props} />
  ),
};
