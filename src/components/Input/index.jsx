import { Component } from 'react'
import './styles.css'



export class Input extends Component {
    

    render(){
        const {onChange} = this.props

        return (<input className="search-input"
            type="search" 
            placeholder='Buscar por título:' 
            onChange={onChange}   
        />)
    } 

}