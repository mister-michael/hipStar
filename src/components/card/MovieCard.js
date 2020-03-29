import React from "react";

const MovieCard = props => {
    return (
        <>
          <div className="">
            <CardImg id="" top src={imageHandler()} alt={`${props.result.title} poster`} className="cardImage" />
            <CardTitle>{props.result.title}</CardTitle>
            <CardSubtitle>{release()}</CardSubtitle>
            <CardBody >
              <div className="buttonRow">
                <button
                  id={`hate-button--${props.result.id}`}
                  onClick={(e) => handleClick(e)}
                  className={hateBtnState.name}
                  disabled={isHateDisabled}
                ><span >Hate</span></button>
                <button
                  id={`love-button--${props.result.id}`}
                  onClick={(e) => handleClick(e)}
                  className={loveBtnState.name}
                  disabled={isLoveDisabled}><span >Love</span></button>{' '}
                {' '}
                {forgetJSX()}
              </div>
            </CardBody>
          </div>
        </>
      )
}