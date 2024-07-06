'use client'
import React, { useState, useEffect } from "react"
import {
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
  } from "@chakra-ui/react"
import { zoomToLocation } from "@/lib/utils/d3-utilities"
import { BsGeoAlt } from "react-icons/bs";

export default function GeoButtonDropdown({ dropDownRegion, dropDownCountry, zoomed, ...rest }) {
  console.log(dropDownCountry)
  const [selectedItem, setSelectedItem] = useState(!zoomed? dropDownRegion.name: dropDownCountry.name)
  const handleClick = (
    e,
    item
  ) => {
    setSelectedItem(item.text)
    zoomToLocation(item.location)
  }

useEffect(()=>{
  setSelectedItem(!zoomed? dropDownRegion.name: dropDownCountry.name)
}, [zoomed])

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
        {!zoomed? dropDownRegion.map((item) => {
          return (
              <MenuItem
                as="span"
                key={item.text}
                onClick={(e) => handleClick(e, item)}
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
                {item.text}
              </MenuItem>
            
          )}) :
          dropDownCountry.map((item) => {
            return (
                <MenuItem
                  as="span"
                  key={item.text}
                  onClick={(e) => handleClick(e, item)}
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
                  {item.text}
                </MenuItem>
              
            )
        })} 
          
        
      </MenuList>
    </Menu>
  )
}
  