import { useState } from "react"
import sortBy from "lodash/sortBy"
import {
  Box,
  Flex,
  LinkBox,
  LinkOverlay,
  List,
  ListItem,
  useColorModeValue,
  useToken,
  VisuallyHidden,
} from "@chakra-ui/react"

import Emoji from "@/components/Emoji"
import InfoBanner from "@/components/InfoBanner"
import Input from "@/components/Input"
import InlineLink, { BaseLink } from "@/components/Link"
import Text from "@/components/OldText"
import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"

import meetups from "@/data/community-meetups.json"

import { useRtlFlip } from "@/hooks/useRtlFlip"

export interface Meetup {
  title: string
  emoji: string
  location: string
  link: string
}

const filterMeetups = (query: string): Array<Meetup> => {
  if (!query) return sortedMeetups

  return sortedMeetups.filter((meetup) => {
    const flag = meetup.emoji.replace(/[:_]/g, " ")
    const searchable = [meetup.title, meetup.location, flag].join(" ")
    return searchable.toLowerCase().includes(query.toLowerCase())
  })
}

// sort meetups by country and then by city
const sortedMeetups: Array<Meetup> = sortBy(meetups, ["emoji", "location"])

// TODO create generalized CardList / TableCard
// TODO prop if ordered list or unordered
const MeetupList = () => {
  const [searchField, setSearchField] = useState<string>("")
  const { flipForRtl } = useRtlFlip()
  const filteredMeetups = filterMeetups(searchField)
  const listBoxShadow = useColorModeValue("tableBox.light", "tableBox.dark")
  const listItemBoxShadow = useColorModeValue(
    "tableItemBox.light",
    "tableItemBox.dark"
  )

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchField(event.target.value)
    trackCustomEvent({
      eventCategory: "events search",
      eventAction: "click",
      eventName: event.target.value,
    })
  }

  const primaryBaseColor = useToken("colors", "primary.base")

  return (
    <Box>
      <Input
        mb={6}
        onChange={handleSearch}
        placeholder={"Search by meetup title or location"}
        aria-describedby="input-instruction"
      />
      {/* hidden for attachment to input only */}
      <VisuallyHidden hidden id="input-instruction">
        results update as you type
      </VisuallyHidden>

      <List m={0} boxShadow={listBoxShadow} aria-label="Event meetup results">
        {filteredMeetups.map((meetup, idx) => (
          <LinkBox
            as={ListItem}
            key={idx}
            display="flex"
            justifyContent="space-between"
            boxShadow={listItemBoxShadow}
            mb={0.25}
            p={4}
            w="100%"
            _hover={{
              textDecoration: "none",
              borderRadius: "base",
              boxShadow: `0 0 1px ${primaryBaseColor}`,
              bg: "tableBackgroundHover",
            }}
          >
            <Flex flex="1 1 75%" me={4}>
              <Box me={4} opacity="0.4">
                {idx + 1}
              </Box>
              <Box>
                <LinkOverlay
                  as={BaseLink}
                  href={meetup.link}
                  textDecor="none"
                  color="text"
                  hideArrow
                  isExternal
                >
                  {meetup.title}
                </LinkOverlay>
              </Box>
            </Flex>
            <Flex
              textAlign="end"
              alignContent="flex-start"
              flex="1 1 25%"
              me={4}
              flexWrap="wrap"
            >
              <Emoji
                text={meetup.emoji}
                boxSize={4}
                me={2}
                lineHeight="unset"
              />
              <Text mb={0} opacity={"0.6"}>
                {meetup.location}
              </Text>
            </Flex>
            <Box
              as="span"
              _after={{
                content: '"↗"',
                ms: 0.5,
                me: 1.5,
                transform: flipForRtl,
                display: "inline-block",
              }}
            ></Box>
          </LinkBox>
        ))}
      </List>
      <Box aria-live="assertive" aria-atomic>
        {!filteredMeetups.length && (
          <InfoBanner emoji=":information_source:">
            <Translation id="page-community:page-community-meetuplist-no-meetups" />{" "}
            <InlineLink href="https://github.com/ethereum/ethereum-org-website/blob/dev/src/data/community-meetups.json">
              <Translation id="page-community:page-community-please-add-to-page" />
            </InlineLink>
          </InfoBanner>
        )}
      </Box>
    </Box>
  )
}

export default MeetupList
