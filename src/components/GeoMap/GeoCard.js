import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Badge
  } from "@chakra-ui/react"

export default function GeoCard({organisationData}) {
	return (
		<Card>
			<CardHeader>{organisationData.Name}</CardHeader>
			<Badge>Category: {organisationData.Category}</Badge>
		</Card>
	)
}