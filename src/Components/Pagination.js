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
    <div className="marg-t-s">
      {collectionLength > step ? (
        <div className="pagination-navigation">
          <p className="pagination-navigation__paragraph marg-zero ">
            {indexFrom} - {indexTo} of {collectionLength}
          </p>
          <div className="pagination-navigation__buttons marg-b-l">
            {showPrev ? (
              <button
                className="btn btn-border"
                onClick={handlePrev}
              >{`< Previous`}</button>
            ) : null}
            {showNext ? (
              <button
                className="btn btn-border"
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
