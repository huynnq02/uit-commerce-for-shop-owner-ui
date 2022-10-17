import "./List.scss"
import Sidebar from "../../molecules/Sidebar/Sidebar"
import Navbar from "../../molecules/Navbar/Navbar"
import Datatable from "../../organisms/Datatable/Datatable"
const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
)
}

export default List
