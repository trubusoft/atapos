export {
    ReduceOrderNumber,
    ShowOrderNumber,
    AddOrderNumber
}

function ReduceOrderNumber({evaluationFunction, onClickHandler}){
    if (evaluationFunction()) {
        return (
            <button className="btn btn-light" onClick={onClickHandler}>←</button>
        )
    } else {
        return (
            <button className="btn btn-light disabled" onClick={onClickHandler}>←</button>
        )
    }
}

function ShowOrderNumber({orderNumber}) {
    return (
        <span className="fw-bold mx-2"><strong>#{orderNumber}</strong></span>
    );
}

function AddOrderNumber({evaluationFunction, onClickHandler}){
    if (evaluationFunction()) {
        return (
            <button className="btn btn-light" onClick={onClickHandler}>→</button>
        )
    } else {
        return (
            <button className="btn btn-light disabled" onClick={onClickHandler}>→</button>
        )
    }
}
