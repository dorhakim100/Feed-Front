import { useState, useEffect, useRef } from 'react'

import { Calender } from './Calender.jsx'

import { Button } from '@mui/material'
import Box from '@mui/joy/Box'
import Textarea from '@mui/joy/Textarea'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

export function CommentFilter({ filterBy, setFilterBy }) {
  const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
  const [isCalender, setIsCalender] = useState(false)
  const filterRef = useRef()

  useEffect(() => {
    setFilterBy(filterToEdit)
  }, [filterToEdit])

  useEffect(() => {
    filterRef.current.style.height = '145.5px'
    setIsCalender(false)
  }, [])

  function handleChange(ev) {
    const type = ev.target.type
    const field = ev.target.name
    let value

    switch (type) {
      case 'text':
      case 'radio':
        value = field === 'sortDir' ? +ev.target.value : ev.target.value
        if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
        break
      case 'number':
        value = +ev.target.value || ''
        break
    }
    setFilterToEdit({ ...filterToEdit, [field]: value })
  }

  function clearFilter() {
    setFilterToEdit({ ...filterToEdit, txt: '', date: '' })
  }

  function clearSort() {
    setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
  }

  function onSetIsCalender() {
    if (filterRef.current.style.height === '490.5px') {
      filterRef.current.style.height = '145.5px'
    } else {
      filterRef.current.style.height = '490.5px'
    }
    setIsCalender((prev) => (prev = !prev))
  }

  function handleDateChange(newDate) {
    const dateToSet = newDate.format('DD-MM-YYYY')
    console.log(filterToEdit)
    setFilterToEdit({ ...filterToEdit, date: dateToSet })
  }

  return (
    <section className='comment-filter' ref={filterRef}>
      <h3>Filter:</h3>
      <input
        type='text'
        name='txt'
        value={filterToEdit.txt}
        placeholder='Free text'
        onChange={handleChange}
        required
      />
      <Button
        variant='contained'
        className='calender-button'
        onClick={() => onSetIsCalender()}
      >
        <CalendarMonthIcon />
      </Button>
      {isCalender && <Calender handleDateChange={handleDateChange} />}
      <Button className='btn-clear' variant='contained' onClick={clearFilter}>
        Clear
      </Button>
      <div className='sort-container'>
        <h3>Sort:</h3>

        <div className='sort-dir'>
          <label>
            <span>Asce</span>
            <input
              type='radio'
              name='sortDir'
              value='1'
              checked={filterToEdit.sortDir === 1}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Desc</span>
            <input
              type='radio'
              name='sortDir'
              value='-1'
              onChange={handleChange}
              checked={filterToEdit.sortDir === -1}
            />
          </label>
        </div>
      </div>
    </section>
  )
}
