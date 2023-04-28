import { mainButtonBasket, redirectPage } from "../telegram/mainButtonFunctions"
import { Link } from "react-router-dom"
import tg from "../telegram/main"
import '../css/placeholder.css'
import basket from "../basket"
import Image from "./Image"
const Home = props => {
    if (tg.BackButton.isVisible) tg.BackButton.hide()

    if (Object.keys(basket.products).length === 0) {
        tg.MainButton.show()
        tg.MainButton.onClick(() => {
            mainButtonBasket(tg)
            redirectPage('#/basket')
        })
    } else tg.MainButton.hide()

    let data = []
    for (let i = 0; i < Math.ceil(Object.keys(props.groups).length / 2); i++){
        let sub_data = []
        for (let j = i*2; j < 2*(i + 1); j++) {
            props.groups[Object.keys(props.groups)[j]].category = Object.keys(props.groups)[j]
            sub_data.push(props.groups[Object.keys(props.groups)[j]])
        }
        data.push(sub_data)
    }

    return (
    <>
        <div className="inner-container">
            {data.map(props => {
                return (
                    <GroupCard key={props[0].title} groups={props} />
                )
            })}
        </div>
    </>
    )
}

const GroupCard = props => {
    props = props.groups
    if (props.length === 2) return (
        <div className="cards">
            <div className="label-container">
                <span className="card-label">{props[0].title}</span>
                <span className="card-label">{props[1].title}</span>
            </div>
            <div className="image-container">
            <Image src={process.env.PUBLIC_URL + props[0].imagePath} sub_title={props[0].sub_title}/>
            <Image src={process.env.PUBLIC_URL + props[1].imagePath} sub_title={props[1].sub_title}/>
            </div>
            <div className="button-container">
                <Link to={'products#'+ props[0].category} className="card-button" onClick={() => {window.scrollTo(0,0)}}>Перейти</Link>
                <Link to={'products#'+ props[1].category} className="card-button" onClick={() => {window.scrollTo(0,0)}}>Перейти</Link>
            </div>
        </div>
    )
    else return (
        <div className="cards">
            <div className="label-container">
                <span className="card-label">{props[0].title}</span>
            </div>
            <div className="image-container">
                <Image src={process.env.PUBLIC_URL + props[0].imagePath} sub_title={props[0].sub_title}/>
            </div>
            <div className="button-container">
                <Link to={'products#'+ props[0].category} className="card-button" onClick={() => {window.scrollTo(0,0)}}>Перейти</Link>
            </div>
        </div>
    )
}

export default Home;