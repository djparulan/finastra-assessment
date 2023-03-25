import { useEffect, useState, useMemo } from 'react'
import Table from './Table'
import axios from 'axios'
import { useAppSelector } from '../../store/index.hook'

import './index.css'
import { statusValue } from '../../utils/constants'



const Students = () => {
  
  const students = useAppSelector(({students}) => students.data)
  const courses = useAppSelector(({courses}) => courses.data)
  const profile = useAppSelector(({profile}) => profile.data)



  const filterCourses = (data = []) => {
    const result = data.reduce((acc, curr) => {
      const duplicateItem = acc.some(item => item.semester_code === curr.semester_code && item.course_selection === curr.course_selection);
      
      if(!duplicateItem) {
        acc.push({ ...curr })
      }
      return acc;
    }, []);

    return result
  }
  
  const remapStudents = useMemo(() => {
    const result = students?.map((student) => {
      const { id } = student
      
      const getAdditionalProfile = profile?.find((item) => {
        const { user_id } = item
        return user_id === `user_${id}`
      })

      const getCourses = courses?.filter((course) => {
        const { user_id } = course
        return user_id === `user_${id}`
      })

      if(getAdditionalProfile) {
        const { user_img, major, status } = getAdditionalProfile
  
        const { type: statusType } = status?.length ? status.reduce((a, b) => new Date(a.date) > new Date(b.date) ? a : b) : { type: 0 }
        
        const newStudent = {
          ...student, 
          major, 
          user_img, 
          status: statusValue[statusType],
          totalCourses: filterCourses(getCourses).length || 0
        }

        return newStudent
      }

      return student
    })

    return result
  }, [courses, profile, students])

  return (
    <div className='table__container'>
      <Table data={remapStudents} />
    </div>
  )
}

export default Students
