import React, { Fragment, useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { clsx, Divider, UnstyledButton } from "@mantine/core";

const ICONIFY = {
  SWITCH_OFF: "mdi:toggle-switch-off-outline",
  SWITCH_ON: "mdi:toggle-switch-outline",

  COLLAPSED: "ri:menu-unfold-line",
  UNCOLLAPSED: "ri:menu-fold-line",
};

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
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") ??
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (localStorage.getItem("theme") === "dark") {
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
    <nav
      className={clsx(
        "flex flex-col justify-between h-full max-w-xs p-6 dark:bg-light-arsenic",
        { "w-max": collapsed }
      )}
    >
      <section className="flex flex-col gap-11">
        <menu className="flex flex-col gap-6">
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
                    "flex gap-4 my-3 h-5",
                    visible
                      ? "text-light-turquoise dark:text-dark-celeste"
                      : "text-periwinkle dark:text-white"
                  )}
                >
                  <Icon icon={icon} />
                  {collapsed ? null : (
                    <label className="flex justify-between flex-1 cursor-pointer">
                      <span>{label}</span>

                      {children ? (
                        <Icon
                          icon={visible ? "bx:caret-up" : "bx:caret-down"}
                        />
                      ) : null}
                    </label>
                  )}
                </UnstyledButton>

                {children && visible ? (
                  <menu className="grid gap-6 pl-8">
                    {children.map((item, idx) => (
                      <UnstyledButton
                        key={idx}
                        className="h-5 my-3 text-periwinkle dark:text-white"
                      >
                        {item}
                      </UnstyledButton>
                    ))}
                  </menu>
                ) : null}
              </Fragment>
            );
          })}
        </menu>

        <Divider />

        <UnstyledButton
          className="flex gap-4 text-periwinkle dark:text-white"
          onClick={() => {
            theme === "dark" ? setTheme("light") : setTheme("dark");
          }}
        >
          <Icon
            icon={theme === "dark" ? ICONIFY.SWITCH_ON : ICONIFY.SWITCH_OFF}
          />
          {collapsed ? null : <span>Dark theme</span>}
        </UnstyledButton>
      </section>

      <UnstyledButton
        className={clsx(
          collapsed ? "text-light-turquoise" : "text-periwinkle",
          "flex h-5 gap-4 dark:text-white",
        )}
        onClick={() => setCollapsed((e) => !e)}
      >
        <Icon icon={collapsed ? ICONIFY.COLLAPSED : ICONIFY.UNCOLLAPSED} />
        {collapsed ? null : <span>Collapse panel</span>}
      </UnstyledButton>
    </nav>
  );
}
