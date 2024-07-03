import type { MotionProps } from "framer-motion"
import { usePathname } from "next/navigation"

import { useNavMenuColors } from "@/hooks/useNavMenuColors"
import { useRtlFlip } from "@/hooks/useRtlFlip"

const PADDING = 4 // Chakra-UI space token

export const useSubMenu = () => {
  const asPath = usePathname()
  const menuColors = useNavMenuColors()
  // const { isRtl } = useRtlFlip()

  const menuVariants: MotionProps["variants"] = {
    closed: { opacity: 0, scaleX: 0.9, originX: 0 },
    open: { opacity: 1, scaleX: 1, originX: 0 },
  }

  return {
    asPath,
    menuColors,
    menuVariants,
    PADDING,
  }
}
