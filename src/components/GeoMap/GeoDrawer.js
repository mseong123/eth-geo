import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	useDisclosure
  } from "@chakra-ui/react"

  export default function GeoDrawer({onClose, onOpen, isOpen}) {
	return (
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={onClose}
			size="md"
		>
			<DrawerOverlay />
			<DrawerContent bg="background.base">
			<DrawerHeader mb={4}>
				<DrawerCloseButton />
			</DrawerHeader>
			<DrawerBody position="relative" p={3}>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
  }