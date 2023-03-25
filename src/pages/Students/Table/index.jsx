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
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const sortOrderData = ['', ASCENDING, DESCENDING] 

export default function BasicTable({data}) {
  const navigate = useNavigate();
  
  const [sortOrder, setSortOrder] = useState(1)
  const [keySorted, setKeySorted] = useState('')
  const [searchTerm, setSearchTerm] = useState("")
  
  const [studentData, setStudentData] = useState([])
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    setSearchResult(fuzzySearch(searchTerm, data));
  }, [searchTerm, data]);
  
  useEffect(() => {
    setStudentData(searchResult)
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
        setSortOrder(1)
      }
      setStudentData(newData)
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

  const handleStudentClick = (id) => {
    navigate(`/${id}`)
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
    <>
      <TextField
        label="Search..."
        id="outlined-size-small"
        defaultValue={searchTerm}
        size="small"
        onChange={handleSearch}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{cursor: 'pointer'}} onClick={() => handleSortClick('name')}>Name {keySorted === 'name' && arrowState}</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell sx={{cursor: 'pointer'}} onClick={() => handleSortClick('major')}>Major {keySorted === 'major' && arrowState}</TableCell>
              <TableCell sx={{cursor: 'pointer'}} onClick={() => handleSortClick('status')}>Status {keySorted === 'status' && arrowState}</TableCell>
              <TableCell align="right">Total Courses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData.length ? studentData.map((student) => {
              const {
                id, 
                user_img,
                name, 
                nickname, 
                phone, 
                email, 
                major, 
                status,
                totalCourses
              } = student
              const currentNickname = nickname ? `(${nickname})` : ''
              const studentImage = user_img || 'default.jpg'
              
            return (
                <TableRow
                  key={id}
                  onClick={() => handleStudentClick(id)}
                  sx={{cursor: 'pointer'}}
                >
                  <TableCell>
                    <img className='student__image' src={require(`../../../../public/assets/${studentImage}`)} alt={`${name}`} />
                  </TableCell>
                  <TableCell>
                    {name} {currentNickname}
                  </TableCell>
                  <TableCell>{phone}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{major}</TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell align="right">{totalCourses}</TableCell>
                </TableRow>
              )
            }) : 
            <TableRow><TableCell>No data found</TableCell></TableRow>
          }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}