import { usePathname } from "next/navigation"
// import { useTranslation } from "next-i18next"
import {
  BsBook,
  BsBuildings,
  BsCodeSquare,
  BsCompass,
  BsFlag,
  BsJournalCode,
  BsLayers,
  BsLightbulb,
  BsMegaphone,
  BsMortarboard,
  BsPinAngle,
  BsSafe,
  BsSignpost,
  BsSliders,
  BsUiChecksGrid,
} from "react-icons/bs"
import { PiFlask, PiUsersFourLight } from "react-icons/pi"
import {
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"

import { EthereumIcon } from "@/components/icons/EthereumIcon"

// import { trackCustomEvent } from "@/lib/utils/matomo"

import { FROM_QUERY } from "@/lib/constants"

import type { NavSections } from "./types"

export const useNav = () => {
  const asPath = usePathname()
  const { isOpen, onToggle } = useDisclosure()
  // const { t } = useTranslation("common")

  const colorToggleEvent = useColorModeValue("dark mode", "light mode") // This will be inverted as the state is changing
  const { toggleColorMode: chakraToggleColorMode } = useColorMode()

  const linkSections: NavSections = {
    geo: {
      label: "Geo",
      ariaLabel: "geo-menu",
      href: "/geo",
      items: [],
    },
    contribute: {
      label: "Contribute",
      ariaLabel: "contribute-menu",
      href: "/contribute",
      items: [],
    }
  }

  const splitPath = asPath.split("/")
  const fromPageParameter =
    splitPath.length > 1 && splitPath[1] !== "languages"
      ? `?${FROM_QUERY}=/${splitPath.slice(1).join("/")}`
      : ""

  const toggleColorMode = () => {
    chakraToggleColorMode()
    // trackCustomEvent({
    //   eventCategory: "nav bar",
    //   eventAction: "click",
    //   eventName: colorToggleEvent,
    // })
  }

  const mobileNavProps = {
    fromPageParameter,
    isOpen,
    toggleColorMode,
    onToggle,
  }

  return {
    fromPageParameter,
    linkSections,
    mobileNavProps,
    toggleColorMode,
  }
}
