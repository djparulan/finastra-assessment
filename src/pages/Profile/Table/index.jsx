import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './index.css'
import { sortData } from '../../../utils/sorting';
import { ASCENDING, DESCENDING } from '../../../utils/constants';
import fuzzySearch from '../../../utils/fuzzySearch';
import { useAppSelector } from '../../../store/index.hook';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const sortOrderData = ['', ASCENDING, DESCENDING] 

export default function BasicTable({data}) {
  const [searchResult, setSearchResult] = useState([])
  const [sortOrder, setSortOrder] = useState(1)
  const [keySorted, setKeySorted] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [coursesData, setCoursesData] = useState([])
  const [currency, setCurrency] = useState({
    symbol: "$",
    name: "US Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "USD",
    name_plural: "US dollars"
})

  const currencies = useAppSelector(({courses}) => courses.currencyType)
  const exchangeRate = useAppSelector(({courses}) => courses?.exchangeRate?.conversion_rates || {})
  
  const getExchangeRate = useCallback((price) => {
    return exchangeRate ? (price * exchangeRate[currency.code]).toFixed(2) : (0).toFixed(2)
  }, [currency.code, exchangeRate])

  const remappedExchangeRate = useMemo(() => {
    return Object.keys(exchangeRate).filter(rate => rate in currencies)
  }, [currencies, exchangeRate])
  
  useEffect(() => {
    setSearchResult(fuzzySearch(searchTerm, data));
  }, [searchTerm, data]);

  useEffect(() => {
    setCoursesData(searchResult)
  }, [searchResult])

  const handleSortClick = useCallback((key) => {
    let newData
    
    if(searchResult) {
      if(keySorted === key) {
        if(sortOrderData[sortOrder]) {
          newData = sortData(searchResult, key, sortOrderData[sortOrder])
        } else {
          newData = searchResult
        }
      } else {
        newData = sortData(searchResult, key, ASCENDING)
      }

      setCoursesData(newData)
    }
    
    setSortOrder(prevState => {
      if(prevState < sortOrderData.length - 1) {
        return prevState + 1
      } else {
        return 0
      }
    })

    setKeySorted(key)
  }, [keySorted, searchResult, sortOrder])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleCurrencySelect = (event) => {
    setCurrency(currencies[event.target.value])
  }

  const arrowState = useMemo(() => {
    switch(sortOrder) {
      case 2:
        return <ArrowDownwardIcon sx={{ fontSize: 13 }} />
      case 0:
        return <ArrowUpwardIcon sx={{ fontSize: 13 }}  />
      case 1:
        return ''
      default:
        return ''
    }
  }, [sortOrder])
  
  return (
    <div>
      <div className='header'>
        <TextField
          label="Search..."
          id="outlined-size-small"
          defaultValue={searchTerm}
          size="small"
          onChange={handleSearch}
        />
        {!!currency && remappedExchangeRate && <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="currencyType">Currency</InputLabel>
          <Select
            labelId="currencyType"
            id="currencyType"
            value="USD"
            defaultValue="USD"
            label="Currency"
            onChange={handleCurrencySelect}
          >
            {
              remappedExchangeRate && remappedExchangeRate.map(item => (
                <MenuItem value={item} key={item}>{item}</MenuItem>
              ))
            }
          </Select>
        </FormControl>}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, height: 'auto' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{cursor: 'pointer'}} onClick={() => handleSortClick('semester_code')}>Semester Code {arrowState}</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Course Selection</TableCell>
              <TableCell sx={{cursor: 'pointer'}} align='right'>Course Fee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { coursesData.length ?
              coursesData.map((course) => {
                const { semester_code, displayText, course_name, course_selection, course_fee} = course
                return (
                  <TableRow key={`${course_name}_${semester_code}`}>
                    <TableCell>{displayText}</TableCell>
                    <TableCell>{course_name}</TableCell>
                    <TableCell>{course_selection}</TableCell>
                    <TableCell align='right'>{currency.symbol_native} {getExchangeRate(course_fee)}</TableCell>
                  </TableRow>
                )
              })
              : <TableRow>
                  <TableCell>No data found</TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}