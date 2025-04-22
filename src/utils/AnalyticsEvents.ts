import { sendGAEvent } from "@next/third-parties/google";

export type analyticsEventName = "contact_clicked" | "project_actions_clicked";

export const AnalyticsClickEvent = (
  name: analyticsEventName,
  target: string
) => {
  return sendGAEvent("event", name, { target });
};
