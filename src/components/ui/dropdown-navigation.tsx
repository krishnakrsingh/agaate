import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type NavSubItem = {
  label: string;
  description: string;
  icon: React.ElementType;
};

export type NavSubMenu = {
  title: string;
  items: NavSubItem[];
};

export type NavItem = {
  id: number;
  label: string;
  subMenus?: NavSubMenu[];
  link?: string;
};

export type Props = {
  navItems: NavItem[];
};

export function DropdownNavigation({ navItems }: Props) {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [isHover, setIsHover] = useState<number | null>(null);

  const handleHover = (menuLabel: string | null) => {
    setOpenMenu(menuLabel);
  };

  return (
    <main className="relative w-full min-h-screen flex items-start md:items-center justify-center px-4 py-10">
      <div className="relative gap-5 flex flex-col items-center justify-center">
        <ul className="relative flex items-center space-x-1">
          {navItems.map((navItem) => (
            <li
              key={navItem.label}
              className="relative"
              onMouseEnter={() => handleHover(navItem.label)}
              onMouseLeave={() => handleHover(null)}
            >
              <button
                className="text-sm py-2 px-4 flex cursor-pointer group transition-colors duration-200 items-center justify-center gap-1.5 text-slate-800 hover:text-slate-900 font-semibold relative rounded-full"
                onMouseEnter={() => setIsHover(navItem.id)}
                onMouseLeave={() => setIsHover(null)}
              >
                <span className="relative z-10">{navItem.label}</span>
                {navItem.subMenus && (
                  <ChevronDown
                    className={`h-4 w-4 relative z-10 group-hover:rotate-180 duration-200 transition-transform ${
                      openMenu === navItem.label ? "rotate-180" : ""
                    }`}
                  />
                )}
                {(isHover === navItem.id || openMenu === navItem.label) && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute inset-0 size-full bg-slate-100 border border-slate-200/80 rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {openMenu === navItem.label && navItem.subMenus && (
                  <div className="w-auto absolute left-0 top-full pt-2 z-50">
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="bg-white/95 text-slate-900 backdrop-blur-xl border border-slate-200 p-5 w-max shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-3xl"
                      layoutId="menu"
                    >
                      <div className="w-fit shrink-0 flex space-x-9 overflow-hidden">
                        {navItem.subMenus.map((sub) => (
                          <motion.div layout className="w-full" key={sub.title}>
                            <h3 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-slate-700 font-mono border-b border-slate-200/80 pb-2">
                              {sub.title}
                            </h3>
                            <ul className="space-y-3">
                              {sub.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <li key={item.label}>
                                    <a
                                      href={navItem.link || "#"}
                                      className="flex items-start space-x-3 group p-2.5 rounded-2xl hover:bg-slate-100/90 transition-all duration-200 border border-transparent hover:border-slate-200/80 hover:shadow-sm"
                                    >
                                      <div className="border border-slate-200/80 bg-slate-100 text-[#0d2a21] rounded-xl flex items-center justify-center size-9 shrink-0 group-hover:bg-[#0d2a21] group-hover:text-[#a3e635] transition-all duration-200">
                                        <Icon className="h-4 w-4 flex-none" />
                                      </div>
                                      <div className="leading-5 w-max">
                                        <p className="text-sm font-extrabold text-slate-900 shrink-0 group-hover:text-[#0d2a21]">
                                          {item.label}
                                        </p>
                                        <p className="text-xs font-medium text-slate-600 shrink-0 group-hover:text-slate-800 transition-colors duration-200">
                                          {item.description}
                                        </p>
                                      </div>
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
