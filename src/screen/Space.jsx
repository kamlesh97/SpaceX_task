import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "../component/Modal";
import Pagination from "../component/Pagination";
const Space = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [popData, setPopData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const showPerPage = 10;
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPageChange = (start, end) => {
    setPagination({
      start: start,
      end: end,
    });
  };
  const openModal = () => {
    setShowModal(true);
  };
  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v3/capsules")
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    let searchData = data.filter(
      (res) =>
        res.type === search ||
        res.status === search ||
        date === res?.original_launch?.substring(0, 10)
    );
    setFilterData(searchData);
  }, [search, date, data]);

  return (
    <div className={`"App" `}>
      <div className="input-search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          className="clear"
          onClick={() => {
            setSearch("");
            setDate("");
          }}
        >
          clear search
        </button>
      </div>
      <br />
      {showModal ? (
        <Modal popData={popData} setShowModal={setShowModal} />
      ) : null}
      <div className="space-container">
        {!search && !date ? (
          data ? (
            data.slice(pagination.start, pagination.end).map((res) => (
              <div
                onClick={() => {
                  setPopData([res]);
                  openModal();
                }}
                className="space-container-section"
              >
                <div>
                  name : {res.capsule_serial}-{res.capsule_id}
                </div>
                <div>details : {res.details}</div>
                <div>status : {res.status}</div>
                <div>type : {res.type}</div>
                Missions :{" "}
                {res.missions.map((d, ind) => (
                  <div className="mission">
                    ({ind + 1}). name: <span>{d.name}</span> , filghts:
                    <span>{d.flight}</span>
                  </div>
                ))}
                <div>landings: {res.landings}</div>
                <div>resuse count: {res.reuse_count}</div>
                <div>
                  original launch: {new Date(res.original_launch).toString()}
                </div>
                <br />
              </div>
            ))
          ) : (
            "no data in api"
          )
        ) : search || date  ? (
          filterData.length!==0 ?
          filterData.slice(pagination.start, pagination.end).map((res) => (
            <div
              className="space-container-section"
              onClick={() => {
                setPopData([res]);
                openModal();
              }}
            >
              {" "}
              search result
              <div>
                name : {res.capsule_serial}-{res.capsule_id}
              </div>
              <div>details : {res.details}</div>
              <div>status : {res.status}</div>
              <div>type : {res.type}</div>
              Missions :{" "}
              {res.missions.map((d, ind) => (
                <div className="mission">
                  ({ind + 1}). name: <span>{d.name}</span> , filghts:
                  <span>{d.flight}</span>
                </div>
              ))}
              <div>landings: {res.landings}</div>
              <div>resuse count: {res.reuse_count}</div>
              <div>
                original launch: {new Date(res.original_launch).toString()}
              </div>
              <br />
            </div>
          ))
                :
                <div>no result found</div>
          ) : (
          <div>no data</div>
        )}
      </div>
      {(data || filterData) && (
        <Pagination
          showPerPage={showPerPage}
          onPageChange={onPageChange}
          total={!(search || date) ? data.length : filterData.length}
        />
      )}
    </div>
  );
};

export default Space;
