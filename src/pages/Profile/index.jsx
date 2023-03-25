import React, { useMemo } from 'react'
import Student from './Student'
import BasicTable from './Table'
import './index.css'
import { useParams, Link } from 'react-router-dom'
import { useAppSelector } from '../../store/index.hook'
import { statusValue } from '../../utils/constants'
import { groupObjects } from '../../utils/sorting'

const Profile = () => {
  const { studentId } = useParams()
  const students = useAppSelector(({students}) => students.data)
  const profile = useAppSelector(({profile}) => profile.data)
  const courses = useAppSelector(({courses}) => courses.data)
  
  const currentStudent = useMemo(() => {
    const studentInfo = students.find((item) => {
      return item.id === Number(studentId)
    })
    const profileInfo = profile.find((item) => item.user_id === `user_${studentId}`)

    const { type: statusType } = profileInfo?.status?.length ? profileInfo?.status.reduce((a, b) => new Date(a.date) > new Date(b.date) ? a : b) : { type: 0 }

    const remappedStudent = {
      name: studentInfo?.name,
      nickname: studentInfo?.nickname,
      major: profileInfo?.major,
      user_img: profileInfo?.user_img,
      year: profileInfo?.year,
      status: statusValue[statusType]
    }
    return remappedStudent
  }, [profile, studentId, students])

  const coursesByStudent = useMemo(() => {
    const result = courses?.filter(course => {
      const { user_id } = course
      return user_id === `user_${studentId}`
    })

    const remappedResult = result.reduce((acc, curr) => {
      const duplicateItem = acc.some(item => item.semester_code === curr.semester_code && item.course_selection === curr.course_selection);
      const duplicateName = acc.some(item => item.semester_code === curr.semester_code);
      
      if(!duplicateItem) {
        if (duplicateName) {
          acc.push({ ...curr, displayText: "" })
        } else {
          acc.push({ ...curr, displayText: curr.semester_code });
        }
      }
      return acc;
    }, []);

    const groupedByCode = groupObjects(remappedResult, 'semester_code')
    return groupedByCode
  }, [courses, studentId])

  return (
    <div className='profile-container'>
      <Link to={'/'} className="back-button">Back to Table</Link>
      <div className='back-button'></div>
      <div className='profile-content-container'>
        <Student data={currentStudent} />
        <BasicTable data={coursesByStudent} />
      </div>
    </div>
  )
}

export default Profile