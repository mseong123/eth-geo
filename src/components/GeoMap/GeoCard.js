import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Badge,
	Divider as ChakraDivider,
	Icon
  } from "@chakra-ui/react"
import { BaseLink } from "@/components/Link"
import { FaTwitter } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
export default function GeoCard({organisationData}) {

	return (
		<Card
			bg="primary.lowContrast"
			rounded="base"
			p="2"
			my="2"
		>
			<CardHeader fontWeight="semibold">{organisationData.Name} <Badge ml="2">{organisationData.Category}</Badge></CardHeader>
			<ChakraDivider mt={2}
					mb={2}
					display="inline-block"
					bg="border"/>
			<CardBody>
				{"Description: " + organisationData.About}
			</CardBody>
			<CardFooter my="2">
				{organisationData.Twitter !== "N/A"? (<BaseLink
				key={organisationData.Twitter}
				href={organisationData.Twitter}
				hideArrow
				color="body.base"
				_focus={{ color: "primary.base" }}
				mx="2"
				>
				<Icon
					as={FaTwitter}
					_hover={{
					transition:
						"color 0.2s ease-in-out, transform 0.2s ease-in-out",
					}}
					fontSize="2xl"
				/>
				</BaseLink>):null
				}
				{organisationData.Website !== "N/A"? (<BaseLink
				key={organisationData.Website}
				href={organisationData.Website}
				hideArrow
				color="body.base"
				_focus={{ color: "primary.base" }}
				mx="2"
				>
				<Icon
					as={CgWebsite}
					_hover={{
					transition:
						"color 0.2s ease-in-out, transform 0.2s ease-in-out",
					}}
					fontSize="2xl"
				/>
				</BaseLink>):null
				}
			</CardFooter>
		</Card>
	)
}