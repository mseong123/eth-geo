'use client'
import React, { useState } from "react"
import {
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
  } from "@chakra-ui/react"

import { BsGeoAlt } from "react-icons/bs";

export default function GeoButtonDropdown({ list, ...rest }) {
// const [selectedItem, setSelectedItem] = useState(list.text)
const [selectedItem, setSelectedItem] = useState("hello")
const handleClick = (
	e,
	item,
	idx
) => {
	setSelectedItem(item.text)
}
return (
    <Menu matchWidth>
      <MenuButton
        as={Button}
        leftIcon={<BsGeoAlt />}
        variant="outline"
        _active={{ bg: "transparent" }}
        {...rest}
      >
        {selectedItem}
      </MenuButton>
      <MenuList
        py={2}
        borderRadius="base"
        border="1px"
        borderColor="text"
        bg="dropdownBackground"
        zIndex="popover"
      >
        {/* {list.items.map((item, idx) => {
          const { text,  } = item
          return (
              <MenuItem
                as="span"
                onClick={(e) => handleClick(e, item, idx)}
                p={2}
                textAlign="center"
                justifyContent="center"
                bg="dropdownBackground"
                _hover={{
                  color: "primary.base",
                  bg: "dropdownBackgroundHover",
                }}
                _focus={{
                  color: "primary.base",
                  bg: "dropdownBackgroundHover",
                }}
              >
                {text}
              </MenuItem>
            
          ) 
          
        })} */}
      </MenuList>
    </Menu>
  )
}
  