import React from "react";

function Pagination(props) {
  const {
    collectionLength,
    step,
    indexFrom,
    indexTo,
    showPrev,
    showNext,
    handleNext,
    handlePrev,
  } = props;

  return (
    <div className="pagination-container">
      {collectionLength > step ? (
        <div className="pagination-navigation">
          <p className="pagination-navigation__paragraph">
            {indexFrom} - {indexTo} of {collectionLength}
          </p>
          <div className="pagination-navigation__buttons">
            {showPrev ? (
              <button
                className="btn btn-pagination"
                onClick={handlePrev}
              >{`< Previous`}</button>
            ) : null}
            {showNext ? (
              <button
                className="btn btn-pagination"
                onClick={handleNext}
              >{`Next >`}</button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Pagination;
