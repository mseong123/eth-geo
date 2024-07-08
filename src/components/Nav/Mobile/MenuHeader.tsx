// import { useTranslation } from "next-i18next"
import { DrawerCloseButton, DrawerHeader, Flex } from "@chakra-ui/react"
import { RiEarthFill } from "react-icons/ri";

const MenuHeader = () => {
  // const { t } = useTranslation("common")

  return (
    <Flex p="6" alignItems="center" justify="space-between">
      <DrawerHeader
        fontWeight="bold"
        fontSize="3xl"
        color="body.medium"
        
        p="0"
      >
        <RiEarthFill/>
      </DrawerHeader>
      <DrawerCloseButton fontSize="md" w="fit-content" p="2" mt="3" me="2">
        {"close"}
      </DrawerCloseButton>
    </Flex>
  )
}

export default MenuHeader
