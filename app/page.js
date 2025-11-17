'use client';

import "bootstrap/dist/css/bootstrap.min.css"
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {RiPencilLine} from "react-icons/ri";
import {FiMinus} from "react-icons/fi";
import {AddOrderNumber, ReduceOrderNumber, ShowOrderNumber} from "@/app/fragments/order-number";
import SendButton from "@/app/fragments/send";

const maxOrderNumber = 50;
const sausagePrice = 27_000;
const katsuPrice = 37_000;
const meatballPrice = 25_000;

function getCurrentDate() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return now.toLocaleString('id-ID', options);
}

function Preview({orderNumber, name, sausage, katsu, meatball, shippingCost, total}) {
    function previewDate() {
        let humanDate = getCurrentDate();
        return (
            <>
                <div>{humanDate}</div>
                <br/>
            </>
        )
    }

    function previewName() {
        if (name !== '') {
            return (
                <>
                    <div>to {name}</div>
                    <br/>
                </>
            );
        } else {
            return (
                <>
                    <div>to <em className="text-danger">(belum diisi)</em></div>
                    <br/>
                </>
            );
        }
    }

    function previewSausage() {
        if (sausage !== 0) {
            return (
                <>
                    <div>▪️Sosis Ayam</div>
                    <div>{sausage} pack x {sausagePrice.toLocaleString()} = Rp. {(sausage * sausagePrice).toLocaleString()}</div>
                    <br/>
                </>
            )
        }
    }

    function previewKatsu() {
        if (katsu !== 0) {
            return (
                <>
                    <div>▪️ Chicken Katsu</div>
                    <div>{katsu} pack x {katsuPrice.toLocaleString()} = Rp. {(katsu * katsuPrice).toLocaleString()}</div>
                    <br/>
                </>
            )
        }
    }

    function previewMeatball() {
        if (meatball !== 0) {
            return (
                <>
                    <div>▪️ Bakso Instan</div>
                    <div>{meatball} pack x {meatballPrice.toLocaleString()} = Rp. {(meatball * meatballPrice).toLocaleString()}</div>
                    <br/>
                </>
            )
        }
    }

    function previewShipping() {
        if (shippingCost !== 0) {
            return (
                <>
                    <div>▪️Ongkir Rp. {isNaN(shippingCost)? '-': shippingCost.toLocaleString()}</div>
                    <br/>
                </>
            )
        }
    }

    function previewTotal() {
        if (total !== 0) {
            return (
                <>
                    <div className="fw-bold">Total: Rp. {isNaN(total) ? '-' : total.toLocaleString()}</div>
                    <br/>
                </>
            )
        }
    }

    function generateDate() {
        return `${getCurrentDate()}\n\n`;
    }

    function generateName() {
        if (name !== '') {
            return `to ${name}\n\n`;
        }
        return '';
    }

    function generateSausage() {
        if (sausage !== 0) {
            return "▪️Sosis Ayam\n" +
                sausage + " pack x " + sausagePrice.toLocaleString() +
                " = Rp. " + (sausage * sausagePrice).toLocaleString() + "\n\n";
        }
        return '';
    }

    function generateKatsu() {
        if (katsu !== 0) {
            return "▪️ Chicken Katsu\n" +
                katsu + " pack x " + katsuPrice.toLocaleString()
                + " = Rp. " + (katsu * katsuPrice).toLocaleString() + "\n\n";
        }
        return '';
    }

    function generateMeatball() {
        if (meatball !== 0) {
            return "▪️ Bakso Instan\n" +
              meatball + " pack x " + meatballPrice.toLocaleString()
              + " = Rp. " + (meatball * meatballPrice).toLocaleString() + "\n\n";
        }
        return '';
    }

    function generateShipping() {
        if (!isNaN(shippingCost) && shippingCost !== 0) {
            return "▪️Ongkir Rp. " + shippingCost.toLocaleString() + "\n\n";
        }
        return '';
    }

    function generateTotal() {
        if (!isNaN(total) && total !== 0) {
            return "*Total: Rp. " + total.toLocaleString() + "*\n\n";
        }
        return '';
    }

    function handleSend() {
        let text = "*Atap's Kitchen*" +
            "\n" +
            "\n" +
            "*Invoice #" + orderNumber + "*" +
            "\n" +
            generateDate() +
            generateName() +
            generateSausage() +
            generateKatsu() +
            generateMeatball() +
            generateShipping() +
            generateTotal() +
            "*Pembayaran Transfer*\n" +
            "💳 Bank Syariah Indonesia (BSI)\n" +
            process.env.NEXT_PUBLIC_A + "\n" +
            "a.n. " + process.env.NEXT_PUBLIC_B + "\n" +
            "\n" +
            "Thank you for your order 💕";

        const url = `whatsapp://send?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    }

    return (
        <>
            <div className="container mb-3">
                <div className="text-center row">
                    <SendButton handleOnclick={handleSend} />
                </div>
            </div>

            <div className="mb-3">
                <div className="alert alert-light">
                    <strong>Atap&#39;s Kitchen</strong>
                    <br/>
                    <br/>
                    <strong>Invoice #{orderNumber}</strong>
                    <br/>
                    {previewDate()}
                    {previewName()}
                    {previewSausage()}
                    {previewKatsu()}
                    {previewMeatball()}
                    {previewShipping()}
                    {previewTotal()}

                    <strong>Pembayaran Transfer</strong>
                    <br/>
                    <div>💳 Bank Syariah Indonesia (BSI)</div>
                    <div>123123123123123</div>
                    <div>a.n. XXXXXXX</div>

                    <br/>
                    <div>Thank you for your order 💕</div>
                </div>
            </div>

            <div className="container mb-3">
                <div className="text-center row">
                    <SendButton handleOnclick={handleSend} />
                </div>
            </div>
        </>
    );
}

export default function Pos() {
    const [orderNumber, setOrderNumber] = useState(1);
    const canAddOrderNumber = () => orderNumber < maxOrderNumber;
    const canReduceOrderNumber = () => 1 < orderNumber;
    const addOrderNumber = () => {
        if (canAddOrderNumber()) {
            setOrderNumber(orderNumber + 1);
        }
    }
    const reduceOrderNumber = () => {
        if (canReduceOrderNumber()) {
            setOrderNumber(orderNumber - 1);
        }
    }

    // global state that contains all orders
    const [global, setGlobal] = useState(
        Array.from(
            // initialize list with {maxOrderNumber} elements ... (0 and maxOrderNumber+1 is left unused for simplicity)
            {length:  maxOrderNumber + 1},
            // ... with empty order data
            (_, index) => {
                return {
                    name: '',
                    sausage: 0,
                    katsu: 0,
                    meatball: 0,
                    shippingCost: 0,
                }
            }
        )
    );

    // handling individual data
    let [name, setName] = useState('');
    const [total, setTotal] = useState(0);
    const [sausage, setSausage] = useState(0);
    const [katsu, setKatsu] = useState(0);
    const [meatball, setMeatball] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [shippingCostEdit, setShippingCostEdit] = useState(false);

    // update global state when any change happen on the current orderNumber
    // the use of setGlobal(global => ...) here is important to avoid infinite rendering
    // and global to be included inside dependency array
    useEffect(() => {
        setGlobal((global) => {
            global.map((item, index) => {
                if (index === orderNumber) {
                    return {
                        name: name,
                        sausage: sausage,
                        katsu: katsu,
                        meatball: meatball,
                        shippingCost: shippingCost,
                    };
                } else {
                    return item
                }
            });
            return global;
        });
    }, [orderNumber, name, sausage, katsu, meatball, shippingCost]);

    // update individual state when global state change occur (related to previous useEffect)
    useEffect(() => {
        let currentGlobal = global[orderNumber];
        setName(currentGlobal.name);
        setKatsu(currentGlobal.katsu);
        setSausage(currentGlobal.sausage);
        setMeatball(currentGlobal.meatball);
        setShippingCost(currentGlobal.shippingCost);
    }, [orderNumber, global]);

    // DEBUG: log current global
    // useEffect(() => {
    //     let currentGlobal = global[orderNumber];
    //     console.log('current global', orderNumber, currentGlobal)
    // }, [orderNumber, global]);

    const nameRef = useRef(null);
    function handleNameFocus() {
        nameRef.current.select();
    }
    function handleNameSubmit(event) {
        event.preventDefault();
        nameRef.current.blur();
    }

    const shippingCostRef = useRef(null);
    function handleShippingCostFocus() {
        // select all input text
        shippingCostRef.current.select();
    }
    // focus on shipping cost when available
    useEffect(() => {
        if (shippingCostRef.current && shippingCostEdit) {
            shippingCostRef.current.focus()
        }
    }, [shippingCostEdit])

    // correct shipping cost when not focused (i.e. done inputting)
    useEffect(() => {
        if (shippingCostEdit === false && isNaN(shippingCost)){
            setShippingCost(0)
        }
    }, [shippingCost, shippingCostEdit])

    // recalculate total on any change in the pos
    useEffect(() => {
        let katsuTotal = katsu * katsuPrice;
        let sausageTotal = sausage * sausagePrice;
        let meatballTotal = meatball * meatballPrice;
        let total = katsuTotal + sausageTotal + meatballTotal + shippingCost;
        setTotal(total)
    }, [katsu, sausage, meatball, shippingCost]);

    function handleNameChange(event) {
        let newName = event.target.value;

        // update individual state
        setName(newName);

        // also update on global state
        let newGlobal = global.map((item, index) => {
            if (index === orderNumber) {
                return {
                    name: newName,
                    sausage: item.sausage,
                    katsu: item.katsu,
                    meatball: item.meatball,
                    shippingCost: item.shippingCost,
                }
            } else return item;
        });
        setGlobal(newGlobal);
    }

    function handleShippingCostChange(event) {
        // save shipping cost only if it is a valid number
        let inputValue = event.target.value;
        if (/^\d+$/.test(inputValue) || inputValue === '') {
            let integerValue = parseInt(inputValue, 10);

            // update individual state
            setShippingCost(integerValue);

            // also update on global state
            let newGlobal = global.map((item, index) => {
                if (index === orderNumber) {
                    return {
                        name: item.name,
                        sausage: item.sausage,
                        katsu: item.katsu,
                        meatball: item.meatball,
                        shippingCost: integerValue,
                    }
                } else return item;
            });
            setGlobal(newGlobal);
        }
    }

    const addSausage = () => {
        let newSausage = sausage + 1;

        // update individual state
        setSausage(newSausage);

        // also update on global state
        let newGlobal = global.map((item, index) => {
            if (index === orderNumber) {
                return {
                    name: item.name,
                    sausage: newSausage,
                    katsu: item.katsu,
                    meatball: item.meatball,
                    shippingCost: item.shippingCost,
                }
            } else return item;
        });
        setGlobal(newGlobal);
    }

    const reduceSausage = () => {
        if (0 < sausage) {
            let newSausage = sausage - 1;

            // update individual state
            setSausage(newSausage);

            // also update on global state
            let newGlobal = global.map((item, index) => {
                if (index === orderNumber) {
                    return {
                        name: item.name,
                        sausage: newSausage,
                        katsu: item.katsu,
                        meatball: item.meatball,
                        shippingCost: item.shippingCost,
                    }
                } else return item;
            });
            setGlobal(newGlobal);
        }
    }

    const addKatsu = () => {
        let newKatsu = katsu + 1;

        // update individual state
        setKatsu(newKatsu);

        // also update on global state
        let newGlobal = global.map((item, index) => {
            if (index === orderNumber) {
                return {
                    name: item.name,
                    sausage: item.sausage,
                    katsu: newKatsu,
                    meatball: item.meatball,
                    shippingCost: item.shippingCost,
                }
            } else return item;
        });
        setGlobal(newGlobal);
    }

    const reduceKatsu = () => {
        if (0 < katsu) {
            let newKatsu = katsu - 1;

            // update individual state
            setKatsu(newKatsu);

            // also update on global state
            let newGlobal = global.map((item, index) => {
                if (index === orderNumber) {
                    return {
                        name: item.name,
                        sausage: item.sausage,
                        katsu: newKatsu,
                        meatball: item.meatball,
                        shippingCost: item.shippingCost,
                    }
                } else return item;
            });
            setGlobal(newGlobal);
        }
    }

    const addMeatball = () => {
        let newMeatball = meatball + 1;

        // update individual state
        setMeatball(newMeatball);

        // also update on global state
        let newGlobal = global.map((item, index) => {
            if (index === orderNumber) {
                return {
                    name: item.name,
                    sausage: item.sausage,
                    katsu: item.katsu,
                    meatball: newMeatball,
                    shippingCost: item.shippingCost,
                }
            } else return item;
        });
        setGlobal(newGlobal);
    }

    const reduceMeatball = () => {
        if (0 < meatball) {
            let newMeatball = meatball - 1;

            // update individual state
            setMeatball(newMeatball);

            // also update on global state
            let newGlobal = global.map((item, index) => {
                if (index === orderNumber) {
                    return {
                        name: item.name,
                        sausage: item.sausage,
                        katsu: item.katsu,
                        meatball: newMeatball,
                        shippingCost: item.shippingCost,
                    }
                } else return item;
            });
            setGlobal(newGlobal);
        }
    }

    const toggleShippingCostEdit = () => {
        setShippingCostEdit(!shippingCostEdit);
    }

    function getSausageRow() {
        if (sausage === 0) return null;

        return (
            <tr>
                <th scope="row" className="text-start">Sosis</th>
                <td className="text-end">Rp. {sausagePrice.toLocaleString()}</td>
                <td>{sausage}</td>
                <td className="text text-center">
                    <button className="btn btn-light border-danger-subtle text-danger" onClick={reduceSausage}>
                        <FiMinus/>
                    </button>
                </td>
            </tr>
        )
    }

    function getKatsuRow() {
        if (katsu === 0) return null;

        return (
            <tr>
                <th scope="row" className="text-start">Katsu</th>
                <td className="text-end">Rp. {katsuPrice.toLocaleString()}</td>
                <td>{katsu}</td>
                <td className="text text-center">
                    <button className="btn btn-light border-danger-subtle text-danger" onClick={reduceKatsu}>
                        <FiMinus/>
                    </button>
                </td>
            </tr>
        )
    }

    function getMeatballRow() {
        if (meatball === 0) return null;

        return (
            <tr>
                <th scope="row" className="text-start">Bakso Instan</th>
                <td className="text-end">Rp. {meatballPrice.toLocaleString()}</td>
                <td>{meatball}</td>
                <td className="text text-center">
                    <button className="btn btn-light border-danger-subtle text-danger" onClick={reduceMeatball}>
                        <FiMinus/>
                    </button>
                </td>
            </tr>
        )
    }

    function getEmptyRow() {
        if (sausage === 0 && katsu === 0 && meatball === 0) {
            return (
                <tr>
                    <th colSpan={4} className="fw-normal"><em>Kosong</em></th>
                </tr>
            )
        }
        return null;
    }

    function getShippingCostRow() {
        function handleSubmit(event) {
            event.preventDefault();
            setShippingCostEdit(false);
        }

        if (shippingCostEdit) {
            return (
                <>
                    <td colSpan={2}>
                        <form onSubmit={handleSubmit} >
                            <input
                                ref={shippingCostRef}
                                onFocus={handleShippingCostFocus}
                                type={'number'}
                                className="form-control"
                                onInput={handleShippingCostChange}
                                placeholder='Rp. 10,000'
                                value={shippingCost}
                            />
                        </form>
                    </td>
                </>
            )
        } else {
            return (
                <>
                    <td className="text-end">Rp. {shippingCost.toLocaleString()}</td>
                    <td colSpan={1}></td>
                </>
            )
        }
    }

    return (
        <div className="container">
            <div className="mt-3 mb-4">
                <h1 className="text-center">🏡 Atap&#39;s Kitchen</h1>
            </div>

            <div className="row mb-4">
                <div className="col-6">
                    <div className="row">
                        <div className="form-label fw-bold">Nama Pembeli:</div>
                    </div>
                    <div className="row">
                        <form onSubmit={handleNameSubmit}>
                            <input
                                ref={nameRef}
                                onFocus={handleNameFocus}
                                type="text"
                                className="form-control"
                                onInput={handleNameChange}
                                value={name}
                                placeholder={`Pembeli ke-${orderNumber}`}
                            />
                        </form>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="form-label fw-bold">Nomor Pesanan:</div>
                    </div>
                    <div className="container">
                        <div className="text-center">
                            <ReduceOrderNumber evaluationFunction={canReduceOrderNumber} onClickHandler={reduceOrderNumber}/>
                            <ShowOrderNumber orderNumber={orderNumber}/>
                            <AddOrderNumber evaluationFunction={canAddOrderNumber} onClickHandler={addOrderNumber}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-2">
                <div className="mb-3 text-center">
                    <button className="btn btn-light me-1 border-dark-subtle" onClick={addSausage}>
                        <Image
                            src="/atapos/sausages.png"
                            alt="sasuage logo"
                            width={40}
                            height={40}
                            priority
                        />
                    </button>
                    <button className="btn btn-light me-1 border-dark-subtle" onClick={addKatsu}>
                        <Image
                            src="/atapos/katsu.png"
                            alt="katsu logo"
                            width={40}
                            height={40}
                            priority
                        />
                    </button>
                    <button className="btn btn-light me-1 border-dark-subtle" onClick={addMeatball}>
                        <Image
                            src="/atapos/meatballs.png"
                            alt="bakso logo"
                            width={40}
                            height={40}
                            priority
                        />
                    </button>
                </div>

                <table className="table text text-center">
                    <thead>
                    <tr>
                        <th scope="col" style={{width: '30%'}} className="text-start">Barang</th>
                        <th scope="col" style={{width: '50%'}}>Harga</th>
                        <th scope="col" style={{width: '10%'}}>Jumlah</th>
                        <th scope="col" style={{width: '10%'}}>Aksi</th>
                    </tr>
                    </thead>
                    <tbody className="align-middle">
                    {getSausageRow()}
                    {getKatsuRow()}
                    {getMeatballRow()}
                    {getEmptyRow()}
                    </tbody>
                    <tfoot>
                    <tr>
                        <th scope="row" className="text-start">Ongkir</th>
                        {getShippingCostRow()}
                        <td colSpan={1}>
                            <div className="btn btn-light border-primary-subtle text-primary" onClick={toggleShippingCostEdit}>
                                <RiPencilLine/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-start">Total</th>
                        <td className="fw-bold text-end">Rp. {isNaN(total) ? '-' : total.toLocaleString()}</td>
                        <td colSpan={2}></td>
                    </tr>
                    </tfoot>
                </table>
            </div>

            <Preview
                key={`${shippingCost}-${total}`}
                orderNumber={orderNumber}
                name={name}
                sausage={sausage}
                katsu={katsu}
                shippingCost={shippingCost}
                total={total}
            />
        </div>
    )
};
