import React, { Fragment, useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { Button, Stack } from "@mantine/core";

const SWITCH_OFF = <Icon icon="line-md:switch-to-switch-off-transition" />;
const SWITCH_ON = <Icon icon="line-md:switch-off-to-switch-transition" />;

const MENU: Array<
  {
    label: string;
    icon: string;
  } & Partial<{
    children: Array<string>;
    visible: boolean;
  }>
> = [
  {
    label: "Admin Dashboard",
    icon: "bi:house-heart",
  },
  {
    label: "Registration",
    icon: "bx:calendar-check",
  },
  {
    label: "Patients",
    icon: "ph:paw-print-bold",
  },
  {
    label: "Administration",
    icon: "ri:list-settings-line",
    children: ["Specialists", "Specialties", "Schedule"],
    visible: false,
  },
  {
    label: "Pricing",
    icon: "ri:money-dollar-circle-line",
    children: ["Services", "Vaccines", "Medicines"],
    visible: false,
  },
  {
    label: "Reception History",
    icon: "ri:history-line",
  },
  {
    label: "Report",
    icon: "octicon:graph-16",
  },
];

export default function App() {
  // useEffect(() => {
  //   if (
  //     localStorage.theme === "dark" ||
  //     (!("theme" in localStorage) &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches)
  //   ) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }

  //   // Whenever the user explicitly chooses light mode
  //   localStorage.theme = "light";

  //   // Whenever the user explicitly chooses dark mode
  //   localStorage.theme = "dark";

  //   // Whenever the user explicitly chooses to respect the OS preference
  //   localStorage.removeItem("theme");
  // }, [])

  const [subMenu, setSubMenu] = useState(
    Object.fromEntries(
      MENU.filter(({ visible }) => visible !== undefined).map(
        ({ label, visible }) => [label, visible]
      )
    )
  );

  return (
    <Stack>
      {MENU.map(({ label, icon, children }, idx) => (
        <Fragment key={idx}>
          <Button
            rightIcon={
              children ? (
                subMenu[label] ? (
                  <Icon icon="bx:caret-up" />
                ) : (
                  <Icon icon="bx:caret-down" />
                )
              ) : null
            }
            onClick={
              children
                ? () => {
                    setSubMenu({ ...subMenu, [label]: !subMenu[label] });
                  }
                : undefined
            }
            classNames={{
              inner: "justify-start",
            }}
            className="text-periwinkle"
            leftIcon={<Icon icon={icon} />}
          >
            {label}
          </Button>

          {children && subMenu[label]
            ? children.map((item, idx) => (
                <Button
                  key={idx}
                  classNames={{
                    inner: "justify-start",
                  }}
                  className="text-periwinkle"
                >
                  {item}
                </Button>
              ))
            : null}
        </Fragment>
      ))}
    </Stack>
  );
}
