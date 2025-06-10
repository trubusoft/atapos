export default function SendButton({handleOnclick}) {
    return (
        <button className="btn btn-success text-center" onClick={handleOnclick}>
            Kirim Invoice
        </button>
    )
}