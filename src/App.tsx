import React, { Fragment, useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { clsx, Divider, Group, Stack, UnstyledButton } from "@mantine/core";

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
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") ??
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );
  
  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const [subMenu, setSubMenu] = useState(
    Object.fromEntries(
      MENU.filter(({ visible }) => visible !== undefined).map(
        ({ label, visible }) => [label, visible]
      )
    )
  );

  return (
    <nav>
      <section>
        <menu>
          {MENU.map(({ label, icon, children }, idx) => {
            const visible = subMenu[label];

            return (
              <Fragment key={idx}>
                <UnstyledButton
                  onClick={
                    children
                      ? () => {
                          setSubMenu({ ...subMenu, [label]: !visible });
                        }
                      : undefined
                  }
                  className={clsx(
                    "flex justify-between",
                    visible ? "text-light-turquoise" : "text-periwinkle"
                  )}
                >
                  <Group spacing="xs">
                    <Icon icon={icon} />
                    <span>{label}</span>
                  </Group>

                  {children ? (
                    <Icon icon={visible ? "bx:caret-up" : "bx:caret-down"} />
                  ) : null}
                </UnstyledButton>

                {children && visible
                  ? children.map((item, idx) => (
                      <UnstyledButton
                        key={idx}
                        className="pl-6 text-periwinkle"
                      >
                        {item}
                      </UnstyledButton>
                    ))
                  : null}
              </Fragment>
            );
          })}
        </menu>
        <Divider />

        <UnstyledButton
          onClick={() => {
            localStorage.getItem("theme") === "dark"
              ? setTheme("light")
              : setTheme("dark");
          }}
        >
          {/* <Icon icon={icon} /> */}
          <span>Dark theme</span>
        </UnstyledButton>
      </section>
    </nav>
  );
}
