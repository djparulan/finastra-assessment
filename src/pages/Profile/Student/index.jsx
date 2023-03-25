import './index.css'

const Student = ({data}) => {
  const { name, nickname, major, year, status } = data
  
  return (
    <div className="student-info">
      <div className="image">
        <img src={require(`../../../../public/assets/${data?.user_img || 'default.jpg'}`)} alt="" />
      </div>
      <div>Name: {name} {nickname ? `(${nickname})` : ''}</div>
      <div>Major: {major}</div>
      <div>Year: {year}</div>
      <div>Status: {status}</div>
    </div>
  )
}

export default Student