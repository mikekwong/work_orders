import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../api/hatchways'

const Search = ({ onFilterChange, filter, onSubmit }) => {
  const [nameQuery, setNameQuery] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(null)

  const onSearchSubmit = e => {
    e.preventDefault()
    if (nameQuery) {
      setHasSubmitted(true)

      onSubmit(nameQuery)
    } else {
      setHasSubmitted(false)
    }
  }

  return (
    <>
      <form onSubmit={onSearchSubmit}></form>
    </>
  )
}

export default Search
