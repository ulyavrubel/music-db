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
    <div>
      {collectionLength > step ? (
        <div className="collection navigation">
          <p>
            {indexFrom} - {indexTo} of {collectionLength}
          </p>
          <div className="collection navigation buttons">
            {showPrev ? (
              <button
                className="auth submit navigation"
                onClick={handlePrev}
              >{`< Previous`}</button>
            ) : null}
            {showNext ? (
              <button
                className="auth submit navigation"
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
