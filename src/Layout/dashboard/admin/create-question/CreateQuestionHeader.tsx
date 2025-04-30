import React from "react";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<string>>;
};

const CreateQuestionHeader: React.FC<Props> = ({ setShow }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary px-3">
      <div className="container-fluid">
        {/* <a className="navbar-brand fw-bold text-white" href="#">
          Create Question
        </a> */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item" onClick={() => setShow("SUBJECT")}>
              <a className="nav-link text-white" href="#">
                Add Subject
              </a>
            </li>
            <li className="nav-item" onClick={() => setShow("CHAPTER")}>
              <a className="nav-link text-white" href="#">
                Add Chapter
              </a>
            </li>
            <li className="nav-item" onClick={() => setShow("TOPIC")}>
              <a className="nav-link text-white" href="#">
                Add Topic
              </a>
            </li>
            <li className="nav-item" onClick={() => setShow("TAG")}>
              <a className="nav-link text-white" href="#">
                Add Tag
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link  text-white"
                href="#"
                id="createQuestionDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Create Question
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="createQuestionDropdown"
              >
                <li onClick={() => setShow("SELECT")}>
                  <a className="dropdown-item" href="#">
                    Select Type
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setShow("INTEGER")}
                  >
                    Integer
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setShow("MTC")}
                  >
                    Match the Column
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          {/* <form className="d-flex" role="search">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form> */}
        </div>
      </div>
    </nav>
  );
};

export default CreateQuestionHeader;
