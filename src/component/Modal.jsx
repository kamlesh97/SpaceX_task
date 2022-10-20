import React, { useRef } from "react";
import ReactDom from "react-dom";
export const Modal = ({ popData, setShowModal }) => {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  popData.map((res) => console.log(res));
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <div>
          <h2>Details</h2>
          {popData.map((res) => (
            <div>
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
          ))}
        </div>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
